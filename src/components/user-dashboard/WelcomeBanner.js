import { motion } from "motion/react";
import { Search, CalendarPlus, Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function WelcomeBanner({ userName, onBookNow, onSearch }) {
  const { user } = useAuth();
  const nameToDisplay = userName || user?.name || "Customer User";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-[28px] bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-10 shadow-2xl overflow-hidden"
    >
      {/* Ambient Animated Orbs */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 rounded-full bg-teal-300/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-emerald-100 text-xs font-bold shadow-sm">
            <Sparkles size={14} className="text-amber-300" />
            <span>Phidim Service Guarantee • 100% Certified Local Technicians</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Welcome back, <span className="text-emerald-200">{nameToDisplay}</span> 👋
          </h2>

          <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed max-w-xl">
            What service do you need today? Hire top-rated electricians, DTH technicians, CCTV installers, and computer repair experts in Panchthar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onBookNow}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm shadow-xl hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all"
            >
              <CalendarPlus size={18} className="text-emerald-600" />
              <span>Book Service Now</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onSearch}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              <Search size={18} />
              <span>Quick Service Search</span>
            </button>
          </div>
        </div>

        {/* Floating Interactive Badge Showcase */}
        <div className="hidden sm:flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">30 Min Dispatch</p>
              <p className="text-[11px] text-emerald-200">Rapid emergency tech team</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-teal-400 text-slate-900 flex items-center justify-center font-black">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">4.92 ⭐ Rated</p>
              <p className="text-[11px] text-emerald-200">Trusted across 5 Wards</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
