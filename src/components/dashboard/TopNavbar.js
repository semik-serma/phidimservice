"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  Globe,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Clock as ClockIcon,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export function TopNavbar({
  activeTab,
  collapsed,
  setCollapsed,
  setMobileOpen,
  darkMode,
  setDarkMode,
  onOpenCommandPalette,
}) {
  // Live Clock
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [lang, setLang] = useState("EN");

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const notificationsList = [
    {
      id: 1,
      title: "New Booking Request",
      desc: "Ram Shrestha requested DishHome realignment in Ward 1",
      time: "2 mins ago",
      type: "booking",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      id: 2,
      title: "Technician Checked In",
      desc: "Niraj Sunuwar arrived at CCTV installation site",
      time: "15 mins ago",
      type: "tech",
      icon: ShieldCheck,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/50",
    },
    {
      id: 3,
      title: "System Alert",
      desc: "High volume of electrical requests in Phidim Bazaar",
      time: "1 hour ago",
      type: "warning",
      icon: AlertTriangle,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50",
    },
  ];

  const messagesList = [
    {
      id: 1,
      name: "Saraswati Subedi",
      msg: "When will the CCTV technician reach Ward 2?",
      time: "5m ago",
      unread: true,
      avatar: "SS",
    },
    {
      id: 2,
      name: "Bikash Thapa",
      msg: "Thank you for fixing our electrical wiring today!",
      time: "42m ago",
      unread: true,
      avatar: "BT",
    },
  ];

  const getPageTitle = (tab) => {
    switch (tab) {
      case "dashboard": return "Marketplace Dashboard";
      case "users": return "User Management";
      case "technicians": return "Technician Roster";
      case "services": return "Service Offerings";
      case "bookings": return "Live Bookings";
      case "payments": return "Payment Transactions";
      case "reviews": return "Customer Ratings & Reviews";
      case "analytics": return "Performance Analytics";
      case "categories": return "Service Categories";
      case "coupons": return "Promotions & Coupons";
      case "messages": return "Customer Messages";
      case "notifications": return "Notification Hub";
      case "settings": return "Platform Settings";
      default: return "Phidim Admin";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[76px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left Side: Mobile Hamburger & Dynamic Page Title + Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
              <span>Admin</span>
              <ChevronRight size={12} />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Phidim Service</span>
              <ChevronRight size={12} />
              <span className="capitalize">{activeTab}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mt-0.5">
              {getPageTitle(activeTab)}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar with Ctrl+K trigger */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div
            onClick={onOpenCommandPalette}
            className="relative w-full cursor-pointer group"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search services, bookings, technicians... (Ctrl + K)"
              className="w-full h-11 pl-11 pr-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 cursor-pointer focus:outline-none group-hover:border-emerald-500/50 transition-all shadow-inner"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 border border-emerald-500/30 rounded-lg">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right Side: Live Clock, Language, Dark Mode, Notifications, Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Clock & Date Widget */}
          <div className="hidden xl:flex flex-col items-end px-3 py-1.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-right">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300">
              <ClockIcon size={13} className="text-emerald-500 animate-spin-slow" />
              <span>{time || "17:47:22"}</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {dateStr || "Aug 4, 2026"}
            </span>
          </div>

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === "EN" ? "NP" : "EN")}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500/50 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all"
            title="Toggle Language (English / Nepali)"
          >
            <Globe size={15} className="text-emerald-500" />
            <span>{lang}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-emerald-600" />
            )}
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell size={16} className="text-emerald-500" /> Notifications
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      3 New
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 my-2 max-h-72 overflow-y-auto">
                    {notificationsList.map((n) => (
                      <div key={n.id} className="py-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-2xl transition-colors">
                        <div className={`p-2 rounded-xl flex-shrink-0 ${n.color}`}>
                          <n.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {n.desc}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2.5 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors">
                    View All Notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all"
              aria-label="Messages"
            >
              <MessageSquare size={18} />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-blue-600 text-white text-[10px] font-black rounded-full ring-2 ring-white dark:ring-slate-900">
                2
              </span>
            </button>

            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquare size={16} className="text-blue-500" /> Live Chat Messages
                    </h4>
                    <span className="text-xs text-blue-500 font-bold">2 Unread</span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 my-2">
                    {messagesList.map((m) => (
                      <div key={m.id} className="py-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-2xl transition-colors cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow">
                          {m.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</p>
                            <span className="text-[10px] text-slate-400">{m.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{m.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Avatar Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowMessages(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500/50 transition-all"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                  PS
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <span className="hidden sm:inline text-xs font-extrabold text-slate-800 dark:text-slate-100">
                Phidim Admin
              </span>
              <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50"
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">Phidim Service Manager</p>
                    <p className="text-[11px] text-slate-400 truncate">admin@phidim.com.np</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <User size={15} className="text-emerald-500" /> Profile Settings
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <Settings size={15} className="text-blue-500" /> System Preferences
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
