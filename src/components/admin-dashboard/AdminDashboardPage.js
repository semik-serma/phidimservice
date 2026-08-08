"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "../dashboard/Sidebar";
import { TopNavbar } from "../dashboard/TopNavbar";
import { StatCards } from "../dashboard/StatCards";
import { AnalyticsCharts } from "../dashboard/AnalyticsCharts";
import { MiddleRow } from "../dashboard/MiddleRow";
import { UsersAndActions } from "../dashboard/UsersAndActions";
import { ThirdRowAnalytics } from "../dashboard/ThirdRowAnalytics";
import { BottomSection } from "../dashboard/BottomSection";
import { RightSideWidgets } from "../dashboard/RightSideWidgets";
import { CommandPalette } from "../dashboard/CommandPalette";
import { QuickActionModals } from "../dashboard/QuickActionModals";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "../RoleGuard";
import { LogoutConfirmModal } from "../LogoutConfirmModal";

/**
 * Admin dashboard UI. This component renders inside a server guard
 * (src/app/dashboard/admin/page.js) that enforces ADMIN-only access;
 * RoleGuard here is only a client-side UX nicety.
 *
 * `initialTab` lets dedicated admin pages (/admin/users, /admin/settings,
 * /admin/analytics ...) open the dashboard scrolled to a section.
 */
export default function AdminDashboardPage({ initialTab = "dashboard" }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'add-service' | 'add-tech' | 'create-coupon' | 'send-notif'
  const [toastMessage, setToastMessage] = useState(null);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateReport = () => {
    showToast("Generating comprehensive monthly Phidim Service PDF Report...");
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <RoleGuard roles={["ADMIN"]}>
      <div className={`min-h-screen bg-slate-50/70 dark:bg-[#070f0d] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300`}>
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 dark:bg-emerald-950 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={() => setIsLogoutOpen(true)}
      />

      {/* Main Layout Container */}
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          collapsed ? "lg:pl-[84px]" : "lg:pl-[280px]"
        }`}
      >
        {/* Top Navbar */}
        <TopNavbar
          activeTab={activeTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
        />

        {/* Dashboard Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1700px] mx-auto w-full">
          {/* Top Section: 6 Stat Cards */}
          <section>
            <StatCards />
          </section>

          {/* Main Grid: LEFT (70%) and RIGHT (30%) Split */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (70% = 8 cols on xl) */}
            <div className="xl:col-span-8 space-y-8">
              {/* Booking & Revenue Area/Bar Analytics Chart */}
              <AnalyticsCharts />

              {/* Service Performance, Recent Bookings, Top Technicians */}
              <MiddleRow />
            </div>

            {/* RIGHT COLUMN (30% = 4 cols on xl) */}
            <div className="xl:col-span-4">
              <RightSideWidgets />
            </div>
          </section>

          {/* Second Row: Recent Users Table & Quick Actions */}
          <section>
            <UsersAndActions
              onAddService={() => setActiveModal("add-service")}
              onAddTechnician={() => setActiveModal("add-tech")}
              onCreateCoupon={() => setActiveModal("create-coupon")}
              onSendNotification={() => setActiveModal("send-notif")}
              onGenerateReport={handleGenerateReport}
            />
          </section>

          {/* Third Row: Analytics Breakdown (Revenue Pie, Status Ratio, Weekly Earnings, CSAT) */}
          <section>
            <ThirdRowAnalytics />
          </section>

          {/* Bottom Section: Reviews, Timeline, Terminal System Logs, Notifications Feed */}
          <section>
            <BottomSection />
          </section>
        </main>

        {/* Footer info */}
        <footer className="px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
          <p>© 2026 Phidim Service. Premium SaaS Admin Interface built for Panchthar Technical Marketplace.</p>
        </footer>
      </div>

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTab={setActiveTab}
      />

      {/* Quick Action Modals */}
      <QuickActionModals
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        open={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />
      </div>
    </RoleGuard>
  );
}