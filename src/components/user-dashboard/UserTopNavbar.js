"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  Wallet,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function UserTopNavbar({
  activeTab,
  setMobileOpen,
  darkMode,
  setDarkMode,
  onOpenSearch,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getPageTitle = (tab) => {
    switch (tab) {
      case "dashboard": return "User Dashboard";
      case "book": return "Book a Service";
      case "my-bookings": return "My Active Bookings";
      case "track": return "Live Technician Tracking";
      case "payments": return "Payments & Wallet";
      case "messages": return "Messages & Chat";
      case "reviews": return "My Ratings & Reviews";
      case "offers": return "Coupons & Discounts";
      case "favorites": return "Favorite Services";
      case "history": return "Past Booking History";
      case "notifications": return "Notification Alerts";
      case "profile": return "My Customer Profile";
      case "settings": return "Account Settings";
      case "help": return "Help & Support Center";
      default: return "Phidim User Portal";
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
              <span>Customer</span>
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

        {/* Center: Global Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div
            onClick={onOpenSearch}
            className="relative w-full cursor-pointer group"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search services (e.g. AC Repair, CCTV, Electrician)..."
              className="w-full h-11 pl-11 pr-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 cursor-pointer focus:outline-none group-hover:border-emerald-500/50 transition-all shadow-inner"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 border border-emerald-500/30 rounded-lg">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Side: Wallet Balance, Theme Toggle, Notifications, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wallet Balance Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <Wallet size={16} className="text-emerald-500" />
            <span>NPR 4,500</span>
          </div>

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

          {/* Notifications Dropdown */}
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
                      4 New
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 my-2 max-h-72 overflow-y-auto">
                    <div className="py-2.5 flex items-start gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Technician Niraj Sunuwar is on the way!</p>
                        <p className="text-[11px] text-slate-500">Estimated arrival in 8 mins to Ward 1</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">5 mins ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowMessages(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500/50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                RS
              </div>
              <span className="hidden sm:inline text-xs font-extrabold text-slate-800 dark:text-slate-100">
                Ram Shrestha
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
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">Ram Shrestha</p>
                    <p className="text-[11px] text-slate-400 truncate">ram.phidim@gmail.com</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <User size={15} className="text-emerald-500" /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <Settings size={15} className="text-blue-500" /> Settings
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
