"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react";

const AuthContext = createContext({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  register: async () => {},
  refreshSession: async () => {},
  hasRole: () => false,
});

export const DEMO_ACCOUNTS = {
  USER: {
    id: "USR-8821",
    name: "Ram Shrestha",
    email: "user@phidim.np",
    phone: "+977 9862772457",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    address: "Phidim-1, Panchthar",
    dashboardPath: "/user/dashboard",
  },
  TECHNICIAN: {
    id: "TECH-8842",
    name: "Rajesh Tamang",
    email: "tech@phidim.np",
    phone: "+977 9842109842",
    role: "TECHNICIAN",
    specialty: "Senior AC & Fiber Specialist",
    rating: "4.95 ★",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    address: "Phidim Sector 4, Panchthar",
    dashboardPath: "/technician/dashboard",
  },
  ADMIN: {
    id: "ADM-001",
    name: "Phidim Service Admin",
    email: "admin@phidim.np",
    phone: "+977 9800000000",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    dashboardPath: "/admin/dashboard",
  },
};

const SESSION_KEY = "phidim_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimer = useRef(null);

  // Silent authentication: attempt a token refresh on every page load.
  const refreshSession = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        } catch (e) {
          // ignore
        }
        return data.user;
      }
    } catch (e) {
      // fall through to cookie/localStorage restore
    }
    return null;
  }, []);

  // Restore session: 1) refresh endpoint (httpOnly cookies) 2) persisted user.
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const refreshed = await refreshSession();
        if (!active) return;
        if (refreshed) {
          setIsLoading(false);
          return;
        }

        // Google OAuth cookie fallback
        if (typeof window !== "undefined") {
          const cookieMatch = document.cookie.match(/phidim_auth_user=([^;]+)/);
          if (cookieMatch) {
            try {
              const googleUser = JSON.parse(decodeURIComponent(cookieMatch[1]));
              setUser(googleUser);
              localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser));
              setIsLoading(false);
              return;
            } catch (e) {
              // ignore
            }
          }

          const savedUser = localStorage.getItem(SESSION_KEY);
          if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (parsed) {
              // Try to re-validate with /me (best effort, access cookie may be expiring)
              try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const meRes = await fetch("/api/auth/me", { signal: controller.signal });
                clearTimeout(timeoutId);
                if (meRes.ok) {
                  const meData = await meRes.json();
                  if (meData.success && meData.user) {
                    setUser(meData.user);
                    setIsLoading(false);
                    return;
                  }
                }
              } catch (e) {
                // fall back to saved user
              }
              setUser(parsed);
            }
          }
        }
      } catch (e) {
        console.error("Failed to restore auth session:", e);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, [refreshSession]);

  // Auto refresh access token before it expires (every ~12 minutes).
  useEffect(() => {
    if (!user) return;
    refreshTimer.current = setInterval(() => {
      refreshSession().catch(() => {
        // Silent; session will be restored on next interval or login
      });
    }, 12 * 60 * 1000);
    return () => {
      if (refreshTimer.current) clearInterval(refreshTimer.current);
    };
  }, [user, refreshSession]);

  const safeSetUser = useCallback((acc) => {
    setUser(acc);
    try {
      if (typeof window !== "undefined" && acc) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(acc));
        const cookieVal = encodeURIComponent(JSON.stringify(acc));
        document.cookie = `phidim_auth_user=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
      } else if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY);
        document.cookie = "phidim_auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
        document.cookie = "phidim_jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
        document.cookie = "phidim_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
        document.cookie = "phidim_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loginWithGoogle = useCallback(async (targetRole = "USER") => {
    setIsLoading(true);
    try {
      if (typeof window !== "undefined") {
        window.location.href = `/api/auth/google?role=${targetRole}`;
      }
    } catch (err) {
      console.error("Google login redirect error:", err);
      setIsLoading(false);
      throw err;
    }
  }, []);

  // Forwards the backend error message (wrong password, locked account, etc.)
  const login = useCallback(
    async ({ emailOrPhone, password, rememberMe = false, role = "USER" }) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrPhone, password, rememberMe, role }),
        });

        const data = await res.json();
        if (!res.ok) {
          const err = new Error(data.error || "Login failed");
          err.status = res.status;
          err.locked = data.locked;
          err.retryAfterSeconds = data.retryAfterSeconds;
          setIsLoading(false);
          throw err;
        }

        const account = data.user || DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.USER;
        safeSetUser(account);
        setIsLoading(false);

        if (typeof window !== "undefined" && account.dashboardPath) {
          window.location.href = account.dashboardPath;
        }
        return account;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [safeSetUser]
  );

  // Demo/flash login used by the login page's 1-click buttons (dev mode).
  const register = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const resData = await res.json();
        if (!res.ok) {
          const err = new Error(resData.error || "Registration failed");
          err.status = res.status;
          setIsLoading(false);
          throw err;
        }

        const newAccount = resData.user;
        safeSetUser(newAccount);
        setIsLoading(false);
        if (typeof window !== "undefined" && newAccount.dashboardPath) {
          window.location.href = newAccount.dashboardPath;
        }
        return newAccount;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [safeSetUser]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore; clear locally regardless
    }
    safeSetUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [safeSetUser]);

  const hasRole = useCallback((...roles) => {
    const role = user?.role;
    return roles.length === 0 || roles.includes(role);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      isAuthenticated: !!user,
      isLoading,
      login,
      loginWithGoogle,
      logout,
      register,
      refreshSession,
      hasRole,
    }),
    [user, isLoading, login, loginWithGoogle, logout, register, refreshSession, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {},
      loginWithGoogle: async () => {},
      logout: () => {},
      register: async () => {},
      refreshSession: async () => {},
      hasRole: () => false,
    };
  }
  return context;
}