import mongoose from "mongoose";
import { dashboardPathFor } from "@/lib/auth/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "TECHNICIAN", "ADMIN"],
      default: "USER",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    googleId: {
      type: String,
      default: "",
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    dashboardPath: {
      type: String,
      default: "/dashboard/user",
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: "",
      select: false,
    },
    resetPasswordToken: {
      type: String,
      default: "",
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
      select: false,
    },
    lastDevice: {
      type: Object,
      default: {},
    },
    lastIP: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster role/lock queries
userSchema.index({ email: 1, role: 1 });
userSchema.index({ lockUntil: 1 });

// Helper method to resolve canonical dashboard path based on role
userSchema.pre("save", function (next) {
  this.dashboardPath = dashboardPathFor(this.role);
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);