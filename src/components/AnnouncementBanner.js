"use client";

import { useState, useEffect } from "react";
import { X, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Global in-memory store (no backend needed — mirrors the admin panel writes)
let _announcements = [
  {
    id: "ann-1",
    text: "🎉 Special Offer — 30% off on all AC servicing this month! Book now.",
    color: "emerald",
    active: true,
    link: "",
  },
  {
    id: "ann-2",
    text: "📡 DishHome Ultra HD packages now available. Free installation in Phidim.",
    color: "blue",
    active: true,
    link: "",
  },
];

let _listeners = [];

export function getAnnouncements() {
  return _announcements;
}

export function setAnnouncements(list) {
  _announcements = list;
  _listeners.forEach((fn) => fn([..._announcements]));
}

export function subscribeAnnouncements(fn) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter((l) => l !== fn); };
}

const COLORS = {
  emerald: {
    bar: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700",
    dot: "bg-emerald-300",
    close: "hover:bg-emerald-800/60 text-emerald-100",
  },
  blue: {
    bar: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700",
    dot: "bg-blue-300",
    close: "hover:bg-blue-800/60 text-blue-100",
  },
  amber: {
    bar: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600",
    dot: "bg-amber-200",
    close: "hover:bg-amber-700/60 text-amber-100",
  },
  rose: {
    bar: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700",
    dot: "bg-rose-300",
    close: "hover:bg-rose-800/60 text-rose-100",
  },
  purple: {
    bar: "bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700",
    dot: "bg-purple-300",
    close: "hover:bg-purple-800/60 text-purple-100",
  },
};

export function AnnouncementBanner() {
  const [announcements, setLocal] = useState(() =>
    getAnnouncements().filter((a) => a.active)
  );
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = subscribeAnnouncements((list) => {
      setLocal(list.filter((a) => a.active));
      setCurrent(0);
      setDismissed(false);
    });
    return unsub;
  }, []);

  // Auto-rotate every 5 s
  useEffect(() => {
    if (announcements.length <= 1) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, [announcements.length]);

  const active = announcements[current];
  if (!active || dismissed) return null;

  const palette = COLORS[active.color] || COLORS.emerald;

  return (
    <AnimatePresence>
      <motion.div
        key={active.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative w-full ${palette.bar} text-white text-xs font-semibold overflow-hidden z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Left: icon + text */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Megaphone size={14} className="shrink-0 opacity-90" />
            <span className="truncate leading-snug">
              {active.text}
              {active.link && (
                <a href={active.link} target="_blank" rel="noopener noreferrer"
                  className="ml-2 underline underline-offset-2 opacity-90 hover:opacity-100">
                  Learn more →
                </a>
              )}
            </span>
          </div>

          {/* Center: dots (if multiple) */}
          {announcements.length > 1 && (
            <div className="flex items-center gap-2.5 shrink-0">
              <button onClick={() => setCurrent((p) => (p - 1 + announcements.length) % announcements.length)}
                className="p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <div className="flex items-center gap-1">
                {announcements.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === current ? `${palette.dot} scale-125` : "bg-white/40"}`} />
                ))}
              </div>
              <button onClick={() => setCurrent((p) => (p + 1) % announcements.length)}
                className="p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Right: dismiss */}
          <button onClick={() => setDismissed(true)}
            className={`shrink-0 p-1 rounded-lg transition-colors cursor-pointer ${palette.close}`}
            title="Dismiss announcement">
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
