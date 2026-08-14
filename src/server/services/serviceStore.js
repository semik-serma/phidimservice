/**
 * Service-request store with MongoDB + in-memory fallback (same pattern
 * as src/server/services/userStore.js).
 *
 * Row-level scoping lives HERE and is always combined with the role
 * check performed by the route handler:
 *   - a USER sees only requests they created,
 *   - a TECHNICIAN sees only requests assigned to them,
 *   - an ADMIN sees everything.
 */

import { ServiceRequest } from "../models/ServiceRequest.js";
import { connectDB } from "../config/db.js";
import { getMemoryRequests, addMemoryRequest } from "../utils/memoryStore.js";

let dbAvailable = false;
let dbCheckDone = false;

async function ensureBackend() {
  if (dbCheckDone) return dbAvailable;
  try {
    dbAvailable = await connectDB();
  } catch {
    dbAvailable = false;
  } finally {
    dbCheckDone = true;
  }
  return dbAvailable;
}

function normalizeDoc(doc) {
  return doc && doc.toObject ? doc.toObject() : doc;
}

function toClientRequest(r) {
  return {
    id: r.requestId,
    requestId: r.requestId,
    userId: r.userId,
    userEmail: r.userEmail || "",
    title: r.title,
    category: r.category || "",
    description: r.description || "",
    phone: r.phone || "",
    status: r.status,
    technicianId: r.technicianId || "",
    technicianEmail: r.technicianEmail || "",
    createdAt: r.createdAt,
  };
}

export async function createServiceRequest({ userId, userEmail, title, category = "", description = "", phone = "" }) {
  const requestId = `PS-${Date.now().toString(36).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
  const entry = {
    requestId,
    userId,
    userEmail,
    title,
    category,
    description,
    phone,
    status: "NEW",
    technicianEmail: "",
    createdAt: new Date().toISOString(),
  };

  if (!(await ensureBackend())) {
    addMemoryRequest(entry);
    return { created: true, request: toClientRequest(entry) };
  }

  try {
    const doc = await ServiceRequest.create(entry);
    return { created: true, request: toClientRequest(normalizeDoc(doc)) };
  } catch (e) {
    dbAvailable = false;
    addMemoryRequest(entry);
    return { created: true, request: toClientRequest(entry) };
  }
}

/** Requests a USER is allowed to see (their own). */
export async function getRequestsForUser({ userId, userEmail }) {
  if (!(await ensureBackend())) {
    return getMemoryRequests().filter((r) => r.userId === userId || r.userEmail === userEmail).map(toClientRequest);
  }
  try {
    const docs = await ServiceRequest.find({
      $or: [{ userId }, { userEmail }],
    })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return docs.map(toClientRequest);
  } catch (e) {
    dbAvailable = false;
    return getMemoryRequests().filter((r) => r.userId === userId || r.userEmail === userEmail).map(toClientRequest);
  }
}

/** Requests a TECHNICIAN is allowed to see (assigned to them). */
export async function getRequestsForTechnician({ technicianId, technicianEmail }) {
  if (!(await ensureBackend())) {
    return getMemoryRequests()
      .filter((r) => r.technicianEmail === technicianEmail || r.technicianId === technicianId)
      .map(toClientRequest);
  }
  try {
    const docs = await ServiceRequest.find({
      $or: [{ technicianId }, { technicianEmail }],
    })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return docs.map(toClientRequest);
  } catch (e) {
    dbAvailable = false;
    return getMemoryRequests().filter((r) => r.technicianEmail === technicianEmail || r.technicianId === technicianId).map(toClientRequest);
  }
}

/** Every request — ADMIN only (guard is applied in the route handler). */
export async function getAllRequests() {
  if (!(await ensureBackend())) {
    return getMemoryRequests().map(toClientRequest);
  }
  try {
    const docs = await ServiceRequest.find().sort({ createdAt: -1 }).limit(500).lean();
    return docs.map(toClientRequest);
  } catch (e) {
    dbAvailable = false;
    return getMemoryRequests().map(toClientRequest);
  }
}

/** Assign or update the status of a request. Returns null when not found. */
export async function updateServiceRequest({ requestId, fields }) {
  if (!(await ensureBackend())) {
    const mem = getMemoryRequests();
    const idx = mem.findIndex((r) => r.requestId === requestId);
    if (idx === -1) return null;
    mem[idx] = { ...mem[idx], ...fields, updatedAt: new Date().toISOString() };
    return toClientRequest(mem[idx]);
  }
  try {
    const updated = await ServiceRequest.findOneAndUpdate(
      { requestId },
      { $set: fields },
      { new: true, runValidators: true }
    ).lean();
    return updated ? toClientRequest(updated) : null;
  } catch (e) {
    dbAvailable = false;
    const mem = getMemoryRequests();
    const idx = mem.findIndex((r) => r.requestId === requestId);
    if (idx === -1) return null;
    mem[idx] = { ...mem[idx], ...fields, updatedAt: new Date().toISOString() };
    return toClientRequest(mem[idx]);
  }
}