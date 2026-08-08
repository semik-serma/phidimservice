import { NextResponse } from "next/server";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import {
  getRequestsForTechnician,
  getAllRequests,
  updateServiceRequest,
} from "@/server/services/serviceStore.js";
import { SERVICE_REQUEST_STATUSES } from "@/lib/requests";
import { logAudit } from "@/lib/auth/audit";

export const runtime = "nodejs";

/**
 * /api/technician/jobs — TECHNICIAN & ADMIN only.
 *
 * A TECHNICIAN sees only jobs ASSIGNED to them (the store scopes the
 * query by the session's email; no user-supplied id is trusted).
 * A status update mutates ONLY the row, and a TECHNICIAN may only change
 * the status of jobs that belong to them.
 */
export async function GET(request) {
  try {
    const { user } = await authorizeApi([ROLES.TECHNICIAN, ROLES.ADMIN], request);
    // ADMIN sees every job; a TECHNICIAN sees only jobs assigned to them.
    const jobs =
      user.role === ROLES.ADMIN
        ? await getAllRequests()
        : await getRequestsForTechnician({ technicianEmail: user.email, technicianId: user.id });
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function PATCH(request) {
  try {
    const { user } = await authorizeApi([ROLES.TECHNICIAN, ROLES.ADMIN], request);
    const body = await request.json().catch(() => ({}));
    const requestId = String(body.requestId || "");
    const status = String(body.status || "");

    if (!requestId) return NextResponse.json({ error: "requestId is required." }, { status: 400 });
    if (!SERVICE_REQUEST_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    // Ownership check: a TECHNICIAN may only update jobs assigned to them.
    const allowed = await getRequestsForTechnician({ technicianEmail: user.email, technicianId: user.id });
    const mine = allowed.some((r) => r.id === requestId);
    if (user.role !== ROLES.ADMIN && !mine) {
      try {
        await logAudit({
          action: "api_access_denied",
          userId: user.id,
          userEmail: user.email,
          role: user.role,
          request,
          reason: `Tried to update ${requestId} which is not assigned to them`,
        });
      } catch {
        // ignore
      }
      return NextResponse.json({ error: "That job is not assigned to you." }, { status: 403 });
    }

    const updated = await updateServiceRequest({ requestId, fields: { status } });
    if (!updated) return NextResponse.json({ error: "Request not found." }, { status: 404 });

    try {
      await logAudit({
        action: "request_status_update",
        userId: user.id,
        userEmail: user.email,
        role: user.role,
        request,
        reason: `Updated ${requestId} status to ${status}`,
      });
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, message: "Status updated.", request: updated });
  } catch (error) {
    return handleAuthError(error);
  }
}