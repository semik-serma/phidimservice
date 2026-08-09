"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  FileText,
  Phone,
  Video,
  Send,
  Paperclip,
  CheckCheck,
  Search,
  Sparkles,
  Users,
  UserCheck,
  Wifi,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { ArticlesFeed } from "../articles/ArticlesFeed";
import { useWebSocket } from "@/lib/socket/useWebSocket";

const DEMO_FRIENDS = [
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    role: "TECHNICIAN",
    specialty: "Senior AC Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    online: true,
    isMutual: true,
    bio: "Senior AC cooling & electrical technician in Phidim Ward 4.",
  },
  {
    id: "usr-cust-ram",
    name: "Ram Shrestha",
    role: "USER",
    specialty: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    online: false,
    isMutual: true,
    bio: "Business owner in Phidim Bazar. Active community contributor.",
  },
  {
    id: "usr-tech-anita",
    name: "Anita Rai",
    role: "TECHNICIAN",
    specialty: "DishHome Fiber Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    online: true,
    isMutual: true,
    bio: "High-speed fiber optic splicing & WiFi router configuration expert.",
  },
  {
    id: "usr-tech-suman",
    name: "Suman Limbu",
    role: "TECHNICIAN",
    specialty: "Master Electrician & Plumber",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    online: true,
    isMutual: true,
    bio: "10+ years field experience in residential electrical wiring.",
  },
  {
    id: "usr-tech-kabita",
    name: "Kabita Subba",
    role: "TECHNICIAN",
    specialty: "CCTV Security Specialist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    online: false,
    isMutual: true,
    bio: "Dahua IP camera installation & mobile monitoring setup.",
  },
  {
    id: "usr-admin-phidim",
    name: "Phidim Service Admin",
    role: "ADMIN",
    specialty: "Platform Support Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    online: true,
    isMutual: true,
    bio: "Official Phidim Service platform administrator.",
  },
];

const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    partner: DEMO_FRIENDS[0],
    lastMessage: "I will arrive at Phidim Ward 4 in 15 minutes for your AC service.",
    lastTime: "10:42 AM",
    unreadCount: 1,
    messages: [
      { id: "m1", sender: "partner", text: "Namaste! I am assigned to your AC servicing booking.", time: "10:30 AM" },
      { id: "m2", sender: "me", text: "Great! Please bring copper pipe extension if needed.", time: "10:35 AM" },
      { id: "m3", sender: "partner", text: "I will arrive at Phidim Ward 4 in 15 minutes for your AC service.", time: "10:42 AM" },
    ],
  },
  {
    id: "conv-2",
    partner: DEMO_FRIENDS[1],
    lastMessage: "Thank you for the quick CCTV camera installation guide!",
    lastTime: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: "m10", sender: "partner", text: "Hey! Loved your article on CCTV security setup.", time: "Yesterday" },
      { id: "m11", sender: "me", text: "Glad it helped! Feel free to ask if you need installation.", time: "Yesterday" },
      { id: "m12", sender: "partner", text: "Thank you for the quick CCTV camera installation guide!", time: "Yesterday" },
    ],
  },
  {
    id: "conv-3",
    partner: DEMO_FRIENDS[5],
    lastMessage: "Your profile verification was approved successfully.",
    lastTime: "Aug 06",
    unreadCount: 0,
    messages: [
      { id: "m20", sender: "partner", text: "Your profile verification was approved successfully.", time: "Aug 06" },
    ],
  },
];

export function DirectChatSection({ onOpenCreateArticleModal, onStartCall }) {
  const [activeTab, setActiveTab] = useState("CHAT"); // CHAT | FRIENDS | ARTICLES
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState("conv-1");
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // WebSocket Integration
  const { isConnected, sendMessage: sendWsMessage } = useWebSocket();

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: "m-" + Date.now(),
      sender: "me",
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Send over real WebSocket
    sendWsMessage({
      type: "chat_message",
      convId: activeConvId,
      text: newMsg.text,
      timestamp: Date.now(),
    });

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: newMsg.text,
            lastTime: newMsg.time,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setInputMessage("");
  };

  const handleStartChatFromFriend = (friend) => {
    const existing = conversations.find((c) => c.partner.id === friend.id);
    if (existing) {
      setActiveConvId(existing.id);
      setActiveTab("CHAT");
    } else {
      const newConv = {
        id: "conv-" + Date.now(),
        partner: friend,
        lastMessage: "Mutual friend connection active! Say hello.",
        lastTime: "Just now",
        unreadCount: 0,
        messages: [
          { id: "m0", sender: "partner", text: `Namaste ${friend.name}! Great to connect on Phidim Service.`, time: "Just now" },
        ],
      };
      setConversations([newConv, ...conversations]);
      setActiveConvId(newConv.id);
      setActiveTab("CHAT");
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-Header Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("CHAT")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "CHAT"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <MessageSquare size={16} />
            <span>💬 Chat Messages</span>
          </button>

          <button
            onClick={() => setActiveTab("FRIENDS")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "FRIENDS"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Users size={16} />
            <span>👥 Friends & Mutual Contacts ({DEMO_FRIENDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ARTICLES")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "ARTICLES"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <FileText size={16} />
            <span>📰 Articles & Tech Guides</span>
          </button>
        </div>

        {/* WebSocket Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold shrink-0">
          <Wifi size={14} className="animate-pulse" />
          <span>WebSocket Live Stream Active</span>
        </div>
      </div>

      {/* Render Selected View */}
      {activeTab === "ARTICLES" ? (
        <ArticlesFeed
          onOpenCreateModal={onOpenCreateArticleModal}
          onStartChat={handleStartChatFromFriend}
          onStartCall={onStartCall}
        />
      ) : activeTab === "FRIENDS" ? (
        /* Demo Friends & Mutual Contacts List Grid */
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black">Mutual Friends & Contacts</h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Connect with verified workers, admins, and customers in Panchthar. Mutual followers unlock direct text messaging, voice calls, and video calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_FRIENDS.map((friend) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/50"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                          friend.online ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
                      <UserCheck size={14} />
                      <span>Mutual Friend</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{friend.name}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-md font-extrabold uppercase ${
                          friend.role === "ADMIN"
                            ? "bg-purple-500/20 text-purple-600 dark:text-purple-300"
                            : friend.role === "TECHNICIAN"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                            : "bg-blue-500/20 text-blue-600 dark:text-blue-300"
                        }`}
                      >
                        {friend.role}
                      </span>
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {friend.specialty}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                      {friend.bio}
                    </p>
                  </div>
                </div>

                {/* Friend Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleStartChatFromFriend(friend)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare size={15} />
                    <span>Message</span>
                  </button>

                  <button
                    onClick={() => onStartCall && onStartCall(friend, "voice")}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    title="Voice Call"
                  >
                    <Phone size={16} className="text-emerald-500" />
                  </button>

                  <button
                    onClick={() => onStartCall && onStartCall(friend, "video")}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    title="HD Video Call"
                  >
                    <Video size={16} className="text-teal-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Chat Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[680px]">
          {/* Left Column: Conversations List */}
          <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center justify-between">
                <span>Direct Messages</span>
                <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                  ⚡ WebSocket Live
                </span>
              </h3>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer text-left ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.partner.avatar}
                        alt={conv.partner.name}
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                      />
                      {conv.partner.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          {conv.partner.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">{conv.lastTime}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/40">
            {/* Active Conversation Top Bar */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.partner.avatar}
                  alt={activeConv.partner.name}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{activeConv.partner.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                      {activeConv.partner.role}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">{activeConv.partner.specialty}</p>
                </div>
              </div>

              {/* Call Controls Bar (Voice Call & Video Call) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartCall && onStartCall(activeConv.partner, "voice")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950 text-xs font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                  title="Start Voice Call"
                >
                  <Phone size={15} className="text-emerald-500" />
                  <span className="hidden sm:inline">Voice Call</span>
                </button>

                <button
                  onClick={() => onStartCall && onStartCall(activeConv.partner, "video")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer"
                  title="Start HD Video Call"
                >
                  <Video size={15} />
                  <span>HD Video Call</span>
                </button>
              </div>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConv.messages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs font-medium space-y-1 shadow-xs ${
                        isMe
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none"
                          : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 text-[10px] ${isMe ? "text-emerald-100" : "text-slate-400"}`}>
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck size={13} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <button
                type="button"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Attach photo or document"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                placeholder={`Message ${activeConv.partner.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
