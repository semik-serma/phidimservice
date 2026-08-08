// Simple in-memory rate limiter + account lockout for brute-force protection.
// Production deployments can swap this for Redis-backed storage.

const loginsByIp = new Map();
const loginsByAccount = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 5; // 5 requests per minute per IP
const MAX_FAILED_ATTEMPTS = 5; // 5 failed attempts then lock
const LOCK_MS = 15 * 60 * 1000; // 15 minutes

function prune(map) {
  const now = Date.now();
  for (const [key, entry] of map.entries()) {
    if (entry.buckets && Array.isArray(entry.buckets)) {
      entry.buckets = entry.buckets.filter((t) => now - t < WINDOW_MS);
      if (entry.buckets.length === 0) map.delete(key);
    } else if (now - (entry.lastAttemptAt || entry.lastAttempt || 0) >= WINDOW_MS && (entry.failedCount || 0) === 0 && !(entry.lockUntil && entry.lockUntil > now)) {
      map.delete(key);
    }
  }
}

// Rate limit login requests per IP. Returns { ok, retryAfterSeconds }.
export function checkRateLimit(ip) {
  prune(loginsByIp);
  const now = Date.now();
  const entry = loginsByIp.get(ip) || { buckets: [], blockedUntil: 0 };

  if (entry.blockedUntil && entry.blockedUntil > now) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000), message: "Too many requests. Please try again later." };
  }

  if (entry.buckets.length >= MAX_REQUESTS_PER_MINUTE) {
    entry.blockedUntil = now + 60 * 1000;
    loginsByIp.set(ip, entry);
    return { ok: false, retryAfterSeconds: 60, message: "Too many login attempts. Please wait a minute." };
  }

  entry.buckets.push(now);
  loginsByIp.set(ip, entry);
  return { ok: true };
}

// Record a failed login attempt against an account (email). Returns whether the account is now locked.
export function recordFailedAttempt(accountKey) {
  prune(loginsByAccount);
  const now = Date.now();
  const entry = loginsByAccount.get(accountKey) || { failedCount: 0, lockUntil: 0 };

  if (entry.lockUntil && entry.lockUntil > now) {
    return { locked: true, remainingMs: entry.lockUntil - now, refused: false };
  }

  // Reset counter if the previous lock expired
  if (entry.lockUntil && entry.lockUntil <= now) {
    entry.failedCount = 0;
    entry.lockUntil = 0;
  }

  entry.failedCount += 1;
  entry.lastAttemptAt = now;

  if (entry.failedCount >= MAX_FAILED_ATTEMPTS) {
    entry.lockUntil = now + LOCK_MS;
    entry.failedCount = 0;
    loginsByAccount.set(accountKey, entry);
    return { locked: true, remainingMs: LOCK_MS, refused: false };
  }

  loginsByAccount.set(accountKey, entry);
  return { locked: false, remainingMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS - entry.failedCount };
}

// Returns remaining lock time (in ms) for an account if locked, else 0.
export function getAccountLock(accountKey) {
  const entry = loginsByAccount.get(accountKey);
  if (!entry) return 0;
  if (entry.lockUntil && entry.lockUntil > Date.now()) {
    return entry.lockUntil - Date.now();
  }
  return 0;
}

export function clearFailedAttempts(accountKey) {
  loginsByAccount.delete(accountKey);
}