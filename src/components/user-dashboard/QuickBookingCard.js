"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function QuickBookingCard({ onConfirmBooking }) {
  const [category, setCategory] = useState("DishHome & TV Repair");
  const [date, setDate] = useState("2026-08-05");
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 12:00 PM");
  const [location, setLocation] = useState("Phidim Ward 1 (Bazaar)");
  const [technician, setTechnician] = useState("Any Available Technician");
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBooking({
      category,
      date,
      timeSlot,
      location,
      technician,
      isEmergency,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="text-amber-500" size={20} />
              Quick 1-Click Service Booking
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-extrabold border border-amber-500/30">
              Instant Dispatch
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your service details for instant dispatch in Panchthar
          </p>
        </div>

        {/* Emergency Toggle Pill */}
        <button
          type="button"
          onClick={() => setIsEmergency(!isEmergency)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-extrabold transition-all ${
            isEmergency
              ? "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/30"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
          }`}
        >
          <Zap size={14} className={isEmergency ? "fill-white animate-pulse" : "text-amber-500"} />
          <span>{isEmergency ? "Emergency Active (30m)" : "Enable Emergency Mode"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Category */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Service Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option>DishHome & TV Repair</option>
            <option>4K CCTV Setup</option>
            <option>AC Repair & Servicing</option>
            <option>Electrical Rewiring</option>
            <option>Plumbing Service</option>
            <option>Computer Repair</option>
            <option>High-Speed Fiber Setup</option>
          </select>
        </div>

        {/* 2. Date */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <Calendar size={12} className="text-emerald-500" /> Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* 3. Time Slot */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <Clock size={12} className="text-blue-500" /> Preferred Slot
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option>08:00 AM - 10:00 AM</option>
            <option>10:00 AM - 12:00 PM</option>
            <option>01:00 PM - 03:00 PM</option>
            <option>03:00 PM - 05:00 PM</option>
            <option>05:00 PM - 07:00 PM</option>
          </select>
        </div>

        {/* 4. Location */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <MapPin size={12} className="text-rose-500" /> Panchthar Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option>Phidim Ward 1 (Bazaar)</option>
            <option>Phidim Ward 2</option>
            <option>Phidim Ward 3</option>
            <option>Yashok / Kummayak</option>
            <option>Ranitar / Fidim 4</option>
            <option>Tharpu / Yangnam</option>
          </select>
        </div>

        {/* 5. Preferred Technician */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <UserCheck size={12} className="text-purple-500" /> Technician
          </label>
          <select
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option>Any Available Technician</option>
            <option>Niraj Sunuwar (CCTV Specialist)</option>
            <option>Subash Tamang (Master Electrician)</option>
            <option>Prem Rai (DishHome Expert)</option>
            <option>Komal Bhattarai (Computer Tech)</option>
          </select>
        </div>

        {/* 6. Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm Booking</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
