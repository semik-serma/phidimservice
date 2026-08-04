"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  LayoutDashboard,
  CalendarPlus,
  BookOpen,
  Navigation,
  CreditCard,
  MessageSquare,
  Star,
  Settings,
  ArrowRight,
  Wrench,
} from "lucide-react";

export function UserCommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const SEARCH_ITEMS = [
    { type: "View", name: "User Dashboard Overview", tab: "dashboard", icon: LayoutDashboard },
    { type: "View", name: "Book a Service", tab: "book", icon: CalendarPlus },
    { type: "View", name: "My Active Bookings (3)", tab: "my-bookings", icon: BookOpen },
    { type: "View", name: "Live GPS Technician Tracker", tab: "track", icon: Navigation },
    { type: "View", name: "Payments & Phidim Wallet", tab: "payments", icon: CreditCard },
    { type: "View", name: "Messages & Live Chat", tab: "messages", icon: MessageSquare },
    { type: "View", name: "Coupons & Special Discounts", tab: "offers", icon: Star },
    { type: "Service", name: "DishHome & TV Alignment", tab: "book", icon: Wrench },
    { type: "Service", name: "4K CCTV Camera Setup", tab: "book", icon: Wrench },
    { type: "Service", name: "AC Repair & Servicing", tab: "book", icon: Wrench },
    { type: "Service", name: "House Electrical Rewiring", tab: "book", icon: Wrench },
  ];

  const filtered = SEARCH_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative flex items-center border-b border-slate-100 dark:border-slate-800 px-4 py-3.5">
          <Search size={20} className="text-emerald-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, bookings, or pages... (e.g. CCTV, AC, Electrician)"
            className="w-full bg-transparent text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    onSelectTab(item.tab);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ItemIcon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <span className="text-[10px] text-slate-400">{item.type}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching results found for "{query}"
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <strong>ESC</strong> to exit</span>
          <span>Phidim Customer Search</span>
        </div>
      </motion.div>
    </div>
  );
}
