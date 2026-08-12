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
import { useAuth } from "@/context/AuthContext";

import { DirectChatSection } from "../../components/chat/DirectChatSection";
import { CreateArticleModal } from "../../components/articles/CreateArticleModal";
import { AccountSettings } from "../../components/AccountSettings";
import { FriendsManager } from "../../components/community/FriendsManager";
import { CommunityUserDirectory } from "../../components/community/CommunityUserDirectory";
import { useCall } from "@/components/calls/CallProvider";

export default function UserDashboardPage({ initialTab = "dashboard" }) {
  const { user, logout } = useAuth();
  const { startCall } = useCall();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Community Articles Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  const handleStartCall = (person, type = "video") => {
    startCall(person, type);
  };

  const handleCallTech = (tech, type = "voice") => {
    const person = {
      name: tech?.displayName || tech?.name || tech?.technician?.name || "Niraj Sunuwar",
      role: tech?.role || tech?.specialty || tech?.technician?.specialty || "Senior Field Technician",
      avatar: tech?.avatar || tech?.picture || tech?.technician?.avatar || "",
      phone: tech?.phone || tech?.technician?.phone || "+977 9862772457",
      email: tech?.email || "tech@phidim.np",
    };
    startCall(person, type);
  };

  const handleChatTech = (tech) => {
    setActiveChatPartner(tech);
    setActiveTab("messages");
    showToast(`Opening live chat with ${tech?.displayName || tech?.name || tech?.technician?.name || "Technician"}...`);
  };

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
    const bookingId = details?.id ? `#${details.id}` : "";
    showToast(`✅ Booking ${bookingId} confirmed for ${details.serviceName || details.category}! Technician dispatched.`);
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
        onLogout={logout}
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
          setActiveTab={setActiveTab}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1700px] mx-auto w-full">
          {activeTab === "account-settings" || activeTab === "settings" ? (
            <AccountSettings onShowToast={showToast} />
          ) : activeTab === "book" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h2 className="text-2xl font-black">Book On-Demand Doorstep Service</h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1">Select your service, choose preferred date & time, and get instant 30-minute technician dispatch.</p>
              </div>
              <QuickBookingCard onConfirmBooking={handleConfirmBooking} />
              <PopularServicesGrid onSelectService={handleSelectService} />
            </div>
          ) : activeTab === "my-bookings" || activeTab === "history" || activeTab === "requests" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h2 className="text-2xl font-black">My Active & Past Service Bookings</h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">Track ongoing technician assignments, view service history, download PDF invoices, and request calls.</p>
              </div>
              <MyBookingsList
                onTrackLive={() => setActiveTab("track")}
                onChat={(b) => handleChatTech(b.technician)}
                onCall={(b) => handleCallTech(b.technician, "voice")}
                onInvoice={(b) => showToast(`Downloading PDF Invoice for ${b.id}...`)}
              />
            </div>
          ) : activeTab === "track" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h2 className="text-2xl font-black">Live Technician GPS Tracker</h2>
                <p className="text-xs sm:text-sm text-amber-100 mt-1">Real-time live map tracking of your assigned Phidim technician moving towards your doorstep.</p>
              </div>
              <LiveTechnicianTracker onCall={(tech) => handleCallTech(tech, "voice")} onChat={handleChatTech} />
            </div>
          ) : activeTab === "payments" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h2 className="text-2xl font-black">Payments & Phidim Digital Wallet</h2>
                <p className="text-xs sm:text-sm text-teal-100 mt-1">Manage your wallet balance, Esewa/Khalti links, saved cards, and transaction history.</p>
              </div>
              <PaymentsAndWallet />
            </div>
          ) : activeTab === "offers" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-rose-600 to-pink-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <h2 className="text-2xl font-black">Offers, Coupons & AI Recommendations</h2>
                <p className="text-xs sm:text-sm text-rose-100 mt-1">Claim exclusive Panchthar service discount coupons and explore personalized maintenance tips.</p>
              </div>
              <OffersAndAIRecommend
                onClaimCoupon={(code) => showToast(`Coupon code ${code} claimed!`)}
                onBookRecommended={(rec) => showToast(`Added ${rec.title} to your bookings!`)}
              />
            </div>
          ) : activeTab === "profile" ? (
            <div className="space-y-8">
              <UserProfileAndTimeline />
            </div>
          ) : activeTab === "help" ? (
            <div className="space-y-8">
              <HelpCenterWidget />
            </div>
          ) : activeTab === "messages" ? (
            <div className="space-y-8">
              <DirectChatSection
                onOpenCreateArticleModal={() => setIsArticleModalOpen(true)}
                onStartCall={handleStartCall}
                activePartner={activeChatPartner}
              />
            </div>
          ) : activeTab === "friends" || activeTab === "articles" ? (
            <div className="space-y-8">
              <CommunityUserDirectory
                onStartChat={handleChatTech}
                onStartCall={handleCallTech}
                onShowToast={showToast}
              />
              <FriendsManager
                onStartChat={handleChatTech}
                onStartCall={handleStartCall}
                onShowToast={showToast}
              />
            </div>
          ) : activeTab === "reviews" ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">My Service Reviews & Ratings</h2>
              <p className="text-xs text-slate-500">Ratings and reviews you submitted for completed Phidim services.</p>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-extrabold flex items-center justify-between">
                <span>⭐ DishHome Fiber Splicing: 5.0 ★ — "Very fast service in Ward 4!"</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Verified</span>
              </div>
            </div>
          ) : activeTab === "notifications" ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Notifications Center</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>✅ Booking #PS-9842 confirmed. Technician Rajesh Tamang dispatched.</span>
                  <span className="text-[10px] text-slate-400">5 mins ago</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>🎉 You received 200 Reward Points for your completed AC service.</span>
                  <span className="text-[10px] text-slate-400">2 hours ago</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Default Overview Dashboard */}
              <WelcomeBanner
                userName={user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "")}
                onBookNow={() => setActiveTab("book")}
                onSearch={() => setIsSearchOpen(true)}
              />

              <section id="user-directory">
                <CommunityUserDirectory
                  onStartChat={handleChatTech}
                  onStartCall={handleCallTech}
                  onShowToast={showToast}
                />
              </section>

              <section id="quick-booking">
                <QuickBookingCard onConfirmBooking={handleConfirmBooking} />
              </section>

              <section id="live-tracking">
                <LiveTechnicianTracker onCall={(tech) => handleCallTech(tech, "voice")} onChat={handleChatTech} />
              </section>

              <section id="services-grid">
                <PopularServicesGrid onSelectService={handleSelectService} />
              </section>

              <section id="my-bookings">
                <MyBookingsList
                  onTrackLive={() => setActiveTab("track")}
                  onChat={(b) => handleChatTech(b.technician)}
                  onCall={(b) => handleCallTech(b.technician, "voice")}
                  onInvoice={(b) => showToast(`Downloading PDF Invoice for ${b.id}...`)}
                />
              </section>

              <section id="payments">
                <PaymentsAndWallet />
              </section>

              <section id="offers">
                <OffersAndAIRecommend
                  onClaimCoupon={(code) => showToast(`Coupon code ${code} claimed!`)}
                  onBookRecommended={(rec) => showToast(`Added ${rec.title} to your bookings!`)}
                />
              </section>

              <section id="profile">
                <UserProfileAndTimeline />
              </section>

              <section id="help">
                <HelpCenterWidget />
              </section>
            </>
          )}
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

      {/* Create Article Modal */}
      <CreateArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onPublish={(newArticle) => {
          showToast(`Article "${newArticle.title}" published successfully!`);
        }}
      />
    </div>
  );
}
