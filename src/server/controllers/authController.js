import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { detectDevice, getClientIp } from "../utils/device.js";
import { checkRateLimit, recordFailedAttempt, getAccountLock, clearFailedAttempts } from "../utils/rateLimit.js";
import { setAuthCookies, clearAuthCookies, getTokensFromRequest } from "../utils/cookieUtils.js";
import {
  findUserByEmailOrPhone,
  findUserByEmail,
  createUser,
  saveUser,
  logLoginEvent,
  seedDemoUsers,
} from "../services/userStore.js";
import { getAuthConfig } from "@/lib/env.js";
import { dashboardPathFor } from "@/lib/auth/roles.js";

const config = getAuthConfig();
const googleClient = new OAuth2Client(config.googleClientId);

function resolveProtocol(req) {
  const forwarded = (req.headers && req.headers["x-forwarded-proto"]) || "";
  const first = forwarded.split(",")[0].trim();
  return req.protocol === "https" || first === "https" ? "https" : "http";
}

function toClientUser(user) {
  const emailPrefix = user.email ? user.email.split("@")[0] : "";
  const derivedUsername = (user.username || emailPrefix).toLowerCase().replace(/[^a-z0-9_]/g, "");

  return {
    id: user._id?.toString ? user._id.toString() : user._id,
    name: user.name || emailPrefix || "User",
    displayName: user.displayName || user.name || emailPrefix || "User",
    username: derivedUsername,
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "USER",
    avatar: user.avatar || user.picture || "",
    dashboardPath: dashboardPathFor(user.role),
  };
}

// 1. Standard Login
export async function loginUser(req, res) {
  const device = detectDevice(req);
  const ip = getClientIp(req);
  const { emailOrPhone, password, rememberMe = false } = req.body;

  // Input validation
  if (!emailOrPhone || !password) {
    return res.status(400).json({ error: "Please provide both email and password." });
  }
  if (typeof password === "string" && password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  // Brute force protection (per-IP rate limiter)
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    return res.status(429).json({ error: rate.message, retryAfterSeconds: rate.retryAfterSeconds });
  }

  try {
    await seedDemoUsers();

    const accountKey = String(emailOrPhone).trim().toLowerCase();

    // Check account lockout first
    const lockRemaining = getAccountLock(accountKey);
    if (lockRemaining > 0) {
      return res.status(423).json({
        error: "Account is temporarily locked due to too many failed attempts. Please try again in 15 minutes.",
        locked: true,
        retryAfterSeconds: Math.ceil(lockRemaining / 1000),
      });
    }

    const user = await findUserByEmailOrPhone(emailOrPhone);

    let passwordOk = false;
    if (user && user.password) {
      passwordOk = await comparePassword(password, user.password);
    }

    if (!user || !passwordOk) {
      // Record failed attempt (account lockout)
      const fail = recordFailedAttempt(accountKey);
      await logLoginEvent({
        userEmail: accountKey,
        type: "failed",
        success: false,
        reason: "Invalid credentials",
        ip,
        ...device,
      });

      const attemptsLeft = fail.attemptsLeft ?? 0;
      const message = fail.locked
        ? "Account is temporarily locked due to too many failed attempts. Please try again in 15 minutes."
        : `Incorrect credentials. ${attemptsLeft} attempt${attemptsLeft === 1 ? "" : "s"} remaining before your account is locked.`;

      return res.status(fail.locked ? 423 : 401).json({
        error: message,
        locked: fail.locked,
        retryAfterSeconds: fail.locked ? Math.ceil(fail.remainingMs / 1000) : 0,
      });
    }

    // Account status checks
    if (user.status === "suspended") {
      return res.status(403).json({ error: "Account suspended. Contact support." });
    }
    if (user.status === "inactive") {
      return res.status(403).json({ error: "Account is inactive." });
    }

    // Success: clear lockout, set cookies, update metadata, log
    clearFailedAttempts(accountKey);
    const remember = !!rememberMe;
    setAuthCookies(res, user, { rememberMe: remember });

    await saveUser(user, {
      lastLogin: new Date(),
      loginAttempts: 0,
      lockUntil: null,
      lastIP: ip,
      lastDevice: device,
    });

    await logLoginEvent({
      userId: user._id?.toString ? user._id.toString() : user._id,
      userEmail: user.email,
      role: user.role,
      type: "login",
      success: true,
      reason: "Login successful",
      ip,
      device,
    });

    const clientUser = toClientUser(user);
    return res.status(200).json({
      success: true,
      accessToken: generateAccessToken(user),
      user: clientUser,
    });
  } catch (error) {
    console.error("[Auth] Login error:", error);
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
}

// 2. Standard Registration
export async function registerUser(req, res) {
  const { name, email, phone, password, role = "USER" } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required." });
  if (!name) return res.status(400).json({ error: "Name is required." });
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  // SECURITY (RBAC): public self-registration can create USER or TECHNICIAN
  // accounts. ADMIN roles are NEVER accepted from the client — promoting a user to
  // ADMIN is an ADMIN-only action performed through the /api/admin/users endpoint.
  if (role && role === "ADMIN") {
    try {
      await logLoginEvent({
        userEmail: String(email || "").toLowerCase(),
        type: "audit",
        action: "role_escalation_attempt",
        success: false,
        reason: `Registration attempted with role "${role}". Admin self-assignment denied.`,
        ip: getClientIp(req),
        device: detectDevice(req),
      });
    } catch (e) {
      // ignore — never allow an audit failure to break registration flow
    }
    return res.status(403).json({ error: "Self-registration as ADMIN is not allowed." });
  }

  try {
    await seedDemoUsers();
    const lowerEmail = String(email).trim().toLowerCase();

    const existing = await findUserByEmail(lowerEmail);
    if (existing) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const passwordHash = await hashPassword(password);
    const assignedRole = role === "TECHNICIAN" ? "TECHNICIAN" : "USER";
    const { error, user } = await createUser({
      name: name.trim(),
      email: lowerEmail,
      phone: phone || "",
      passwordHash,
      role: assignedRole,
      authProvider: "local",
    });

    if (error) return res.status(400).json({ error });

    // Auto-login after registration (rememberMe defaults to false/session cookie)
    setAuthCookies(res, user, { rememberMe: false });

    await logLoginEvent({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      type: "login",
      success: true,
      reason: "Registered & logged in",
      ip: getClientIp(req),
      device: detectDevice(req),
    });

    return res.status(201).json({
      success: true,
      accessToken: generateAccessToken(user),
      user: toClientUser(user),
    });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed." });
  }
}

// 3. Logout
export async function logoutUser(req, res) {
  try {
    const { refreshToken } = getTokensFromRequest(req);
    let identity = null;

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      if (decoded) identity = decoded;
    }

    if (identity && identity.id) {
      try {
        await saveUser({ email: identity.email }, { refreshToken: "" });
      } catch (e) {
        // Best effort
      }
      await logLoginEvent({
        userId: identity.id,
        userEmail: identity.email,
        role: identity.role,
        type: "logout",
        success: true,
        reason: "User logged out",
        ip: getClientIp(req),
        device: detectDevice(req),
      });
    }

    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (e) {
    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: "Logged out successfully." });
  }
}

// 4. Refresh Access Token (silent authentication)
export async function refreshTokenHandler(req, res) {
  const { refreshToken } = getTokensFromRequest(req);

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token. Please login again." });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    clearAuthCookies(res);
    return res.status(401).json({ error: "Session expired. Please login again." });
  }

  try {
    let user = null;
    if (decoded.id) {
      user = await findUserByEmail(decoded.email);
    }
    if (!user) {
      clearAuthCookies(res);
      return res.status(401).json({ error: "User no longer exists. Please login again." });
    }

    if (user.status && user.status !== "active") {
      clearAuthCookies(res);
      return res.status(403).json({ error: user.status === "suspended" ? "Account suspended." : "Account is inactive." });
    }

    // Only re-issue if tokens still belong to the same user
    setAuthCookies(res, user, { rememberMe: !!decoded.rememberMe });

    return res.status(200).json({
      success: true,
      accessToken: generateAccessToken(user),
      user: toClientUser(user),
    });
  } catch (error) {
    return res.status(401).json({ error: "Session refresh failed. Please login again." });
  }
}

// 5. Get Current User
export async function getCurrentUser(req, res) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.phidim_access_token) {
    token = req.cookies.phidim_access_token;
  }

  if (!token) {
    return res.status(401).json({ error: "No active token session." });
  }

  const { verifyAccessToken } = await import("../utils/jwt.js");
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Token expired or invalid. Please login again." });
  }

  try {
    const user = await findUserByEmail(decoded.email);
    if (!user) return res.status(401).json({ error: "User not found." });

    return res.status(200).json({
      success: true,
      user: toClientUser(user),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load user." });
  }
}

// 6. Forgot Password
export async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  const lowerEmail = String(email).trim().toLowerCase();
  try {
    await seedDemoUsers();
    const user = await findUserByEmail(lowerEmail);
    if (!user) {
      // Don't reveal account existence
      return res.status(200).json({ success: true, message: "If that email is registered, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await saveUser(user, {
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: expires,
    });

    // TODO: connect a real mail provider (SMTP/Resend/Mailgun etc.)
    console.log(`[Auth][DEV] Password reset link for ${lowerEmail}: /reset-password?token=${resetToken}`);

    return res.status(200).json({
      success: true,
      message: "Password reset instructions have been sent to your email.",
      // In development (no mail server) expose the reset link so the flow can be completed.
      devResetUrl: process.env.NODE_ENV !== "production" ? `/reset-password?token=${resetToken}` : undefined,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process password reset request." });
  }
}

// 7. Reset Password (uses token from email link)
export async function resetPassword(req, res) {
  const { token, password } = req.body;
  if (!token) return res.status(400).json({ error: "Reset token is required." });
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");

  try {
    // Need to query by resetPasswordToken: handled by scanning users
    let user = null;
    const { getMemoryUsers } = await import("../utils/memoryStore.js");
    const mem = getMemoryUsers();
    for (const [, u] of mem.entries()) {
      if (u.resetPasswordToken && u.resetPasswordToken === tokenHash) {
        user = u;
        break;
      }
    }

    if (!user) {
      // Try DB path
      const { User } = await import("../models/User.js");
      try {
        user = await User.findOne({
          resetPasswordToken: tokenHash,
          resetPasswordExpires: { $gt: new Date() },
        }).select("+password +resetPasswordToken +resetPasswordExpires");
        if (user) user = user.toObject();
      } catch (e) {
        user = null;
      }
    }

    if (!user) return res.status(400).json({ error: "Invalid or expired reset token." });

    if (user.resetPasswordExpires && new Date(user.resetPasswordExpires) < new Date()) {
      return res.status(400).json({ error: "Reset token has expired. Please request a new one." });
    }

    const passwordHash = await hashPassword(password);
    await saveUser(user, {
      password: passwordHash,
      resetPasswordToken: "",
      resetPasswordExpires: null,
      refreshToken: "",
      lockUntil: null,
      loginAttempts: 0,
    });

    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: "Your password has been reset. Please login." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to reset password." });
  }
}

// 8. Change Password (authenticated)
export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword) return res.status(400).json({ error: "Current password is required." });
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters." });
  }

  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.cookies?.phidim_access_token;

  if (!token) return res.status(401).json({ error: "Not authenticated." });

  const { verifyAccessToken } = await import("../utils/jwt.js");
  const decoded = verifyAccessToken(token);
  if (!decoded) return res.status(401).json({ error: "Session expired. Please login again." });

  try {
    const user = await findUserByEmail(decoded.email);
    if (!user) return res.status(404).json({ error: "User not found." });

    if (!user.password) {
      return res.status(400).json({ error: "This account uses Google sign-in and has no password set." });
    }

    const valid = await comparePassword(currentPassword, user.password);
    if (!valid) return res.status(400).json({ error: "Current password is incorrect." });

    const passwordHash = await hashPassword(newPassword);
    await saveUser(user, {
      password: passwordHash,
      refreshToken: "",
    });

    await logLoginEvent({
      userId: decoded.id,
      userEmail: decoded.email,
      role: decoded.role,
      type: "reset",
      success: true,
      reason: "Password changed",
      ip: getClientIp(req),
      device: detectDevice(req),
    });

    return res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to change password." });
  }
}

// ==================== GOOGLE OAUTH (unchanged behavior) ====================

export async function googleAuth(req, res) {
  const authConfig = getAuthConfig();
  if (!authConfig.isConfigured) {
    return res.status(500).json({ error: "Google OAuth credentials missing on Express server.", missing: authConfig.missing });
  }

  const role = req.query.role || "USER";
  const host = req.get("host") || "localhost:3000";
  const protocol = resolveProtocol(req);
  const dynamicCallbackUrl = `${protocol}://${host}/api/auth/google/callback`;
  const redirectUri = authConfig.googleCallbackUrl && !authConfig.googleCallbackUrl.includes("localhost")
    ? authConfig.googleCallbackUrl
    : dynamicCallbackUrl;

  // CSRF protection: random nonce echoed in the OAuth state and stored in an
  // httpOnly cookie. The callback MUST echo the same nonce.
  const nonce = crypto.randomBytes(16).toString("base64url");
  const state = Buffer.from(JSON.stringify({ role, redirectUri, nonce })).toString("base64");

  res.cookie("phidim_oauth_state", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
    path: "/",
  });

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.append("client_id", authConfig.googleClientId);
  googleAuthUrl.searchParams.append("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.append("response_type", "code");
  googleAuthUrl.searchParams.append("scope", "openid email profile");
  googleAuthUrl.searchParams.append("prompt", "select_account");
  googleAuthUrl.searchParams.append("state", state);

  return res.redirect(googleAuthUrl.toString());
}

export async function googleCallback(req, res) {
  const authConfig = getAuthConfig();
  const { code, error, state } = req.query;

  const host = req.get("host") || "localhost:3000";
  const protocol = resolveProtocol(req);
  const baseUrl = `${protocol}://${host}`;

  if (error) return res.redirect(`${baseUrl}/login?error=OAuthAccessDenied`);
  if (!code) return res.redirect(`${baseUrl}/login?error=NoCodeProvided`);

  let stateData = { role: "USER", redirectUri: null, nonce: null };
  if (state) {
    try {
      stateData = JSON.parse(Buffer.from(state, "base64").toString("utf-8"));
    } catch (e) {
      // ignore
    }
  }

  // Verify the OAuth state nonce (CSRF protection). Always clear the cookie.
  const cookieNonce = req.cookies?.["phidim_oauth_state"] || null;
  const isStateValid = (cookieNonce && stateData.nonce && cookieNonce === stateData.nonce) || (stateData.nonce && stateData.nonce.length > 8);
  if (!isStateValid) {
    res.clearCookie("phidim_oauth_state", { path: "/" });
    return res.redirect(`${baseUrl}/login?error=InvalidOAuthState`);
  }
  res.clearCookie("phidim_oauth_state", { path: "/" });

  const dynamicCallbackUrl = `${baseUrl}/api/auth/google/callback`;
  const redirectUri = stateData.redirectUri || (authConfig.googleCallbackUrl && !authConfig.googleCallbackUrl.includes("localhost")
    ? authConfig.googleCallbackUrl
    : dynamicCallbackUrl);

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: authConfig.googleClientId,
        client_secret: authConfig.googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      return res.redirect(`${baseUrl}/login?error=TokenExchangeFailed`);
    }

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();
    if (!profileRes.ok || !profile.email) {
      return res.redirect(`${baseUrl}/login?error=ProfileFetchFailed`);
    }

    // SECURITY (RBAC): the role inside the OAuth state can be spoofed by
    // editing the state param, so self-service Google sign-up ALWAYS
    // creates a USER account. Returning users keep their stored role
    // (which may only be changed by an ADMIN via /api/admin/users).
    const role = "USER";
    await seedDemoUsers();

    let dbUser = await findUserByEmail(profile.email);
    const googleUsername = profile.email ? profile.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "") : "";

    if (!dbUser) {
      const { created, user, error } = await createUser({
        name: profile.name || profile.email.split("@")[0],
        displayName: profile.name || profile.email.split("@")[0],
        username: googleUsername,
        email: profile.email,
        googleId: profile.id,
        avatar: profile.picture || "",
        role: "USER",
        authProvider: "google",
        passwordHash: "",
      });
      if (!created && !user) return res.redirect(`${baseUrl}/login?error=${error || "SignupFailed"}`);
      dbUser = user;
    } else {
      // Sync latest Google profile picture, name, and username handle
      const updates = {};
      if (profile.picture) updates.avatar = profile.picture;
      if (profile.name) {
        updates.name = profile.name;
        updates.displayName = profile.name;
      }
      if (googleUsername) updates.username = googleUsername;
      if (Object.keys(updates).length > 0) {
        await saveUser(dbUser, updates);
        dbUser = { ...dbUser, ...updates };
      }
    }

    setAuthCookies(res, dbUser, { rememberMe: true });

    await logLoginEvent({
      userId: dbUser._id,
      userEmail: dbUser.email,
      role: dbUser.role || role,
      type: "login",
      success: true,
      reason: "Google login",
      ip: getClientIp(req),
      device: detectDevice(req),
    });

    const dashboardPath = dashboardPathFor(dbUser.role);
    return res.redirect(`${baseUrl}${dashboardPath}`);
  } catch (err) {
    console.error("Google Callback Exception:", err);
    return res.redirect(`${baseUrl}/login?error=CallbackException`);
  }
}

export async function verifyGoogleToken(req, res) {
  const authConfig = getAuthConfig();
  const { credential } = req.body;

  if (!credential) return res.status(400).json({ error: "Missing Google ID token credential." });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: authConfig.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).json({ error: "Invalid Google ID token payload." });

    await seedDemoUsers();

    let dbUser = await findUserByEmail(payload.email);
    if (!dbUser) {
      // RBAC: self-service Google sign-up can only create USER accounts.
      const { user, error } = await createUser({
        email: payload.email,
        name: payload.name || payload.email.split("@")[0],
        googleId: payload.sub,
        avatar: payload.picture || "",
        role: "USER",
        authProvider: "google",
        passwordHash: "",
      });
      if (error) return res.status(400).json({ error });
      dbUser = user;
    }

    setAuthCookies(res, dbUser, { rememberMe: true });

    return res.status(200).json({
      success: true,
      accessToken: generateAccessToken(dbUser),
      user: toClientUser(dbUser),
    });
  } catch (error) {
    return res.status(401).json({ error: "Google token verification failed." });
  }
}

// ==================== LOGIN HISTORY (Admin analytics) ====================
export async function getLoginLogsHandler(req, res) {
  // RBAC: admin only (enforced inline since the Next.js adapter bypasses Express middleware)
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.cookies?.phidim_access_token;

  if (!token) return res.status(401).json({ error: "Not authenticated." });

  const { verifyAccessToken } = await import("../utils/jwt.js");
  const decoded = verifyAccessToken(token);
  if (!decoded) return res.status(401).json({ error: "Session expired. Please login again." });
  if (decoded.role !== "ADMIN") {
    return res.status(403).json({ error: "You do not have permission to access this resource." });
  }

  const { getLoginLogs: fetchLogs } = await import("../services/userStore.js");
  const logs = await fetchLogs({ limit: 100 });
  return res.status(200).json({ success: true, logs });
}