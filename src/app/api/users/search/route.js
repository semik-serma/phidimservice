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
    const { user: currentUser } = await authorizeApi([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN], request);
    const { searchParams } = new URL(request.url);
    const q = String(searchParams.get("q") || "").trim().toLowerCase();

    const allUsers = await getAllUsers({ limit: 500 });

    // Exclude self and filter by search query
    const results = allUsers
      .filter((u) => u.email !== currentUser.email)
      .filter((u) => {
        if (!q) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          (u.displayName && u.displayName.toLowerCase().includes(q)) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone && u.phone.includes(q)) ||
          u.role.toLowerCase().includes(q)
        );
      });

    return NextResponse.json({ success: true, users: results });
  } catch (error) {
    return handleAuthError(error);
  }
}
