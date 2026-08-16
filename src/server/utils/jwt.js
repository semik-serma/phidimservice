import { createRequire } from "module";
import crypto from "crypto";
import { getAuthConfig } from "@/lib/env.js";
import { dashboardPathFor } from "@/lib/auth/roles.js";

const req = createRequire(import.meta.url);
const jwt = req("jsonwebtoken");

const config = getAuthConfig();

const ACCESS_SECRET = config.jwtAccessSecret || process.env.JWT_SECRET || "phidim_service_express_jwt_secret_key_2026";
const REFRESH_SECRET = config.jwtRefreshSecret || process.env.REFRESH_TOKEN_SECRET || "phidim_service_refresh_secret_key_2026";
const ACCESS_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

export const ACCESS_COOKIE = "phidim_access_token";
export const REFRESH_COOKIE = "phidim_refresh_token";

// Access token: short lived (default 15 minutes)
export function generateAccessToken(user) {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    role: user.role || "USER",
    dashboardPath: dashboardPathFor(user.role),
    // JWT cookies must remain below browser header limits. A base64 upload is
    // delivered through the profile API rather than embedded in a token.
    avatar: String(user.avatar || "").startsWith("data:") ? "" : user.avatar,
    type: "access",
  };

  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

// Refresh token: long lived (default 30 days), separate secret
export function generateRefreshToken(user, { rememberMe = false } = {}) {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    role: user.role || "USER",
    type: "refresh",
    rememberMe: !!rememberMe,
    jti: crypto.randomUUID(),
  };

  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

// Verify access token -> decodes payload or returns null
export function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return decoded.type === "access" ? decoded : null;
  } catch (error) {
    return null;
  }
}

// Verify refresh token -> decodes payload or returns null
export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    return decoded.type === "refresh" ? decoded : null;
  } catch (error) {
    return null;
  }
}

// Legacy alias kept for backward compatibility
export function generateToken(user) {
  return generateAccessToken(user);
}

export function verifyToken(token) {
  return verifyAccessToken(token);
}
