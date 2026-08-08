// In-memory fallback store used when MongoDB is unreachable.
// Mirrors the User schema shape so the auth layer works without a database.

const memoryUsers = new Map();
const memoryLoginLogs = [];
const memoryRequests = [];

export function getMemoryUsers() {
  return memoryUsers;
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