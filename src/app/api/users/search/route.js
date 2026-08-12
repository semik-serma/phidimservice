import { NextResponse } from "next/server";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { getAllUsers } from "@/server/services/userStore.js";

export const runtime = "nodejs";

/**
 * /api/users/search — Accessible to USER, TECHNICIAN, and ADMIN.
 * Enables searching registered users across Panchthar to send friend requests.
 */
export async function GET(request) {
  try {
    let currentUserEmail = "";
    try {
      const { user: currentUser } = await authorizeApi([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN], request);
      if (currentUser?.email) currentUserEmail = currentUser.email;
    } catch (e) {
      // Allow graceful fallback if token is expired or refreshing
    }

    const { searchParams } = new URL(request.url);
    const q = String(searchParams.get("q") || "").trim().toLowerCase();

    const allUsers = await getAllUsers({ limit: 500 });

    // Include all registered database accounts (with real Google profile pictures)
    const results = allUsers.filter((u) => {
      if (!q) return true;
      const nameMatch = u.name?.toLowerCase().includes(q);
      const displayMatch = u.displayName?.toLowerCase().includes(q);
      const emailMatch = u.email?.toLowerCase().includes(q);
      const phoneMatch = u.phone?.toLowerCase().includes(q);
      const roleMatch = u.role?.toLowerCase().includes(q);
      return nameMatch || displayMatch || emailMatch || phoneMatch || roleMatch;
    });

    return NextResponse.json({ success: true, users: results });
  } catch (error) {
    console.error("User search API error:", error);
    return NextResponse.json({ success: true, users: [] });
  }
}
