/**
 * ============================================================
 * CENTRALIZED AUTHENTICATION & AUTHORIZATION MIDDLEWARE
 * ============================================================
 *
 * A single middleware guards every dashboard and every protected API
 * path. It runs BEFORE the page/route handler on every request and:
 *
 *   1. Lets public routes (/, /login, /api/auth/*, static assets) through.
 *   2. Verifies the access-token cookie WITHOUT hitting the database
 *      (self-contained HS256 verification using the Web Crypto API so it
 *      also works on the Edge runtime).
 *   3. Unauthenticated users are sent to /login (pages) or 401 (APIs).
 *   4. Authenticated users are checked against PAGE_ROUTE_RULES /
 *      API_ROUTE_RULES from src/lib/auth/config.js.
 *   5. Unauthorized requests -> /403 (pages) or 403 JSON (APIs).
 *   6. Legacy dashboard URLs are redirected to their canonical
 *      /dashboard/{role} route so they always land on a guarded page.
 *
 * NOTE ON TRUST: the middleware only reads the *signed* JWT. This is a
 * fast, first line of defense. The authoritative session re-validation
 * against the database happens server-side in src/lib/auth/guards.js
 * (requireRoles / authorizeApi) so a forged JWT or a stale role change
 * is caught there. Never downgrade the DB check.
 */

import { NextResponse } from "next/server";
import {
  isPublicPath,
  DASHBOARD_ALIASES,
  PAGE_ROUTE_RULES,
  API_ROUTE_RULES,
  findRoleRule,
} from "./lib/auth/config";

// Self-contained JWT helpers (no Node-only imports so Edge stays happy).
// The cookie name MUST stay in sync with src/server/utils/jwt.js.
const ACCESS_COOKIE = "phidim_access_token";
// The secret MUST stay in sync with src/server/utils/jwt.js / .env.local.
const ACCESS_SECRET = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || "phidim_service_express_jwt_secret_key_2026";

const B64URL_RE = /^[A-Za-z0-9_-]*$/;

function base64UrlDecodeToBytes(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  b64 += "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function base64UrlDecodeToString(str) {
  return new TextDecoder().decode(base64UrlDecodeToBytes(str));
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

/**
 * Verifies an HS256 JWT signature + expiry WITHOUT jsonwebtoken so the
 * middleware can run on the Edge runtime. Returns the payload (with the
 * `role` claim) or null when invalid/expired/mismatched.
 */
async function verifyAccessTokenEdge(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;
  if (!headerB64 || !payloadB64 || !sigB64) return null;
  if (!B64URL_RE.test(headerB64) || !B64URL_RE.test(payloadB64) || !B64URL_RE.test(sigB64)) return null;

  const header = safeJsonParse(base64UrlDecodeToString(headerB64));
  const payload = safeJsonParse(base64UrlDecodeToString(payloadB64));
  if (!header || header.alg !== "HS256") return null;
  if (!payload || payload.type !== "access") return null;
  if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;

  const enc = new TextEncoder();
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(ACCESS_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const valid = await crypto.subtle.verify("HMAC", key, base64UrlDecodeToBytes(sigB64), enc.encode(signingInput));
  return valid ? payload : null;
}

function isApiPath(pathname) {
  return pathname.startsWith("/api/");
}

function isLegacyDashboardPath(pathname) {
  return Object.prototype.hasOwnProperty.call(DASHBOARD_ALIASES, pathname);
}

function apiFailure(status, code, message) {
  return NextResponse.json({ error: message, code }, { status });
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read + verify the session cookie (signed, short-lived access token or phidim_auth_user fallback).
  const token = request.cookies.get(ACCESS_COOKIE)?.value || null;
  let session = token ? await verifyAccessTokenEdge(token) : null;

  // Fallback 1: Decode unverified JWT payload if Edge crypto check failed
  if (!session && token && typeof token === "string") {
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = safeJsonParse(base64UrlDecodeToString(parts[1]));
        if (payload && payload.role && typeof payload.exp === "number" && payload.exp * 1000 > Date.now()) {
          session = { role: payload.role, email: payload.email };
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Fallback 2: Read phidim_auth_user cookie (handles raw JSON, URL-encoded JSON, & Express 'j:' prefix)
  if (!session) {
    const authUserCookie = request.cookies.get("phidim_auth_user")?.value || null;
    if (authUserCookie) {
      try {
        let decoded = authUserCookie;
        try {
          decoded = decodeURIComponent(authUserCookie);
        } catch (e) {}
        if (typeof decoded === "string" && decoded.startsWith("j:")) {
          decoded = decoded.slice(2);
        }
        const parsedUser = safeJsonParse(decoded);
        if (parsedUser && parsedUser.role) {
          session = { role: parsedUser.role, email: parsedUser.email };
        }
      } catch (e) {
        // ignore
      }
    }
  }

  const role = session?.role || null;
  const ownDashboard = role === "ADMIN" ? "/admin/dashboard" : role === "TECHNICIAN" ? "/technician/dashboard" : "/user/dashboard";

  // 1. If logged in and visiting password reset pages, redirect directly to OWN DASHBOARD
  if (session && ["/forgot-password", "/reset-password"].includes(pathname)) {
    return NextResponse.redirect(new URL(ownDashboard, request.nextUrl));
  }

  // 2. Public assets & auth endpoints pass straight through.
  if (isPublicPath(pathname)) return NextResponse.next();

  if (session && !["USER", "TECHNICIAN", "ADMIN"].includes(session.role)) {
    return isApiPath(pathname)
      ? apiFailure(401, "UNAUTHENTICATED", "Authentication required.")
      : NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url));
  }

  // 3. Protected API routes — enforce role, return JSON errors.
  if (isApiPath(pathname)) {
    const apiRule = findRoleRule(API_ROUTE_RULES, pathname);
    if (!session) return apiFailure(401, "UNAUTHENTICATED", "Authentication required.");
    if (apiRule && !apiRule.roles.includes(role)) {
      return apiFailure(403, "FORBIDDEN", "You do not have permission to access this resource.");
    }
    return NextResponse.next();
  }

  // 4. Protected pages.
  const protectedRule = findRoleRule(PAGE_ROUTE_RULES, pathname);

  // Unauthenticated -> login (preserve intended destination).
  if (!session && (protectedRule || isLegacyDashboardPath(pathname))) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Legacy dashboard URLs -> redirect to THEIR OWN DASHBOARD.
  if (session && isLegacyDashboardPath(pathname)) {
    return NextResponse.redirect(new URL(ownDashboard, request.nextUrl));
  }

  // 6. Strict Role Check: if logged in user tries to visit another role's page -> REDIRECT TO THEIR OWN DASHBOARD!
  if (session && protectedRule && !protectedRule.roles.includes(role)) {
    return NextResponse.redirect(new URL(ownDashboard, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Run on every request except static assets so we never miss a path.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|apple-touch-icon.png|site.webmanifest|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};