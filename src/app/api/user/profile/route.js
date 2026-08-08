import { NextResponse } from "next/server";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { saveUser } from "@/server/services/userStore.js";
import { toClientUser } from "@/lib/auth/session";
import { logAudit } from "@/lib/auth/audit";

export const runtime = "nodejs";

/**
 * /api/user/profile — USER & ADMIN may read & update their OWN profile.
 * Identity always comes from the session/DB; the request body only
 * carries the personal fields (name, phone) — never an account id.
 */
export async function GET(request) {
  try {
    const { user } = await authorizeApi([ROLES.USER, ROLES.ADMIN], request);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function PATCH(request) {
  try {
    const { user } = await authorizeApi([ROLES.USER, ROLES.ADMIN], request);
    const body = await request.json().catch(() => ({}));

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    if (name && name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    const fields = {};
    if (name) fields.name = name;
    if (phone) fields.phone = phone;

    const updatedUser = await saveUser({ email: user.email }, fields);

    try {
      await logAudit({
        action: "profile_update",
        userId: user.id,
        userEmail: user.email,
        role: user.role,
        request,
        reason: "User updated their own profile via API",
      });
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, user: updatedUser ? toClientUser(updatedUser) : user });
  } catch (error) {
    return handleAuthError(error);
  }
}