import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CHAT_FILE = path.join(process.cwd(), ".chat_state.json");
const MEM_CHATS = new Map();

function getCanonicalConvId(u1, u2) {
  const clean1 = String(u1 || "").toLowerCase().trim();
  const clean2 = String(u2 || "").toLowerCase().trim();
  return [clean1, clean2].sort().join("__");
}

function readChatFromFile() {
  try {
    if (fs.existsSync(CHAT_FILE)) {
      const data = fs.readFileSync(CHAT_FILE, "utf-8").trim();
      if (!data) return {};
      const parsed = JSON.parse(data);
      Object.entries(parsed).forEach(([k, v]) => MEM_CHATS.set(k, v));
      return parsed;
    }
  } catch (e) {}

  const obj = {};
  MEM_CHATS.forEach((v, k) => (obj[k] = v));
  return obj;
}

function writeChatToFile(chatsMap) {
  try {
    Object.entries(chatsMap || {}).forEach(([k, v]) => MEM_CHATS.set(k, v));
    const tmpFile = `${CHAT_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(chatsMap || {}, null, 2), "utf-8");
    fs.renameSync(tmpFile, CHAT_FILE);
  } catch (e) {
    try {
      fs.writeFileSync(CHAT_FILE, JSON.stringify(chatsMap || {}, null, 2), "utf-8");
    } catch (err) {}
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, conversationId, message, userEmail, partnerEmail, messageId, emoji } = body;

    const chats = readChatFromFile();
    const convKey = conversationId || (userEmail && partnerEmail ? getCanonicalConvId(userEmail, partnerEmail) : null);

    if (!convKey) {
      return NextResponse.json({ error: "Missing conversation identifier" }, { status: 400 });
    }

    if (!chats[convKey]) {
      chats[convKey] = [];
    }

    if (action === "SEND" || !action) {
      if (!message || !message.text) {
        return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
      }

      const newMsg = {
        id: message.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        senderId: message.senderId || "",
        senderEmail: (message.senderEmail || "").toLowerCase(),
        senderName: message.senderName || "User",
        senderAvatar: message.senderAvatar || "",
        recipientId: message.recipientId || "",
        recipientEmail: (message.recipientEmail || "").toLowerCase(),
        text: message.text,
        timestamp: message.timestamp || Date.now(),
        time: message.time || new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
        status: message.status || "sent",
        attachment: message.attachment || null,
        reaction: message.reaction || null,
      };

      // Prevent exact duplicates
      if (!chats[convKey].some((m) => m.id === newMsg.id)) {
        chats[convKey].push(newMsg);
        // Keep max 200 messages per conversation
        if (chats[convKey].length > 200) {
          chats[convKey] = chats[convKey].slice(-200);
        }
        writeChatToFile(chats);
      }

      return NextResponse.json({ success: true, message: newMsg, messages: chats[convKey] });
    }

    if (action === "REACTION") {
      chats[convKey] = chats[convKey].map((m) => (m.id === messageId ? { ...m, reaction: emoji } : m));
      writeChatToFile(chats);
      return NextResponse.json({ success: true, messages: chats[convKey] });
    }

    if (action === "DELETE") {
      chats[convKey] = chats[convKey].filter((m) => m.id !== messageId);
      writeChatToFile(chats);
      return NextResponse.json({ success: true, messages: chats[convKey] });
    }

    if (action === "CLEAR") {
      chats[convKey] = [];
      writeChatToFile(chats);
      return NextResponse.json({ success: true, messages: [] });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    const userEmail = searchParams.get("userEmail")?.toLowerCase()?.trim();
    const partnerEmail = searchParams.get("partnerEmail")?.toLowerCase()?.trim();

    const chats = readChatFromFile();

    if (conversationId) {
      return NextResponse.json({
        success: true,
        conversationId,
        messages: chats[conversationId] || [],
      });
    }

    if (userEmail && partnerEmail) {
      const convKey = getCanonicalConvId(userEmail, partnerEmail);
      return NextResponse.json({
        success: true,
        conversationId: convKey,
        messages: chats[convKey] || [],
      });
    }

    if (userEmail) {
      // Return map of conversations involving this user
      const userConvs = {};
      Object.entries(chats).forEach(([key, msgs]) => {
        if (key.includes(userEmail)) {
          userConvs[key] = msgs;
        }
      });
      return NextResponse.json({
        success: true,
        conversations: userConvs,
      });
    }

    return NextResponse.json({ success: true, conversations: chats });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
