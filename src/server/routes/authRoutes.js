import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshTokenHandler,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuth,
  googleCallback,
  verifyGoogleToken,
  getLoginLogsHandler,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Email & Password Auth
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshTokenHandler);

// Password flows
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", protect, changePassword);

// Session
router.get("/me", protect, getCurrentUser);

// Login history (admin only)
router.get("/login-logs", protect, restrictTo("ADMIN"), getLoginLogsHandler);

// Google OAuth 2.0 Backend Endpoints
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/google/verify", verifyGoogleToken);

export default router;