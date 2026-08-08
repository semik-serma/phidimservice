import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "",
      index: true,
    },
    userEmail: {
      type: String,
      default: "",
      index: true,
    },
    role: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["login", "logout", "refresh", "reset", "failed", "audit"],
      default: "login",
    },
    action: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: true,
    },
    reason: {
      type: String,
      default: "",
    },
    ip: {
      type: String,
      default: "",
    },
    browser: {
      type: String,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    // Lightweight in-memory fixture when MongoDB is not reachable
  },
  {
    timestamps: true,
  }
);

loginLogSchema.index({ createdAt: -1 });

export const LoginLog = mongoose.models.LoginLog || mongoose.model("LoginLog", loginLogSchema);