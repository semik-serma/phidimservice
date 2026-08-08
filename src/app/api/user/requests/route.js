import { NextResponse } from "next/server";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { createServiceRequest, getRequestsForUser } from "@/server/services/serviceStore.js";
import { logAudit } from "@/lib/auth/audit";

export const runtime = "nodejs";

/**
 * /api/user/requests — USER & ADMIN only.
 *
 * Ownership is guaranteed by the store query: the session user's id and
 * email are extracted server-side, so a caller can never ask for someone
 * else's requests (there is no accept-a-user-id parameter).
 */
export async function GET(request) {
  try {
    const { user } = await authorizeApi([ROLES.USER, ROLES.ADMIN], request);
    const requests = await getRequestsForUser({ userId: user.id, userEmail: user.email });
    return NextResponse.json({ success: true, requests });
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function POST(request) {
  try {
    const { user } = await authorizeApi([ROLES.USER, ROLES.ADMIN], request);
    const body = await request.json().catch(() => ({}));

    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const created = await createServiceRequest({
      userId: user.id,
      userEmail: user.email,
      title,
      category: String(body.category || "").trim().slice(0, 60),
      description: String(body.description || "").trim().slice(0, 500),
      phone: String(body.phone || "").trim().slice(0, 20),
    });

    try {
      await logAudit({
        action: "request_created",
        userId: user.id,
        userEmail: user.email,
        role: user.role,
        request,
        reason: `Created service request ${created.request.id}`,
      });
    } catch {
      // audit must never block the request
    }

    return NextResponse.json({ success: true, request: created.request }, { status: 201 });
  } catch (error) {
    return handleAuthError(error);
  }
}