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
    const { user } = await authorizeApi([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN], request);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function PATCH(request) {
  try {
    const { user } = await authorizeApi([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN], request);
    const body = await request.json().catch(() => ({}));

    const name = String(body.name || "").trim();
    const displayName = String(body.displayName || "").trim();
    const phone = String(body.phone || "").trim();
    const avatar = String(body.avatar || "").trim();

    if (name && name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    const fields = {};
    if (name) fields.name = name;
    if (displayName) fields.displayName = displayName;
    if (phone) fields.phone = phone;
    if (avatar) fields.avatar = avatar;

    const updatedUser = await saveUser({ email: user.email }, fields);
    const clientUser = updatedUser ? toClientUser(updatedUser) : { ...user, ...fields };

    const res = NextResponse.json({ success: true, user: clientUser });
    // Browser cookies are limited to roughly 4 KB. Uploaded photos are data
    // URLs and must never be copied into the lightweight session cookie.
    const cookieUser = {
      ...clientUser,
      avatar: clientUser.avatar?.startsWith("data:") ? "" : clientUser.avatar,
    };
    const cookieVal = encodeURIComponent(JSON.stringify(cookieUser));
    res.cookies.set("phidim_auth_user", cookieVal, {
      path: "/",
      maxAge: 2592000,
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return handleAuthError(error);
  }
}
