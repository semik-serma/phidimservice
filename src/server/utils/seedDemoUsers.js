import bcrypt from "bcryptjs";
import { dashboardPathFor } from "@/lib/auth/roles.js";

// Demo accounts used when MongoDB is not available.
// Passwords are hashed once at startup (bcrypt, 12 rounds).

export const DEMO_SEED_USERS = [
  {
    _id: "ADM-001",
    name: "Phidim Service Admin",
    email: "admin@phidim.np",
    phone: "+977 9800000000",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    status: "active",
    dashboardPath: dashboardPathFor("ADMIN"),
  },
  {
    _id: "TECH-8842",
    name: "Rajesh Tamang",
    email: "tech@phidim.np",
    phone: "+977 9842109842",
    role: "TECHNICIAN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "TECH-402",
    name: "Rajesh Tamang (Tech ID 402)",
    email: "tech402@phidim.np",
    phone: "TECH-402",
    role: "TECHNICIAN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "USR-8821",
    name: "Ram Shrestha",
    email: "user@phidim.np",
    phone: "+977 9862772457",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
];

const DEMO_PASSWORD = "password123";

let seededHash = null;

export async function seedDemoUsersInMemory(store) {
  if (!seededHash) {
    seededHash = await bcrypt.hash(DEMO_PASSWORD, 12);
  }
  for (const seed of DEMO_SEED_USERS) {
    if (!store.has(seed.email)) {
      store.set(seed.email, {
        ...seed,
        password: seededHash,
        loginAttempts: 0,
        lockUntil: null,
        refreshToken: "",
        lastLogin: null,
      });
    }
  }
}

export function getDemoPassword() {
  return DEMO_PASSWORD;
}