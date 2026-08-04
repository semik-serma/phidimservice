"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  UserPlus,
  Wrench,
  Ticket,
  Bell,
  FileSpreadsheet,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from "lucide-react";

const INITIAL_USERS = [
  {
    id: 1,
    name: "Ram Shrestha",
    phone: "+977 9842012345",
    email: "ram.phidim@gmail.com",
    location: "Phidim Ward 1",
    status: "Active",
    avatar: "RS",
    joined: "Aug 02, 2026",
  },
  {
    id: 2,
    name: "Saraswati Subedi",
    phone: "+977 9812345678",
    email: "saraswati.s@yahoo.com",
    location: "Phidim Ward 2",
    status: "Active",
    avatar: "SS",
    joined: "Aug 01, 2026",
  },
  {
    id: 3,
    name: "Bikash Thapa",
    phone: "+977 9801122334",
    email: "bikash.thapa@outlook.com",
    location: "Phidim Ward 4",
    status: "New",
    avatar: "BT",
    joined: "Today",
  },
  {
    id: 4,
    name: "Anita Gurung",
    phone: "+977 9862334455",
    email: "anita.g@gmail.com",
    location: "Panchthar Hub",
    status: "Inactive",
    avatar: "AG",
    joined: "Jul 28, 2026",
  },
  {
    id: 5,
    name: "Deepak Khadka",
    phone: "+977 9851122443",
    email: "deepak.k@phidimnet.np",
    location: "Phidim Ward 3",
    status: "Active",
    avatar: "DK",
    joined: "Jul 25, 2026",
  },
];

export function UsersAndActions({
  onAddService,
  onAddTechnician,
  onCreateCoupon,
  onSendNotification,
  onGenerateReport,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filteredUsers = INITIAL_USERS.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportExcel = () => {
    alert("Exporting Users Data as Excel Spreadsheet (.xlsx)...");
  };

  const exportPDF = () => {
    alert("Generating & Exporting Users Report as PDF Document...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Users Table (2 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6"
      >
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Users className="text-emerald-500" size={20} />
              Recent Registered Users
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage customer accounts and location profiles in Panchthar
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <FileText size={14} className="text-rose-500" />
              <span>PDF</span>
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <FileSpreadsheet size={14} className="text-emerald-500" />
              <span>Excel</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name, email, ward..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={15} className="text-slate-400 hidden sm:inline" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="New">New</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 px-2">User</th>
                <th className="pb-3 px-2">Contact Info</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white">{u.name}</p>
                        <span className="text-[10px] text-slate-400">Joined {u.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="space-y-0.5">
                      <p className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                        <Mail size={11} className="text-slate-400" /> {u.email}
                      </p>
                      <p className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                        <Phone size={11} className="text-slate-400" /> {u.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <MapPin size={12} className="text-emerald-500" /> {u.location}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                        u.status === "Active"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                          : u.status === "New"
                          ? "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          u.status === "Active"
                            ? "bg-emerald-500"
                            : u.status === "New"
                            ? "bg-blue-500"
                            : "bg-slate-400"
                        }`}
                      />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span>Showing 1 to {filteredUsers.length} of 14,890 Users</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Card (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              Quick Actions
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-extrabold border border-amber-500/30">
              Admin Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Instant operations and administrative shortcuts
          </p>

          <div className="space-y-3">
            <button
              onClick={onAddService}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Wrench size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Add New Service</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Create DTH, CCTV, electrical service listing</p>
              </div>
            </button>

            <button
              onClick={onAddTechnician}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <UserPlus size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Add Technician</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Register & assign field staff to Ward</p>
              </div>
            </button>

            <button
              onClick={onCreateCoupon}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 hover:from-purple-500/20 hover:to-violet-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <Ticket size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Create Coupon Code</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Generate promo discounts for customers</p>
              </div>
            </button>

            <button
              onClick={onSendNotification}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Bell size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Send Notification</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Broadcast push alerts to all technicians</p>
              </div>
            </button>

            <button
              onClick={onGenerateReport}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                <Download size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Generate Full Report</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Download monthly financial & booking audit</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
