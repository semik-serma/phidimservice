"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
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
    dashboardPath: "/user-dashboard",
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
    dashboardPath: "/technician-dashboard",
  },
  ADMIN: {
    id: "ADM-001",
    name: "Phidim Service Admin",
    email: "admin@phidim.np",
    phone: "+977 9800000000",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    dashboardPath: "/dashboard",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session safely from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("phidim_auth_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (e) {
      console.error("Failed to parse saved auth session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const safeSetUser = (acc) => {
    setUser(acc);
    try {
      if (typeof window !== "undefined" && acc) {
        localStorage.setItem("phidim_auth_user", JSON.stringify(acc));
      } else if (typeof window !== "undefined") {
        localStorage.removeItem("phidim_auth_user");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Login handler
  const login = async ({ emailOrPhone, password, role = "USER" }) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    let account = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.USER;
    if (emailOrPhone) {
      account = {
        ...account,
        email: emailOrPhone.includes("@") ? emailOrPhone : account.email,
        phone: !emailOrPhone.includes("@") ? emailOrPhone : account.phone,
      };
    }

    safeSetUser(account);
    setIsLoading(false);

    if (typeof window !== "undefined") {
      window.location.href = account.dashboardPath;
    }
    return account;
  };

  // Register handler
  const register = async (data) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const role = data.role || "USER";
    const baseAccount = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.USER;

    const newAccount = {
      ...baseAccount,
      id: `${role.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name || baseAccount.name,
      email: data.email || baseAccount.email,
      phone: data.phone || baseAccount.phone,
      role: role,
    };

    safeSetUser(newAccount);
    setIsLoading(false);

    if (typeof window !== "undefined") {
      window.location.href = newAccount.dashboardPath;
    }
    return newAccount;
  };

  // Logout handler
  const logout = () => {
    safeSetUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
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
      logout: () => {},
      register: async () => {},
    };
  }
  return context;
}
