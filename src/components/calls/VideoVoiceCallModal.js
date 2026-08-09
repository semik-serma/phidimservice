"use client";

import { useState, useEffect, useRef } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  RefreshCw,
  CameraOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Smile,
  Send,
  X,
  Shield,
  Wifi,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const EMOJI_REACTIONS = ["❤️", "👏", "👍", "🔥", "🎉", "😂", "✋"];

export function VideoVoiceCallModal({ isOpen, onClose, targetPerson, callType = "video" }) {
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callStatus, setCallStatus] = useState("Connecting...");
  const [callDuration, setCallDuration] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [meetMessages, setMeetMessages] = useState([
    { id: "mm-1", sender: "partner", text: "Namaste! Let's begin the session.", time: "Just now" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  const mainVideoRef = useRef(null);
  const pipVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const chatEndRef = useRef(null);

  /* ─── Media Setup ─── */
  const requestMediaAccess = async () => {
    setMediaError(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMediaError("Camera and microphone not accessible on this device.");
      setHasMediaPermission(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" },
        audio: true,
      });
      localStreamRef.current = stream;
      setHasMediaPermission(true);
    } catch {
      setHasMediaPermission(false);
      setMediaError("Camera and microphone not accessible on this device.");
    }
  };

  const stopAllStreams = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
  };

  useEffect(() => {
    if (isOpen) {
      setIsVideoOn(callType === "video");
      setCallStatus("Connecting...");
      requestMediaAccess();
      const ct = setTimeout(() => setCallStatus("Connected"), 1200);
      const dt = setInterval(() => setCallDuration((p) => p + 1), 1000);
      return () => { clearTimeout(ct); clearInterval(dt); stopAllStreams(); };
    } else {
      setCallDuration(0);
      setCallStatus("Ringing...");
      stopAllStreams();
    }
  }, [isOpen, callType]);

  /* Bind streams to <video> elements */
  useEffect(() => {
    if (isScreenSharing && screenStreamRef.current && mainVideoRef.current) {
      mainVideoRef.current.srcObject = screenStreamRef.current;
      mainVideoRef.current.play().catch(() => {});
    } else if (localStreamRef.current) {
      if (mainVideoRef.current) {
        mainVideoRef.current.srcObject = localStreamRef.current;
        mainVideoRef.current.play().catch(() => {});
      }
      if (pipVideoRef.current) {
        pipVideoRef.current.srcObject = localStreamRef.current;
        pipVideoRef.current.play().catch(() => {});
      }
    }
  }, [hasMediaPermission, isVideoOn, isScreenSharing, isOpen]);

  useEffect(() => {
    localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = isVideoOn));
  }, [isVideoOn]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [meetMessages]);

  /* ─── Screen Share ─── */
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
    } else {
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) { alert("Screen sharing not supported."); return; }
        const s = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = s;
        setIsScreenSharing(true);
        s.getVideoTracks()[0].onended = () => { setIsScreenSharing(false); screenStreamRef.current = null; };
      } catch { /* cancelled */ }
    }
  };

  /* ─── Emoji Reactions ─── */
  const sendEmojiReaction = (emoji) => {
    const id = Date.now() + Math.random();
    setFloatingReactions((p) => [...p, { id, emoji, left: Math.random() * 70 + 10 }]);
    setTimeout(() => setFloatingReactions((p) => p.filter((r) => r.id !== id)), 3000);
  };

  /* ─── In-Call Chat ─── */
  const handleSendMeetChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMeetMessages((p) => [...p, {
      id: "mm-" + Date.now(), sender: "me", text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setChatInput("");
  };

  if (!isOpen) return null;

  const fmtDur = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const personName   = targetPerson?.name   || "Rajesh Tamang";
  const personRole   = targetPerson?.role   || "Senior AC Technician";
  const personAvatar = targetPerson?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  /* ─── Shared Control Button Component ─── */
  const ControlBtn = ({ onClick, active, activeClass = "bg-white/20 text-white border-white/20", label, children }) => (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      title={label}
      className="flex flex-col items-center gap-1.5 cursor-pointer group"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
        active ? activeClass : "bg-white/10 hover:bg-white/18 text-white border-white/10"
      }`}>
        {children}
      </div>
      <span className="text-[10px] text-white/45 font-semibold group-hover:text-white/75 transition-colors leading-none">
        {label}
      </span>
    </motion.button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f1a] flex overflow-hidden">
      {/* ─── Floating Emoji Reactions overlay ─── */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingReactions.map((r) => (
          <motion.span
            key={r.id}
            initial={{ y: "85vh", opacity: 1, scale: 0.6 }}
            animate={{ y: "-5vh",  opacity: 0, scale: 2.2 }}
            transition={{ duration: 2.8, ease: "easeOut" }}
            style={{ left: `${r.left}%`, position: "absolute" }}
            className="text-4xl drop-shadow-2xl select-none"
          >
            {r.emoji}
          </motion.span>
        ))}
      </div>

      {/* ─── MAIN VIDEO AREA ─── */}
      <div className="relative flex-1 flex flex-col bg-[#0b0f1a] overflow-hidden">

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#0d1525] to-[#0b0f1a]" />

        {/* VIDEO or AVATAR */}
        <div className="relative flex-1 overflow-hidden">
          {(isVideoOn || isScreenSharing) && (hasMediaPermission || isScreenSharing) ? (
            <video
              ref={mainVideoRef}
              autoPlay playsInline muted
              className={`w-full h-full object-cover ${!isScreenSharing ? "-scale-x-100" : ""}`}
            />
          ) : isVideoOn && !hasMediaPermission ? (
            /* Camera denied */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative">
              <img src={personAvatar} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl scale-110" />
              <div className="relative w-20 h-20 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center">
                <CameraOff size={32} className="text-rose-400" />
              </div>
              <p className="relative text-sm text-white/50 font-medium">Camera unavailable</p>
            </div>
          ) : (
            /* Voice-only avatar view */
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              <img src={personAvatar} alt="" className="absolute inset-0 w-full h-full object-cover opacity-8 blur-3xl scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f1a]/80 via-[#0b0f1a]/50 to-[#0b0f1a]/90" />

              <div className="relative flex flex-col items-center gap-6 text-center">
                <div className="relative">
                  {/* Pulse rings */}
                  <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/40" />
                  <motion.div animate={{ scale: [1, 1.5, 1],  opacity: [0.2, 0, 0.2] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                    className="absolute inset-0 rounded-full border border-emerald-400/20" />
                  <img src={personAvatar} alt={personName}
                    className="relative w-36 h-36 rounded-full object-cover ring-4 ring-emerald-500/30 shadow-2xl" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white">{personName}</h2>
                  <p className="text-sm text-white/45 mt-1">{personRole}</p>
                </div>

                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                  <div className={`w-2 h-2 rounded-full ${callStatus === "Connected" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                  <span className="text-sm font-semibold text-white/75 tabular-nums">
                    {callStatus === "Connected" ? fmtDur(callDuration) : callStatus}
                  </span>
                </div>

                {callStatus === "Connected" && !isMuted && (
                  <div className="flex items-end gap-1 h-10">
                    {[3, 6, 9, 7, 10, 5, 8, 4, 7, 5.5, 9, 3.5, 6.5].map((h, i) => (
                      <motion.div key={i}
                        animate={{ scaleY: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 0.65 + (i % 4) * 0.12, delay: i * 0.05 }}
                        style={{ height: `${h * 3}px` }}
                        className="w-1 bg-emerald-400/60 rounded-full origin-bottom"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
          {/* Bottom gradient bar */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

          {/* ─── TOP STATUS BAR (always visible) ─── */}
          <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-5 flex items-center justify-between">
            {/* Left – person chip */}
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
              <img src={personAvatar} alt={personName} className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/20" />
              <div>
                <p className="text-xs font-bold text-white leading-none">{personName}</p>
                <p className="text-[10px] text-white/45 mt-0.5">{personRole}</p>
              </div>
            </div>

            {/* Center – duration */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className={`w-1.5 h-1.5 rounded-full ${callStatus === "Connected" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-xs font-bold text-white/75 tabular-nums">
                {callStatus === "Connected" ? fmtDur(callDuration) : callStatus}
              </span>
              {isScreenSharing && (
                <span className="ml-1 text-[10px] font-extrabold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                  🖥️ Sharing
                </span>
              )}
            </div>

            {/* Right – quality badges */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                <Shield size={11} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-white/55">E2E Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                <Wifi size={11} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-white/55">HD</span>
              </div>
            </div>
          </div>

          {/* ─── Draggable PiP window ─── */}
          {(isVideoOn || isScreenSharing) && hasMediaPermission && (
            <motion.div
              drag
              dragConstraints={{ left: -380, right: 0, top: -500, bottom: 0 }}
              className="absolute bottom-28 right-5 z-20 w-44 rounded-2xl overflow-hidden shadow-2xl border border-white/15 cursor-move"
              title="Drag to move"
            >
              <video ref={pipVideoRef} autoPlay playsInline muted
                className="w-full aspect-video object-cover -scale-x-100 bg-slate-900 block" />
              <div className="absolute bottom-1.5 left-2 text-[9px] font-black text-white bg-black/55 px-1.5 py-0.5 rounded backdrop-blur-sm select-none">
                YOU
              </div>
            </motion.div>
          )}

          {/* ─── Error Banner ─── */}
          {mediaError && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-rose-200 text-xs font-bold px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap">
              <AlertTriangle size={16} className="text-rose-400 shrink-0" />
              <span>{mediaError}</span>
              <button onClick={requestMediaAccess}
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[11px] transition-all cursor-pointer">
                <RefreshCw size={12} />
                Retry
              </button>
            </div>
          )}

          {/* ─── Emoji Picker Popover ─── */}
          <AnimatePresence>
            {isEmojiPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.92 }}
                className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-40 bg-[#141824] border border-white/12 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-4 backdrop-blur-xl"
              >
                {EMOJI_REACTIONS.map((emoji) => (
                  <motion.button key={emoji}
                    whileHover={{ scale: 1.4, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { sendEmojiReaction(emoji); setIsEmojiPickerOpen(false); }}
                    className="text-3xl cursor-pointer leading-none"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── BOTTOM CONTROL BAR (always visible) ─── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-3">
            {/* Glass pill container */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-4 mx-auto max-w-max shadow-2xl flex-wrap">

              <ControlBtn onClick={() => setIsMuted(!isMuted)}
                active={isMuted} activeClass="bg-rose-500/30 text-rose-300 border-rose-500/40"
                label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </ControlBtn>

              <ControlBtn onClick={() => setIsVideoOn(!isVideoOn)}
                active={isVideoOn} activeClass="bg-white/20 text-white border-white/20"
                label={isVideoOn ? "Stop Video" : "Start Video"}>
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </ControlBtn>

              <ControlBtn onClick={toggleScreenShare}
                active={isScreenSharing} activeClass="bg-teal-500/30 text-teal-300 border-teal-500/40"
                label={isScreenSharing ? "Stop Share" : "Share Screen"}>
                {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
              </ControlBtn>

              <ControlBtn onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                active={isEmojiPickerOpen} activeClass="bg-amber-500/25 text-amber-200 border-amber-500/30"
                label="Reactions">
                <Smile size={20} />
              </ControlBtn>

              <ControlBtn onClick={() => setIsChatOpen(!isChatOpen)}
                active={isChatOpen} activeClass="bg-emerald-500/25 text-emerald-200 border-emerald-500/30"
                label="In-Call Chat">
                <MessageSquare size={20} />
              </ControlBtn>

              <ControlBtn onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                active={isSpeakerOn} activeClass="bg-white/20 text-white border-white/20"
                label={isSpeakerOn ? "Speaker On" : "Speaker Off"}>
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </ControlBtn>

              {/* Separator */}
              <div className="w-px h-9 bg-white/12 mx-1" />

              {/* End Call */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => { stopAllStreams(); onClose(); }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
                title="End Call"
              >
                <div className="w-13 h-12 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-600/30 transition-colors border border-rose-400/20">
                  <PhoneOff size={21} />
                </div>
                <span className="text-[10px] text-rose-400 font-semibold leading-none">End</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SIDE CHAT PANEL ─── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative h-full border-l border-white/8 bg-[#0f1420]/96 backdrop-blur-2xl flex flex-col overflow-hidden shrink-0"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/8 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <MessageSquare size={15} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">In-Call Chat</h4>
                  <p className="text-[10px] text-white/35 mt-0.5">End-to-end encrypted</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {meetMessages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} gap-2`}>
                    {!isMe && (
                      <img src={personAvatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
                    )}
                    <div className={`flex flex-col gap-1 max-w-[210px] ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        isMe
                          ? "bg-emerald-600 text-white rounded-br-sm"
                          : "bg-white/10 text-white/85 rounded-bl-sm border border-white/8"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-white/25 px-1">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/8 shrink-0">
              <form onSubmit={handleSendMeetChat} className="flex items-center gap-2.5">
                <input
                  type="text"
                  placeholder="Send a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white/8 border border-white/10 rounded-xl text-xs text-white font-medium placeholder-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-md">
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
