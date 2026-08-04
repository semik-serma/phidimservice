"use client";

import { motion } from "motion/react";
import {
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Gauge,
  Share2,
  AlertTriangle,
} from "lucide-react";

export function LiveTechnicianTracker({ booking }) {
  const tech = booking?.technician || {
    name: "Niraj Sunuwar",
    rating: 4.95,
    phone: "+977 9862772457",
    avatar: "NS",
    specialty: "CCTV & Network Tech",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-6 overflow-hidden space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Navigation className="text-amber-500 animate-spin-slow" size={22} />
              Live Technician GPS Tracker
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-extrabold border border-amber-500/30">
              On The Way
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Realtime dispatch tracking in Phidim Bazaar, Panchthar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Share2 size={14} />
            <span>Share GPS</span>
          </button>
        </div>
      </div>

      {/* Simulated Interactive Map Display */}
      <div className="relative w-full h-[280px] rounded-2xl bg-slate-900 overflow-hidden border border-emerald-500/30 flex items-center justify-center">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Route Line Path */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/60 stroke-dasharray-4" strokeWidth="3" fill="none">
          <path d="M 60,220 C 180,180 240,120 420,80" strokeDasharray="6 6" className="animate-pulse" />
        </svg>

        {/* Destination Pin (User House) */}
        <div className="absolute top-16 right-20 flex flex-col items-center">
          <div className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-black shadow-lg mb-1">
            Your Location (Ward 1)
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center animate-ping">
            <MapPin size={16} className="text-emerald-400" />
          </div>
        </div>

        {/* Moving Technician Vehicle Marker */}
        <div className="absolute bottom-16 left-20 flex flex-col items-center animate-bounce">
          <div className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-900 text-[10px] font-extrabold shadow-lg mb-1">
            {tech.name} (Honda Ba 84 Pa)
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-900 flex items-center justify-center shadow-xl border-2 border-white">
            <Navigation size={20} className="stroke-[3]" />
          </div>
        </div>

        {/* Floating ETA Card on Map */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-4 text-white">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">ESTIMATED ARRIVAL</span>
            <span className="text-lg font-black text-amber-400 font-mono">8 Mins</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">DISTANCE</span>
            <span className="text-sm font-extrabold text-white font-mono">1.2 km away</span>
          </div>
        </div>
      </div>

      {/* Technician Details & Quick Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-sm flex items-center justify-center shadow">
            {tech.avatar}
          </div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-sm">{tech.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{tech.specialty}</p>
            <span className="text-[10px] font-bold text-amber-500">⭐ {tech.rating} Rating (148 Jobs)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-around text-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">SPEED</span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono flex items-center gap-1">
              <Gauge size={14} className="text-blue-500" /> 25 km/h
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">VEHICLE</span>
            <span className="text-xs font-extrabold text-slate-900 dark:text-white">Honda Shine</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
          <button className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all">
            <Phone size={16} />
            <span>Call Technician</span>
          </button>

          <button className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-100 transition-colors">
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
