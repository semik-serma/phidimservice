"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  CalendarPlus,
  BookOpen,
  Navigation,
  CreditCard,
  MessageSquare,
  Star,
  Gift,
  Heart,
  History,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

export const USER_NAV_ITEMS = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, badge: null, path: "/user/dashboard" },
  { id: "book", name: "Book Service", icon: CalendarPlus, badge: "Quick", badgeColor: "bg-emerald-500 text-white", path: "/user/book-service" },
  { id: "my-bookings", name: "My Bookings", icon: BookOpen, badge: "3 Active", badgeColor: "bg-blue-500 text-white", path: "/user/requests" },
  { id: "track", name: "Track Technician", icon: Navigation, badge: "Live", badgeColor: "bg-amber-500 text-white animate-pulse" },
  { id: "payments", name: "Payments & Wallet", icon: CreditCard, badge: "NPR 4.5k" },
  { id: "messages", name: "Messages", icon: MessageSquare, badge: "2" },
  { id: "reviews", name: "My Reviews", icon: Star, badge: null },
  { id: "offers", name: "Offers & Coupons", icon: Gift, badge: "20% OFF", badgeColor: "bg-rose-500 text-white" },
  { id: "favorites", name: "Favorites", icon: Heart, badge: null },
  { id: "history", name: "Booking History", icon: History, badge: null, path: "/user/history" },
  { id: "notifications", name: "Notifications", icon: Bell, badge: "4", path: "/user/notifications" },
  { id: "profile", name: "My Profile", icon: User, badge: "Gold", path: "/user/profile" },
  { id: "settings", name: "Settings", icon: Settings, badge: null, path: "/user/settings" },
  { id: "help", name: "Help Center", icon: HelpCircle, badge: "24/7" },
  { id: "logout", name: "Logout", icon: LogOut, badge: null, isDanger: true },
];

export function UserSidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout }) {
  const router = useRouter();
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#061510] dark:bg-[#040d0a] text-slate-300 border-r border-emerald-900/30 transition-all duration-300 flex flex-col ${
          collapsed ? "w-[84px]" : "w-[280px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-emerald-900/30">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center shadow-[0_0_20px_rgba(22,163,74,0.4)] text-white font-black">
                <ShieldCheck size={24} className="text-white drop-shadow" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#061510] animate-pulse" />
            </div>

            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="leading-tight min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-white tracking-tight truncate">
                    Phidim<span className="text-emerald-400">Service</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                    USER
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400/70 font-medium truncate">
                  Customer Hub
                </p>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-400 hover:text-white transition-all shadow-sm"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {USER_NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout" && onLogout) {
                    onLogout();
                  } else {
                    setActiveTab(item.id);
                    if (item.path && window.location.pathname !== item.path) {
                      router.push(item.path);
                    }
                  }
                  if (mobileOpen) setMobileOpen(false);
                }}
                className={`group relative w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-[14px] font-medium transition-all duration-200 ${
                  item.isDanger
                    ? "text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                    : isActive
                    ? "bg-gradient-to-r from-emerald-500/25 via-emerald-500/15 to-transparent text-emerald-400 font-bold border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "text-slate-400 hover:text-slate-100 hover:bg-emerald-950/30"
                }`}
                title={collapsed ? item.name : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="userNavIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-400 rounded-r-full shadow-[0_0_12px_#22c55e]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <item.icon
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      : item.isDanger
                      ? "text-rose-400"
                      : "text-slate-400 group-hover:text-emerald-300"
                  }`}
                />

                {!collapsed && (
                  <span className="flex-1 text-left truncate tracking-wide">
                    {item.name}
                  </span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 ${
                      item.badgeColor || "bg-emerald-950/80 text-emerald-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer User Profile Card */}
        {!collapsed && (
          <div className="p-4 border-t border-emerald-900/30 bg-[#040d0a] space-y-3">
            <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Wallet Credit</span>
                <p className="text-sm font-black text-white font-mono">NPR 4,500</p>
              </div>
              <button className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md">
                + Top Up
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white text-xs font-black flex items-center justify-center shadow">
                RS
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Ram Shrestha</p>
                <p className="text-[11px] text-emerald-400/80 truncate">Phidim Ward 1</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
