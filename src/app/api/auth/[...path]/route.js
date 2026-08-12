import { NextResponse } from "next/server";
import {
  loginUser,
  registerUser,
  googleAuth,
  googleCallback,
  verifyGoogleToken,
  getCurrentUser,
  logoutUser,
  refreshTokenHandler,
  forgotPassword,
  resetPassword,
  changePassword,
  getLoginLogsHandler,
} from "@/server/controllers/authController.js";

export const dynamic = "force-dynamic";

// Mock Express req/res adapters for Next.js App Router
function createExpressAdapters(request, params) {
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const req = {
    method: request.method,
    url: request.url,
    query,
    headers: Object.fromEntries(request.headers.entries()),
    cookies: Object.fromEntries(
      (request.headers.get("cookie") || "").split(";").filter(Boolean).map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, v.join("=")];
      })
    ),
    body: {},
    get: (header) => request.headers.get(header),
    protocol: url.protocol.replace(":", ""),
  };

  let responseData = null;
  let responseStatus = 200;
  let redirectUrl = null;
  const responseHeaders = new Headers();
  const cookiesToSet = [];

  const res = {
    status: (code) => {
      responseStatus = code;
      return res;
    },
    json: (data) => {
      responseData = JSON.stringify(data);
      responseHeaders.set("Content-Type", "application/json");
      return res;
    },
    redirect: (urlStr) => {
      redirectUrl = urlStr;
      return res;
    },
    cookie: (name, value, options = {}) => {
      cookiesToSet.push({ name, value, options });
      return res;
    },
    clearCookie: (name, options = {}) => {
      cookiesToSet.push({ name, value: "", options: { ...options, maxAge: 0 } });
      return res;
    },
    setHeader: (k, v) => {
      responseHeaders.set(k, v);
      return res;
    },
  };

  return { req, res, getResponse: () => ({ responseData, responseStatus, redirectUrl, responseHeaders, cookiesToSet }) };
}

async function handleAuthRoute(request, { params }) {
  try {
    const { path } = await params;
    const routePath = Array.isArray(path) ? path.join("/") : path;

    const { req, res, getResponse } = createExpressAdapters(request, params);

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      try {
        req.body = await request.json();
      } catch (e) {
        req.body = {};
      }
    }

    if (routePath === "login") {
      await loginUser(req, res);
    } else if (routePath === "register") {
      await registerUser(req, res);
    } else if (routePath === "google") {
      await googleAuth(req, res);
    } else if (routePath === "google/callback") {
      await googleCallback(req, res);
    } else if (routePath === "google/verify") {
      await verifyGoogleToken(req, res);
    } else if (routePath === "me") {
      await getCurrentUser(req, res);
    } else if (routePath === "logout") {
      await logoutUser(req, res);
    } else if (routePath === "refresh") {
      await refreshTokenHandler(req, res);
    } else if (routePath === "forgot-password") {
      await forgotPassword(req, res);
    } else if (routePath === "reset-password") {
      await resetPassword(req, res);
    } else if (routePath === "change-password") {
      await changePassword(req, res);
    } else if (routePath === "login-logs") {
      await getLoginLogsHandler(req, res);
    } else {
      return new Response(JSON.stringify({ error: "Auth route not found." }), { status: 404 });
    }

    const { responseData, responseStatus, redirectUrl, responseHeaders, cookiesToSet } = getResponse();

    function applyCookies(nextRes, cookies) {
      for (const { name, value, options } of cookies) {
        let maxAgeInSeconds;
        if (options.maxAge !== undefined && options.maxAge !== null) {
          maxAgeInSeconds = options.maxAge > 100000 ? Math.floor(options.maxAge / 1000) : options.maxAge;
        }
        nextRes.cookies.set(name, value, {
          path: options.path || "/",
          httpOnly: options.httpOnly || undefined,
          secure: options.secure || undefined,
          sameSite: options.sameSite || undefined,
          maxAge: maxAgeInSeconds,
        });
      }
    }

    if (redirectUrl) {
      const redirectRes = NextResponse.redirect(redirectUrl, 302);
      applyCookies(redirectRes, cookiesToSet);
      return redirectRes;
    }

    const response = NextResponse.json(responseData ? JSON.parse(responseData) : null, {
      status: responseStatus || 200,
    });
    for (const [headerKey, headerValue] of responseHeaders.entries()) {
      if (headerKey.toLowerCase() !== "content-type") {
        response.headers.set(headerKey, headerValue);
      }
    }
    applyCookies(response, cookiesToSet);

    return response;
  } catch (error) {
    console.error("Auth route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export { handleAuthRoute as GET, handleAuthRoute as POST, handleAuthRoute as PUT, handleAuthRoute as DELETE };
