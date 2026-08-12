import { User } from "../models/User.js";
import { LoginLog } from "../models/LoginLog.js";
import { connectDB } from "../config/db.js";
import { getMemoryUsers, getMemoryLogs, addMemoryLog } from "../utils/memoryStore.js";
import { seedDemoUsersInMemory } from "../utils/seedDemoUsers.js";
import { dashboardPathFor } from "@/lib/auth/roles.js";

let dbAvailable = false;
let dbCheckDone = false;
let dbCheckPromise = null;

// Lightweight reachability probe. Failure switches to the in-memory store.
async function ensureBackend() {
  if (dbCheckDone) return dbAvailable;
  if (!dbCheckPromise) {
    dbCheckPromise = connectDB()
      .then((res) => {
        dbAvailable = res;
        dbCheckDone = true;
        return res;
      })
      .catch(() => {
        dbAvailable = false;
        dbCheckDone = true;
        return false;
      });
  }
  return dbCheckPromise;
}

function toPublicUser(u) {
  return {
    id: u._id?.toString ? u._id.toString() : u._id,
    name: u.name,
    displayName: u.displayName || u.name || "",
    email: u.email,
    phone: u.phone || "",
    role: u.role,
    status: u.status || "active",
    avatar: u.avatar || u.picture || "",
    dashboardPath: dashboardPathFor(u.role),
  };
}

function normalizeDoc(doc) {
  return doc && doc.toObject ? doc.toObject() : doc;
}

export async function findUserByEmail(email) {
  const lower = String(email || "").trim().toLowerCase();
  await seedDemoUsers();

  if (!(await ensureBackend())) {
    const mem = getMemoryUsers();
    const user = mem.get(lower);
    return user || null;
  }
  try {
    const user = await User.findOne({ email: lower }).select("+password +refreshToken +resetPasswordToken +resetPasswordExpires +loginAttempts +lockUntil");
    return normalizeDoc(user) || null;
  } catch (e) {
    dbAvailable = false;
    const mem = getMemoryUsers();
    return mem.get(lower) || null;
  }
}

export async function findUserByEmailOrPhone(identity) {
  const trimmed = String(identity || "").trim();
  await seedDemoUsers();

  if (!(await ensureBackend())) {
    const mem = getMemoryUsers();
    const byEmail = mem.get(trimmed.toLowerCase());
    if (byEmail) return byEmail;
    for (const [, user] of mem.entries()) {
      if (user.phone === trimmed || user._id === trimmed || user.email.toLowerCase() === trimmed.toLowerCase()) return user;
    }
    return null;
  }

  try {
    const user = await User.findOne({
      $or: [{ email: trimmed.toLowerCase() }, { phone: trimmed }],
    }).select("+password +resetPasswordToken +resetPasswordExpires +loginAttempts +lockUntil +refreshToken");
    return normalizeDoc(user) || null;
  } catch (e) {
    dbAvailable = false;
    const mem = getMemoryUsers();
    const byEmail = mem.get(trimmed.toLowerCase());
    if (byEmail) return byEmail;
    for (const [, user] of mem.entries()) {
      if (user.phone === trimmed) return user;
    }
    return null;
  }
}

export async function createUser({ name, email, phone = "", passwordHash = "", role = "USER", authProvider = "local", avatar = "" }) {
  if (!(await ensureBackend())) {
    const mem = getMemoryUsers();
    const existing = mem.get(String(email).toLowerCase());
    if (existing) {
      return { error: "User with this email already exists." };
    }
    const user = {
      _id: `${role.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email: String(email).toLowerCase(),
      phone,
      password: passwordHash,
      role,
      authProvider,
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      status: "active",
      dashboardPath: dashboardPathFor(role),
    };
    mem.set(user.email, user);
    return { created: true, user: { ...user }, isMemory: true };
  }

  try {
    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) return { error: "User with this email already exists." };

    const user = await User.create({
      name,
      email: String(email).toLowerCase(),
      phone,
      password: passwordHash,
      role,
      authProvider,
      avatar: avatar || undefined,
    });
    return { created: true, user: normalizeDoc(user) };
  } catch (e) {
    dbAvailable = false;
    const mem = getMemoryUsers();
    const key = String(email).toLowerCase();
    if (mem.has(key)) return { error: "User with this email already exists." };
    const user = {
      _id: `${role.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email: key,
      phone,
      password: passwordHash,
      role,
      authProvider,
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      status: "active",
      dashboardPath: dashboardPathFor(role),
    };
    mem.set(key, user);
    return { created: true, user: { ...user }, isMemory: true };
  }
}

export async function saveUser(user, fields = {}) {
  if (!(await ensureBackend())) {
    const mem = getMemoryUsers();
    const key = user.email;
    const existing = mem.get(key);
    if (existing) {
      mem.set(key, { ...existing, ...fields });
      return mem.get(key);
    }
    return null;
  }

  try {
    const updated = await User.findOneAndUpdate(
      { email: String(user.email).toLowerCase() },
      { $set: fields },
      { new: true, runValidators: true }
    ).select("+password +resetPasswordToken +resetPasswordExpires +loginAttempts +lockUntil +refreshToken");
    return normalizeDoc(updated) || null;
  } catch (e) {
    dbAvailable = false;
    const mem = getMemoryUsers();
    const key = user.email;
    const existing = mem.get(key);
    if (existing) {
      mem.set(key, { ...existing, ...fields });
      return mem.get(key);
    }
    return null;
  }
}

export async function logLoginEvent({ userId = "", userEmail = "", role = "", type = "login", success = true, reason = "", ip = "", browser = "", os = "", device = "", userAgent = "", action = "" }) {
  const entry = {
    userId,
    userEmail,
    role,
    type,
    action,
    success,
    reason,
    ip,
    browser,
    os,
    device,
    userAgent,
    createdAt: new Date().toISOString(),
  };

  if (!(await ensureBackend())) {
    addMemoryLog(entry);
    return entry;
  }

  try {
    await LoginLog.create(entry);
  } catch (e) {
    addMemoryLog(entry);
  }
  return entry;
}

export async function getLoginLogs({ limit = 100 } = {}) {
  if (!(await ensureBackend())) {
    return getMemoryLogs().slice(0, limit);
  }
  try {
    const logs = await LoginLog.find().sort({ createdAt: -1 }).limit(limit).lean();
    return logs;
  } catch (e) {
    return getMemoryLogs().slice(0, limit);
  }
}

/** List users (admin). Never exposes password/refresh tokens. */
export async function getAllUsers({ limit = 200 } = {}) {
  await seedDemoUsers();
  if (!(await ensureBackend())) {
    return Array.from(getMemoryUsers().values())
      .slice(0, limit)
      .map(toPublicUser);
  }
  try {
    const users = await User.find()
      .select("-password -refreshToken -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return users.map((u) => toPublicUser(u));
  } catch (e) {
    dbAvailable = false;
    return Array.from(getMemoryUsers().values())
      .slice(0, limit)
      .map(toPublicUser);
  }
}

let hasSeededMemory = false;

export async function seedDemoUsers() {
  if (hasSeededMemory) return;
  if (!(await ensureBackend())) {
    seedDemoUsersInMemory(getMemoryUsers());
    hasSeededMemory = true;
  }
}