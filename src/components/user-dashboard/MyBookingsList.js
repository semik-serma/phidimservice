"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Navigation,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  XCircle,
  Clock,
  CheckCircle2,
  UserCheck,
  Star,
  MapPin,
  MoreVertical,
  Tv,
  Camera,
  Zap,
  Monitor,
} from "lucide-react";

export const USER_STATUS_CLASSES = {
  Pending: {
    badge: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
    icon: Clock,
  },
  Accepted: {
    badge: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800",
    dot: "bg-blue-500",
    icon: CheckCircle2,
  },
  "Technician Assigned": {
    badge: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
    icon: UserCheck,
  },
  "On The Way": {
    badge: "bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800",
    dot: "bg-orange-500 animate-pulse",
    icon: Navigation,
  },
  "In Progress": {
    badge: "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800",
    dot: "bg-cyan-500 animate-pulse",
    icon: Clock,
  },
  Completed: {
    badge: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  Cancelled: {
    badge: "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const USER_BOOKINGS = [
  {
    id: "#PS-9482",
    serviceName: "4K CCTV Setup (4-Camera Kit)",
    icon: Camera,
    technician: {
      name: "Niraj Sunuwar",
      rating: 4.95,
      phone: "+977 9862772457",
      avatar: "NS",
      specialty: "CCTV & Network Tech",
    },
    status: "On The Way",
    date: "Today, Aug 04, 2026",
    time: "10:30 AM",
    address: "Phidim Ward 1 (Near Main Plaza)",
    amount: "NPR 18,900",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "#PS-9481",
    serviceName: "DishHome Antenna Realignment",
    icon: Tv,
    technician: {
      name: "Prem Rai",
      rating: 4.88,
      phone: "+977 9812345678",
      avatar: "PR",
      specialty: "DTH Satellite Expert",
    },
    status: "Technician Assigned",
    date: "Today, Aug 04, 2026",
    time: "02:00 PM",
    address: "Phidim Ward 1",
    amount: "NPR 1,500",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "#PS-9480",
    serviceName: "House Electrical Rewiring Check",
    icon: Zap,
    technician: {
      name: "Subash Tamang",
      rating: 4.98,
      phone: "+977 9801122334",
      avatar: "ST",
      specialty: "Master Electrician",
    },
    status: "Completed",
    date: "Aug 02, 2026",
    time: "11:00 AM",
    address: "Phidim Ward 1",
    amount: "NPR 4,200",
    color: "from-amber-500 to-orange-600",
  },
];

export function MyBookingsList({ onTrackLive, onChat, onCall, onInvoice }) {
  const [filter, setFilter] = useState("All");

  const filtered = USER_BOOKINGS.filter((b) => {
    if (filter === "Active") return b.status !== "Completed" && b.status !== "Cancelled";
    if (filter === "Completed") return b.status === "Completed";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            My Active & Past Bookings
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track technician dispatch status, chat, or download official invoices
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl self-start border border-slate-200/60 dark:border-slate-700/60">
          {["All", "Active", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-5">
        {filtered.map((b) => {
          const statusCfg = USER_STATUS_CLASSES[b.status] || USER_STATUS_CLASSES.Pending;
          const ServiceIcon = b.icon;

          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/40 transition-all p-5 sm:p-6 space-y-4"
            >
              {/* Header: Service Name + Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                    <ServiceIcon size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                        {b.serviceName}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono font-bold">{b.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-emerald-500" /> {b.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border ${statusCfg.badge}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                    {b.status}
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                    {b.amount}
                  </span>
                </div>
              </div>

              {/* Technician Info + Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-xs">
                {/* Tech Details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold flex items-center justify-center shadow-sm text-xs">
                    {b.technician.avatar}
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">
                      {b.technician.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{b.technician.specialty}</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star size={11} className="fill-amber-400 stroke-amber-500" />
                        {b.technician.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-start md:justify-end gap-4 text-slate-600 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-emerald-500" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-blue-500" />
                    <span>{b.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {b.status === "On The Way" && (
                    <button
                      onClick={() => onTrackLive(b)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-black shadow-md shadow-amber-500/20 transition-all"
                    >
                      <Navigation size={14} className="animate-spin-slow" />
                      <span>Track Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => onChat(b)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors border border-blue-500/20"
                  >
                    <MessageSquare size={14} />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => onCall(b)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors border border-emerald-500/20"
                  >
                    <Phone size={14} />
                    <span>Call Tech</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInvoice(b)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <FileText size={14} className="text-emerald-500" />
                    <span>Invoice PDF</span>
                  </button>

                  {b.status !== "Completed" && b.status !== "Cancelled" && (
                    <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors">
                      <XCircle size={14} />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
