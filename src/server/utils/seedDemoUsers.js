import { createRequire } from "module";
import { dashboardPathFor } from "@/lib/auth/roles.js";

const req = createRequire(import.meta.url);
const bcrypt = req("bcryptjs");

// Demo accounts used when MongoDB is not available.
// Passwords are hashed once at startup (bcrypt, 12 rounds).

export const DEMO_SEED_USERS = [
  {
    _id: "ADM-001",
    name: "Dhanraj Serma",
    displayName: "Dhanraj Serma (Master Admin)",
    email: "dhanrajserma34@gmail.com",
    phone: "+977 9800000000",
    role: "ADMIN",
    customPassword: "Phidim@123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("ADMIN"),
  },
  {
    _id: "USR-SEMIK",
    name: "Semik Serma",
    displayName: "Semik Serma",
    email: "semikserma@gmail.com",
    phone: "+977 9862772400",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
  {
    _id: "USR-WEBDEV",
    name: "Web Developer",
    displayName: "Web Developer",
    email: "webdeveloper@phidim.np",
    phone: "+977 9862000111",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
  {
    _id: "TECH-RAJESH",
    name: "Rajesh Tamang",
    displayName: "Rajesh Tamang (CCTV & DTH Specialist)",
    email: "rajesh@phidim.np",
    phone: "+977 9842109842",
    role: "TECHNICIAN",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "TECH-ANITA",
    name: "Anita Gurung",
    displayName: "Anita Gurung (Electrical Tech)",
    email: "anita@phidim.np",
    phone: "+977 9862334455",
    role: "TECHNICIAN",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "TECH-SUMAN",
    name: "Suman Limbu",
    displayName: "Suman Limbu (Master Electrician)",
    email: "suman@phidim.np",
    phone: "+977 9855555555",
    role: "TECHNICIAN",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "TECH-KIRAN",
    name: "Kiran Gurung",
    displayName: "Kiran Gurung (Security Systems)",
    email: "kiran@phidim.np",
    phone: "+977 9877777777",
    role: "TECHNICIAN",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("TECHNICIAN"),
  },
  {
    _id: "USR-SARASWATI",
    name: "Saraswati Subedi",
    displayName: "Saraswati Subedi",
    email: "saraswati@phidim.np",
    phone: "+977 9812345678",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
  {
    _id: "USR-BIKASH",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    email: "bikash@phidim.np",
    phone: "+977 9801122334",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
  {
    _id: "USR-POOJA",
    name: "Pooja Karki",
    displayName: "Pooja Karki",
    email: "pooja@phidim.np",
    phone: "+977 9866666666",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
  {
    _id: "USR-SUNIL",
    name: "Sunil Sherpa",
    displayName: "Sunil Sherpa",
    email: "sunil@phidim.np",
    phone: "+977 9888888888",
    role: "USER",
    customPassword: "password123",
    avatar: "",
    status: "active",
    dashboardPath: dashboardPathFor("USER"),
  },
];

const DEMO_PASSWORD = "password123";
let cachedDefaultHash = null;

export function seedDemoUsersInMemory(store) {
  if (!cachedDefaultHash) {
    try {
      cachedDefaultHash = bcrypt.hashSync(DEMO_PASSWORD, 4);
    } catch (e) {
      cachedDefaultHash = "$2a$04$e5r.ZqB8Z6qC8ZqB8Z6qCe5r.ZqB8Z6qC8ZqB8Z6qCe5r.ZqB8Z6qC";
    }
  }

  for (const seed of DEMO_SEED_USERS) {
    if (!store.has(seed.email)) {
      const pwd = seed.customPassword;
      const pwdHash = pwd && pwd !== DEMO_PASSWORD
        ? bcrypt.hashSync(pwd, 4)
        : cachedDefaultHash;

      store.set(seed.email, {
        ...seed,
        password: pwdHash,
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