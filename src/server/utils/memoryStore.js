// In-memory fallback store used when MongoDB is unreachable.
// Mirrors the User schema shape so the auth layer works without a database.

import fs from "fs";
import path from "path";

const memoryUsers = new Map();
const memoryLoginLogs = [];
const memoryRequests = [];
const MEMORY_USERS_FILE = path.join(process.cwd(), ".phidim_memory_users.json");
let usersHydrated = false;

function hydrateMemoryUsers() {
  if (usersHydrated) return;
  usersHydrated = true;
  try {
    const stored = JSON.parse(fs.readFileSync(MEMORY_USERS_FILE, "utf-8"));
    if (!Array.isArray(stored)) return;
    stored.forEach((user) => {
      if (user?.email) memoryUsers.set(String(user.email).toLowerCase(), user);
    });
  } catch {}
}

export function getMemoryUsers() {
  hydrateMemoryUsers();
  return memoryUsers;
}

// Keeps the no-Mongo development fallback durable. This is deliberately a
// server-side file; browser storage alone cannot restore accounts after a
// server restart or make updates visible to a new browser session.
export function persistMemoryUsers() {
  hydrateMemoryUsers();
  try {
    const temporary = `${MEMORY_USERS_FILE}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify([...memoryUsers.values()], null, 2), "utf-8");
    fs.renameSync(temporary, MEMORY_USERS_FILE);
  } catch (error) {
    console.error("Could not persist local user store:", error);
  }
}

export function getMemoryLogs() {
  return memoryLoginLogs;
}

export function getMemoryRequests() {
  return memoryRequests;
}

export function addMemoryRequest(entry) {
  memoryRequests.unshift(entry);
  if (memoryRequests.length > 200) {
    memoryRequests.length = 200;
  }
  return entry;
}

export function addMemoryLog(entry) {
  memoryLoginLogs.unshift(entry);
  if (memoryLoginLogs.length > 500) {
    memoryLoginLogs.length = 500;
  }
  return entry;
}
