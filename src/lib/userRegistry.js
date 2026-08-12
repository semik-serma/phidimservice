"use client";

// Unified Real User Registry & Persistence Store
// Ensures every newly created account (local register, Google login, admin creation)
// is immediately saved and visible across User, Technician, and Admin dashboards.

const USERS_STORAGE_KEY = "phidim_registered_users_registry";

export const DEFAULT_REAL_USERS = [
  {
    id: "usr-admin-dhanraj",
    name: "Dhanraj Serma",
    displayName: "Dhanraj Serma (Master Admin)",
    role: "ADMIN",
    email: "dhanrajserma34@gmail.com",
    phone: "+977 9800000000",
    avatar: "",
    bio: "Official Phidim Service System Master Administrator.",
    location: "Phidim HQ, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-semik",
    name: "Semik Serma",
    displayName: "Semik Serma",
    role: "USER",
    email: "semikserma@gmail.com",
    phone: "+977 9862772400",
    avatar: "",
    bio: "Registered customer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-webdev",
    name: "Web Developer",
    displayName: "Web Developer",
    role: "USER",
    email: "webdeveloper@phidim.np",
    phone: "+977 9862000111",
    avatar: "",
    bio: "Registered Web Developer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    displayName: "Rajesh Tamang (CCTV & DTH Specialist)",
    role: "TECHNICIAN",
    email: "rajesh@phidim.np",
    phone: "+977 9842109842",
    avatar: "",
    bio: "Certified DishHome DTH & CCTV installation expert.",
    location: "Phidim-4, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-anita",
    name: "Anita Gurung",
    displayName: "Anita Gurung (Electrical Tech)",
    role: "TECHNICIAN",
    email: "anita@phidim.np",
    phone: "+977 9862334455",
    avatar: "",
    bio: "Certified Solar & Commercial Electrical Technician.",
    location: "Panchthar Hub, Phidim",
    online: true,
  },
  {
    id: "usr-tech-suman",
    name: "Suman Limbu",
    displayName: "Suman Limbu (Master Electrician)",
    role: "TECHNICIAN",
    email: "suman@phidim.np",
    phone: "+977 9855555555",
    avatar: "",
    bio: "Master Electrician & Plumber in Panchthar district.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-kiran",
    name: "Kiran Gurung",
    displayName: "Kiran Gurung (Security Systems)",
    role: "TECHNICIAN",
    email: "kiran@phidim.np",
    phone: "+977 9877777777",
    avatar: "",
    bio: "CCTV Security Systems & Smart Alarm technician.",
    location: "Phidim Bazar, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-saraswati",
    name: "Saraswati Subedi",
    displayName: "Saraswati Subedi",
    role: "USER",
    email: "saraswati@phidim.np",
    phone: "+977 9812345678",
    avatar: "",
    bio: "Resident of Phidim Ward 2, Panchthar.",
    location: "Phidim-2, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-bikash",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    role: "USER",
    email: "bikash@phidim.np",
    phone: "+977 9801122334",
    avatar: "",
    bio: "Resident of Phidim Ward 4, Panchthar.",
    location: "Phidim-4, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-pooja",
    name: "Pooja Karki",
    displayName: "Pooja Karki",
    role: "USER",
    email: "pooja@phidim.np",
    phone: "+977 9866666666",
    avatar: "",
    bio: "Resident of Phidim Ward 3, Panchthar.",
    location: "Phidim-3, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-sunil",
    name: "Sunil Sherpa",
    displayName: "Sunil Sherpa",
    role: "USER",
    email: "sunil@phidim.np",
    phone: "+977 9888888888",
    avatar: "",
    bio: "Hotel proprietor in Phidim main square.",
    location: "Main Bazar, Phidim",
    online: false,
  },
];

export function getStoredRealUsers() {
  if (typeof window === "undefined") return DEFAULT_REAL_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge with default seed users so all 11 real users are always present
        const map = new Map();
        [...DEFAULT_REAL_USERS, ...parsed].forEach((u) => {
          if (u && u.email) map.set(u.email.toLowerCase(), u);
        });
        return Array.from(map.values());
      }
    }
  } catch (e) {}
  return DEFAULT_REAL_USERS;
}

export function saveRealUserToRegistry(userObj) {
  if (typeof window === "undefined" || !userObj || !userObj.email) return;
  try {
    const existing = getStoredRealUsers();
    const lowerEmail = userObj.email.toLowerCase();

    const idx = existing.findIndex((u) => u.email.toLowerCase() === lowerEmail);
    const updatedUser = {
      id: userObj.id || userObj._id || `usr-${Date.now()}`,
      name: userObj.name || userObj.displayName || lowerEmail.split("@")[0],
      displayName: userObj.displayName || userObj.name || lowerEmail.split("@")[0],
      email: lowerEmail,
      phone: userObj.phone || "",
      role: userObj.role || "USER",
      avatar: userObj.avatar || userObj.picture || userObj.image || "",
      bio: userObj.bio || `Registered ${userObj.role || "USER"} in Panchthar.`,
      location: userObj.location || "Phidim, Panchthar",
      online: true,
      createdAt: userObj.createdAt || new Date().toISOString(),
    };

    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...updatedUser };
    } else {
      existing.unshift(updatedUser);
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event("phidim_users_updated"));
  } catch (e) {}
}

const listeners = new Set();

export function subscribeUserRegistry(callback) {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    const handler = () => callback(getStoredRealUsers());
    window.addEventListener("phidim_users_updated", handler);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("phidim_users_updated", handler);
    };
  }
  return () => listeners.delete(callback);
}
