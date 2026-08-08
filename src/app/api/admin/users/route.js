import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { getAllUsers, saveUser, findUserByEmail } from "@/server/services/userStore.js";
import { toClientUser } from "@/lib/auth/session";
import { logAudit } from "@/lib/auth/audit";

export const runtime = "nodejs";

/**
 * /api/admin/users — ADMIN ONLY.
 *
 *   GET  -> list users (never returns password/hash/refresh tokens)
 *   PATCH-> change another user's role or status (audited). An admin
 *           cannot modify their own account this way, which prevents a
 *           single click from demoting yourself / self-escalating.
 */
export async function GET(request) {
  try {
    await authorizeApi([ROLES.ADMIN], request);
    const users = await getAllUsers({ limit: 200 });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function PATCH(request) {
  try {
    const { user: actor } = await authorizeApi([ROLES.ADMIN], request);
    const body = await request.json().catch(() => ({}));

    const action = body.action === "changeRole" ? "changeRole" : body.action === "changeStatus" ? "changeStatus" : "";
    if (!action) {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }

    const targetEmail = String(body.email || "").trim().toLowerCase();
    if (!targetEmail) return NextResponse.json({ error: "email is required." }, { status: 400 });
    if (targetEmail === actor.email) {
      return NextResponse.json({ error: "You cannot modify your own account this way." }, { status: 400 });
    }

    const target = await findUserByEmail(targetEmail);
    if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });

    let fields;
    if (action === "changeRole") {
      const role = String(body.role || "");
      if (!["USER", "TECHNICIAN", "ADMIN"].includes(role)) {
        return NextResponse.json({ error: "Invalid role." }, { status: 400 });
      }
      fields = { role };
    } else {
      const status = String(body.status || "");
      if (!["active", "inactive", "suspended"].includes(status)) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 });
      }
      fields = { status };
    }

    const before = { role: target.role, status: target.status };
    const updatedUser = await saveUser(target, fields);

    try {
      await logAudit({
        action: action === "changeRole" ? "role_change" : "status_change",
        userId: actor.id,
        userEmail: actor.email,
        role: actor.role,
        request,
        reason: `${action} on ${target.email}: role ${before.role}->${updatedUser?.role ?? fields.role}, status ${before.status}->${updatedUser?.status ?? fields.status}`,
      });
    } catch {
      // audit must never block the admin action
    }

    revalidatePath("/admin/users");
    return NextResponse.json({ success: true, user: updatedUser ? toClientUser(updatedUser) : null });
  } catch (error) {
    return handleAuthError(error);
  }
}