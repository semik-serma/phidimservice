import { verifyAccessToken } from "../utils/jwt.js";

export function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.phidim_access_token) {
    token = req.cookies.phidim_access_token;
  } else if (req.cookies && req.cookies.phidim_jwt_token) {
    token = req.cookies.phidim_jwt_token;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized. No token provided." });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Not authorized. Invalid or expired token." });
  }

  req.user = decoded;
  next();
}

// Restrict route to a single role (or list of roles)
export function restrictTo(...roles) {
  return function requireRole(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "You do not have permission to access this resource." });
    }
    next();
  };
}