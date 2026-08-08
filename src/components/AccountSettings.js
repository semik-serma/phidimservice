"use client";

import { useState, useEffect } from "react";
import { User, Image as ImageIcon, CheckCircle2, Save, Sparkles, UserCheck, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
];

export function AccountSettings({ onShowToast }) {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setDisplayName(user.displayName || user.name || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const userInitials = (name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (updateUser) {
      updateUser({
        name: name.trim(),
        displayName: displayName.trim() || name.trim(),
        avatar: avatar.trim(),
      });
    }

    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      if (onShowToast) {
        onShowToast("Account settings saved successfully!");
      }
      setTimeout(() => setIsSaved(false), 3000);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={14} className="text-emerald-200" />
            <span>Profile & Account Customization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Account Settings</h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            Customize your account full name, public display name, and avatar picture across all Phidim Service dashboards.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-[#091e17] rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Profile Picture Section */}
        <div className="space-y-4">
          <label className="block text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span>Profile Picture</span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-800/40">
            {/* Image Preview */}
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile Avatar Preview"
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/50 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md ring-4 ring-emerald-500/30">
                  {userInitials}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#091e17] flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Custom Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Avatar Presets */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">Or choose from avatar presets:</p>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(presetUrl)}
                      className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        avatar === presetUrl ? "border-emerald-500 scale-110 ring-2 ring-emerald-500/40" : "border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-emerald-900/30" />

        {/* Name Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Name */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <User size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Account Name (Full Name)</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ram Shrestha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <p className="text-[11px] text-slate-400 font-medium">Your primary full account name on record.</p>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck size={15} className="text-teal-600 dark:text-teal-400" />
              <span>Display Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ram (Phidim Customer)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <p className="text-[11px] text-slate-400 font-medium">The public display name shown on top navigation & headers.</p>
          </div>
        </div>

        {/* Submit & Save Status */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-emerald-900/30">
          {isSaved ? (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold animate-in fade-in">
              <CheckCircle2 size={16} />
              <span>Account settings saved successfully!</span>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">
              Changes update immediately across all 3 dashboards.
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all cursor-pointer hover:scale-105 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{isSaving ? "Saving..." : "Save Account Settings"}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
