import mongoose from "mongoose";
import { SERVICE_REQUEST_STATUSES } from "@/lib/requests.js";

/**
 * Service request — demonstrates row-level ownership scoping on top of
 * the RBAC layer. A request always belongs to a user (creator) and is
 * optionally assigned to a technician.
 */
const serviceRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    technicianId: {
      type: String,
      default: "",
      index: true,
    },
    technicianEmail: {
      type: String,
      default: "",
      index: true,
    },
    status: {
      type: String,
      enum: ["NEW", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "NEW",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceRequestSchema.index({ userEmail: 1, status: 1 });
serviceRequestSchema.index({ technicianEmail: 1, status: 1 });

export const ServiceRequest =
  mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", serviceRequestSchema);