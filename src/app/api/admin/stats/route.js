import { NextResponse } from "next/server";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { getAllUsers, getLoginLogs } from "@/server/services/userStore.js";
import { getAllRequests } from "@/server/services/serviceStore.js";

export const runtime = "nodejs";

/**
 * /api/admin/stats — ADMIN ONLY. Summary metrics for the analytics
 * dashboard. Row-level role ownership does not apply here because the
 * entire dataset is (by design) admin-visible; access to the endpoint
 * itself is what requires the ADMIN role.
 */
export async function GET(request) {
  try {
    await authorizeApi([ROLES.ADMIN], request);

    const [users, requests, loginLogs] = await Promise.all([
      getAllUsers({ limit: 5000 }),
      getAllRequests(),
      getLoginLogs({ limit: 50 }),
    ]);

    const roleCounts = users.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: users.length,
        roleCounts,
        totalRequests: requests.length,
        requestStatusCounts: requests.reduce((acc, r) => {
          acc[r.status] = (acc[r.status] || 0) + 1;
          return acc;
        }, {}),
        recentLogins: loginLogs.map((l) => ({
          email: l.userEmail,
          role: l.role,
          type: l.type,
          success: l.success,
          ip: l.ip,
          createdAt: l.createdAt,
        })),
      },
    });
  } catch (error) {
    return handleAuthError(error);
  }
}