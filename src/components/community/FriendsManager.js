"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  MessageSquare,
  Video,
  Phone,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
  User,
  Heart,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeFriendsStore,
  getFriendStatus,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  getPendingIncomingRequests,
} from "@/lib/friendStore.js";
import { getStoredRealUsers, subscribeUserRegistry } from "@/lib/userRegistry.js";
import { UserAvatar } from "@/components/UserAvatar";
import { useCall } from "@/components/calls/CallProvider";

const DEMO_REGISTERED_USERS = [
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    displayName: "Rajesh (AC Specialist)",
    role: "TECHNICIAN",
    email: "rajesh@phidim.np",
    phone: "+977 9811111111",
    avatar: "",
    bio: "Senior AC Cooling & Electrical Technician in Phidim Ward 4.",
    online: true,
  },
  {
    id: "usr-cust-saraswati",
    name: "Saraswati Subedi",
    displayName: "Saraswati (Customer)",
    role: "USER",
    email: "saraswati@phidim.np",
    phone: "+977 9822222222",
    avatar: "",
    bio: "Homeowner in Phidim Ward 2. Frequent service customer.",
    online: true,
  },
  {
    id: "usr-cust-bikash",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    role: "USER",
    email: "bikash@phidim.np",
    phone: "+977 9833333333",
    avatar: "",
    bio: "Store manager at Main Bazar Phidim.",
    online: false,
  },
  {
    id: "usr-tech-anita",
    name: "Anita Rai",
    displayName: "Anita Rai (Fiber Expert)",
    role: "TECHNICIAN",
    email: "anita@phidim.np",
    phone: "+977 9844444444",
    avatar: "",
    bio: "DishHome Fiber Optic splicing & network setup specialist.",
    online: true,
  },
  {
    id: "usr-tech-suman",
    name: "Suman Limbu",
    displayName: "Suman Limbu",
    role: "TECHNICIAN",
    email: "suman@phidim.np",
    phone: "+977 9855555555",
    avatar: "",
    bio: "Master Electrician & Plumber in Panchthar district.",
    online: true,
  },
  {
    id: "usr-cust-semik",
    name: "Semik Serma",
    displayName: "Semik Serma",
    role: "USER",
    email: "semikserma@gmail.com",
    phone: "+977 9862772400",
    avatar: "",
    bio: "Registered customer & Panchthar community member.",
    online: true,
  },
  {
    id: "usr-admin-phidim",
    name: "Dhanraj Serma",
    displayName: "Platform Admin",
    role: "ADMIN",
    email: "dhanrajserma34@gmail.com",
    phone: "+977 9800000000",
    avatar: "",
    bio: "Official Phidim Service System Administrator.",
    online: true,
  },
];

export function FriendsManager({ onStartChat, onStartCall, onShowToast }) {
  const { user } = useAuth();
  const { startCall } = useCall();
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(DEMO_REGISTERED_USERS);
  const [friendDataVer, setFriendDataVer] = useState(0);

  const triggerCall = (friend, type = "video") => {
    if (onStartCall) {
      onStartCall(friend, type);
    } else {
      startCall(friend, type);
    }
  };

  useEffect(() => {
    const unsubFriends = subscribeFriendsStore(() => {
      setFriendDataVer((v) => v + 1);
    });
    const unsubRegistry = subscribeUserRegistry(() => {
      setFriendDataVer((v) => v + 1);
    });
    return () => {
      unsubFriends();
      unsubRegistry();
    };
  }, []);

  // Fetch search results from API and merge with stored real accounts
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      let apiUsers = [];
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.users)) {
            apiUsers = data.users;
          }
        }
      } catch (e) {}

      const localRealUsers = getStoredRealUsers();
      const map = new Map();
      [...DEMO_REGISTERED_USERS, ...localRealUsers, ...apiUsers].forEach((u) => {
        if (u && u.email) {
          map.set(u.email.toLowerCase(), u);
        }
      });

      const allMerged = Array.from(map.values()).filter(
        (u) =>
          u.email.toLowerCase() !== user?.email?.toLowerCase() &&
          (!searchQuery.trim() ||
            u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.role?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (isMounted) {
        setSearchResults(allMerged);
      }
    };

    const timer = setTimeout(fetchUsers, 300);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, user, friendDataVer]);

  const handleSendRequest = (targetUser) => {
    sendFriendRequest({ senderUser: user, receiverUser: targetUser });
    if (onShowToast) {
      onShowToast(`Friend request sent to ${targetUser.displayName || targetUser.name}!`);
    }
  };

  const handleCancelRequest = (targetUser) => {
    declineFriendRequest(user?.email, targetUser.email);
    if (onShowToast) {
      onShowToast(`Cancelled request to ${targetUser.displayName || targetUser.name}.`);
    }
  };

  const handleAcceptRequest = (targetUser) => {
    acceptFriendRequest(user?.email, targetUser.email);
    if (onShowToast) {
      onShowToast(`You are now friends with ${targetUser.displayName || targetUser.name}! 🎉`);
    }
  };

  const handleDeclineRequest = (targetUser) => {
    declineFriendRequest(user?.email, targetUser.email);
    if (onShowToast) {
      onShowToast(`Declined request from ${targetUser.displayName || targetUser.name}.`);
    }
  };

  const handleRemoveFriend = (targetUser) => {
    if (confirm(`Are you sure you want to remove ${targetUser.displayName || targetUser.name} from friends?`)) {
      removeFriend(user?.email, targetUser.email);
      if (onShowToast) {
        onShowToast(`Removed ${targetUser.displayName || targetUser.name} from friends.`);
      }
    }
  };

  // Lists count helpers using persistent friendStore
  const pendingRequests = searchResults.filter(
    (u) => getFriendStatus(user?.email, u.email) === "received"
  );
  const activeFriends = searchResults.filter(
    (u) => getFriendStatus(user?.email, u.email) === "friends"
  );

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={14} className="text-emerald-200" />
            <span>Phidim Social & Community Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Friends & Connections</h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
            Search new customers, technicians, and admins across Panchthar. Send friend requests, accept incoming requests, and unlock direct chat messaging & HD video calls!
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("search")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "search"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Search size={15} />
            <span>Find & Add Friends</span>
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer relative ${
              activeTab === "requests"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Clock size={15} />
            <span>Friend Requests</span>
            {pendingRequests.length > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-black rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("friends")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "friends"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Users size={15} />
            <span>My Friends ({activeFriends.length})</span>
          </button>
        </div>

        {/* Search Bar Input */}
        {activeTab === "search" && (
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search user name, email, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Main Grid View */}
      {activeTab === "search" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((u) => {
            const status = getFriendStatus(user?.email, u.email);

            return (
              <motion.div
                key={u.id || u.email}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <UserAvatar user={u} size="lg" />
                      {u.online && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {u.displayName || u.name}
                        </h4>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                            u.role === "ADMIN"
                              ? "bg-purple-500/20 text-purple-600 dark:text-purple-300"
                              : u.role === "TECHNICIAN"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                              : "bg-blue-500/20 text-blue-600 dark:text-blue-300"
                          }`}
                        >
                          {u.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">
                    {u.bio || "Registered Phidim Service user & Panchthar community member."}
                  </p>
                </div>

                {/* Friend Action Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {status === "friends" ? (
                    <div className="flex items-center gap-1.5 w-full">
                      <span className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/20 truncate">
                        <UserCheck size={14} /> Friends ✓
                      </span>
                      {onStartChat && (
                        <button
                          onClick={() => onStartChat(u)}
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1 shadow cursor-pointer"
                          title="Open Direct Chat"
                        >
                          <MessageSquare size={14} />
                          <span>Chat</span>
                        </button>
                      )}
                      <button
                        onClick={() => triggerCall(u, "voice")}
                        className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                        title="Start Voice Call"
                      >
                        <Phone size={14} />
                      </button>
                      <button
                        onClick={() => triggerCall(u, "video")}
                        className="p-2 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 hover:bg-teal-500/30 transition-colors cursor-pointer"
                        title="Start HD Video Call"
                      >
                        <Video size={14} />
                      </button>
                    </div>
                  ) : status === "sent" ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Clock size={14} /> Request Pending...
                      </span>
                      <button
                        onClick={() => handleCancelRequest(u)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-slate-600 dark:text-slate-300 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : status === "received" ? (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => handleAcceptRequest(u)}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer shadow"
                      >
                        Accept Request
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(u)}
                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(u)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <UserPlus size={15} />
                      <span>Send Friend Request</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            <span>Pending Incoming Friend Requests</span>
          </h3>

          {pendingRequests.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <Users size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No pending friend requests right now.</p>
              <p className="text-xs text-slate-400">Search registered users above to send requests!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((u) => (
                <div key={u.id || u.email} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={u} size="md" />
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">{u.displayName || u.name}</h4>
                      <p className="text-[11px] text-slate-400">{u.role} • {u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAcceptRequest(u)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(u)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Friends Tab */}
      {activeTab === "friends" && (
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck size={16} className="text-emerald-500" />
            <span>My Active Friends List</span>
          </h3>

          {activeFriends.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <Users size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">You haven&apos;t added any friends yet.</p>
              <button
                onClick={() => setActiveTab("search")}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Find Friends Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeFriends.map((u) => (
                <div key={u.id || u.email} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <UserAvatar user={u} size="md" />
                      {u.online && <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">{u.displayName || u.name}</h4>
                      <p className="text-[11px] text-slate-400">{u.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onStartChat && (
                      <button
                        onClick={() => onStartChat(u)}
                        className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow cursor-pointer"
                        title="Open Direct Chat"
                      >
                        <MessageSquare size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => triggerCall(u, "voice")}
                      className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                      title="Start Voice Call"
                    >
                      <Phone size={16} />
                    </button>
                    <button
                      onClick={() => triggerCall(u, "video")}
                      className="p-2 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 hover:bg-teal-500/30 transition-colors cursor-pointer"
                      title="Start HD Video Call"
                    >
                      <Video size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveFriend(u)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove Friend"
                    >
                      <UserX size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
