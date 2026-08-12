import { generateAccessToken, generateRefreshToken, ACCESS_COOKIE, REFRESH_COOKIE } from "./jwt.js";

const ACCESS_MAX_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_MAX_AGE_30_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days

function isProduction() {
  return process.env.NODE_ENV === "production";
}

// Sets both tokens. rememberMe=false -> refresh token becomes a session cookie (browser close clears it).
export function setAuthCookies(res, user, { rememberMe = false } = {}) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, { rememberMe });

  const dashboardPath = user.role === "ADMIN" ? "/admin/dashboard" : user.role === "TECHNICIAN" ? "/technician/dashboard" : "/user/dashboard";
  const emailPrefix = user.email ? user.email.split("@")[0] : "";
  const derivedUsername = (user.username || emailPrefix).toLowerCase().replace(/[^a-z0-9_]/g, "");

  const userPayload = {
    id: user.id || user._id || user.email,
    name: user.name || emailPrefix || "User",
    displayName: user.displayName || user.name || emailPrefix || "User",
    username: derivedUsername,
    email: user.email,
    role: user.role || "USER",
    avatar: user.avatar || user.picture || "",
    dashboardPath,
  };

  res.cookie(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });

  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    ...(rememberMe ? { maxAge: REFRESH_MAX_AGE_30_DAYS } : {}),
    path: "/",
  });

  res.cookie("phidim_auth_user", JSON.stringify(userPayload), {
    httpOnly: false,
    secure: isProduction(),
    sameSite: "lax",
    maxAge: REFRESH_MAX_AGE_30_DAYS,
    path: "/",
  });

  return { accessToken, refreshToken };
}

export function clearAuthCookies(res) {
  res.clearCookie(ACCESS_COOKIE, { path: "/" });
  res.clearCookie(REFRESH_COOKIE, { path: "/" });
  res.clearCookie("phidim_jwt_token", { path: "/" });
  res.clearCookie("phidim_auth_user", { path: "/" });
  res.clearCookie("phidim_google_user", { path: "/" });
}

export function getTokensFromRequest(req) {
  return {
    accessToken: req.cookies?.[ACCESS_COOKIE] || null,
    refreshToken: req.cookies?.[REFRESH_COOKIE] || null,
  };
}