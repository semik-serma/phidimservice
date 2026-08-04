"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserSidebar } from "../../components/user-dashboard/UserSidebar";
import { UserTopNavbar } from "../../components/user-dashboard/UserTopNavbar";
import { WelcomeBanner } from "../../components/user-dashboard/WelcomeBanner";
import { QuickBookingCard } from "../../components/user-dashboard/QuickBookingCard";
import { PopularServicesGrid } from "../../components/user-dashboard/PopularServicesGrid";
import { MyBookingsList } from "../../components/user-dashboard/MyBookingsList";
import { LiveTechnicianTracker } from "../../components/user-dashboard/LiveTechnicianTracker";
import { PaymentsAndWallet } from "../../components/user-dashboard/PaymentsAndWallet";
import { OffersAndAIRecommend } from "../../components/user-dashboard/OffersAndAIRecommend";
import { UserProfileAndTimeline } from "../../components/user-dashboard/UserProfileAndTimeline";
import { HelpCenterWidget } from "../../components/user-dashboard/HelpCenterWidget";
import { MobileBottomNav } from "../../components/user-dashboard/MobileBottomNav";
import { UserCommandPalette } from "../../components/user-dashboard/UserCommandPalette";
import { CheckCircle2 } from "lucide-react";

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync dark mode
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

  const handleConfirmBooking = (details) => {
    showToast(`Booking Confirmed for ${details.category} on ${details.date}!`);
    setActiveTab("my-bookings");
  };

  const handleSelectService = (service) => {
    showToast(`Selected "${service.name}". Opening booking flow...`);
    setActiveTab("book");
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#070f0d] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 pb-20 lg:pb-8">
      {/* Toast Notification */}
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

      {/* User Sidebar */}
      <UserSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Layout Content */}
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          collapsed ? "lg:pl-[84px]" : "lg:pl-[280px]"
        }`}
      >
        {/* Top Navbar */}
        <UserTopNavbar
          activeTab={activeTab}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1700px] mx-auto w-full">
          {/* Welcome Banner */}
          <WelcomeBanner
            userName="Ram Shrestha"
            onBookNow={() => setActiveTab("book")}
            onSearch={() => setIsSearchOpen(true)}
          />

          {/* Quick 1-Click Booking Form */}
          <section id="quick-booking">
            <QuickBookingCard onConfirmBooking={handleConfirmBooking} />
          </section>

          {/* Live Technician Tracking (Uber / Urban Company style) */}
          <section id="live-tracking">
            <LiveTechnicianTracker />
          </section>

          {/* Popular 16 Service Categories */}
          <section id="services-grid">
            <PopularServicesGrid onSelectService={handleSelectService} />
          </section>

          {/* My Active & Past Bookings */}
          <section id="my-bookings">
            <MyBookingsList
              onTrackLive={() => setActiveTab("track")}
              onChat={(b) => showToast(`Opening chat with technician ${b.technician.name}...`)}
              onCall={(b) => showToast(`Calling ${b.technician.name} at ${b.technician.phone}...`)}
              onInvoice={(b) => showToast(`Downloading PDF Invoice for ${b.id}...`)}
            />
          </section>

          {/* Payments & Phidim Wallet */}
          <section id="payments">
            <PaymentsAndWallet />
          </section>

          {/* Coupons & AI Recommendations */}
          <section id="offers">
            <OffersAndAIRecommend
              onClaimCoupon={(code) => showToast(`Coupon code ${code} claimed!`)}
              onBookRecommended={(rec) => showToast(`Added ${rec.title} to your bookings!`)}
            />
          </section>

          {/* Profile Card & Activity Stream */}
          <section id="profile">
            <UserProfileAndTimeline />
          </section>

          {/* Help & Support Center */}
          <section id="help">
            <HelpCenterWidget />
          </section>
        </main>

        {/* Footer */}
        <footer className="px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
          <p>© 2026 Phidim Service. Enterprise Customer Portal built for Panchthar Home Service Marketplace.</p>
        </footer>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Command Palette Search Modal */}
      <UserCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}
