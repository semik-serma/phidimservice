import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CALLS_FILE = path.join(process.cwd(), ".calls_state.json");
const MEM_CALLS = new Map();

function readCallsFromFile() {
  try {
    if (fs.existsSync(CALLS_FILE)) {
      const data = fs.readFileSync(CALLS_FILE, "utf-8").trim();
      if (!data) return {};
      const parsed = JSON.parse(data);
      Object.entries(parsed).forEach(([k, v]) => MEM_CALLS.set(k, v));
      return parsed;
    }
  } catch (e) {}

  const obj = {};
  MEM_CALLS.forEach((v, k) => (obj[k] = v));
  return obj;
}

function writeCallsToFile(callsMap) {
  try {
    Object.entries(callsMap || {}).forEach(([k, v]) => MEM_CALLS.set(k, v));
    const tmpFile = `${CALLS_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(callsMap || {}, null, 2), "utf-8");
    fs.renameSync(tmpFile, CALLS_FILE);
  } catch (e) {
    try {
      fs.writeFileSync(CALLS_FILE, JSON.stringify(callsMap || {}, null, 2), "utf-8");
    } catch (err) {}
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, session, callId, sdpOffer, sdpAnswer, candidate, senderEmail, mediaState, message } = body;

    const now = Date.now();
    const calls = readCallsFromFile();

    // Clean up stale calls older than 10 minutes
    for (const [id, call] of Object.entries(calls)) {
      if (now - (call.startedAt || 0) > 600000) {
        delete calls[id];
        MEM_CALLS.delete(id);
      }
    }

    if (action === "INITIATE") {
      if (!session || !session.callId) {
        return NextResponse.json({ error: "Invalid call session" }, { status: 400 });
      }
      calls[session.callId] = {
        ...session,
        status: "RINGING",
        sdpOffer: null,
        sdpAnswer: null,
        callerIceCandidates: [],
        recipientIceCandidates: [],
        callerMediaState: { isMuted: false, isVideoOn: session.callType === "video", isScreenSharing: false },
        recipientMediaState: { isMuted: false, isVideoOn: session.callType === "video", isScreenSharing: false },
        messages: [],
        startedAt: now,
        updatedAt: now,
      };
      writeCallsToFile(calls);
      return NextResponse.json({ success: true, call: calls[session.callId] });
    }

    const currentCall = calls[callId] || MEM_CALLS.get(callId);

    if (action === "OFFER") {
      if (currentCall) {
        currentCall.sdpOffer = sdpOffer;
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, call: currentCall });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "ANSWER") {
      if (currentCall) {
        currentCall.sdpAnswer = sdpAnswer;
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, call: currentCall });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "ICE_CANDIDATE") {
      if (currentCall && candidate) {
        const callerEmail = (currentCall.caller?.email || "").toLowerCase();
        const sEmail = (senderEmail || "").toLowerCase();
        const isCaller = sEmail === callerEmail;

        if (isCaller) {
          if (!currentCall.callerIceCandidates) currentCall.callerIceCandidates = [];
          currentCall.callerIceCandidates.push(candidate);
        } else {
          if (!currentCall.recipientIceCandidates) currentCall.recipientIceCandidates = [];
          currentCall.recipientIceCandidates.push(candidate);
        }
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: "Call not found or candidate missing" }, { status: 400 });
    }

    if (action === "MEDIA_STATE") {
      if (currentCall && mediaState) {
        const callerEmail = (currentCall.caller?.email || "").toLowerCase();
        const sEmail = (senderEmail || "").toLowerCase();
        const isCaller = sEmail === callerEmail;

        if (isCaller) {
          currentCall.callerMediaState = { ...(currentCall.callerMediaState || {}), ...mediaState };
        } else {
          currentCall.recipientMediaState = { ...(currentCall.recipientMediaState || {}), ...mediaState };
        }
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, call: currentCall });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "CHAT_MESSAGE") {
      if (currentCall && message) {
        if (!currentCall.messages) currentCall.messages = [];
        currentCall.messages.push({
          id: message.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          sender: message.sender || senderEmail,
          senderName: message.senderName || "User",
          text: message.text,
          timestamp: message.timestamp || now,
        });
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, messages: currentCall.messages });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "ACCEPT") {
      if (currentCall) {
        currentCall.status = "ACCEPTED";
        currentCall.acceptedAt = now;
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, call: currentCall });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "DECLINE") {
      if (currentCall) {
        currentCall.status = "DECLINED";
        currentCall.declinedAt = now;
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
        return NextResponse.json({ success: true, call: currentCall });
      }
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    if (action === "END") {
      if (currentCall) {
        currentCall.status = "ENDED";
        currentCall.endedAt = now;
        currentCall.updatedAt = now;
        calls[callId] = currentCall;
        writeCallsToFile(calls);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = (searchParams.get("email") || "").toLowerCase().trim();
    const userId = (searchParams.get("id") || "").toLowerCase().trim();
    const userName = (searchParams.get("name") || "").toLowerCase().trim();
    const userPhone = (searchParams.get("phone") || "").replace(/[^0-9]/g, "");
    const callId = searchParams.get("callId");

    const calls = readCallsFromFile();

    if (callId) {
      const call = calls[callId] || MEM_CALLS.get(callId);
      return NextResponse.json({ call: call || null });
    }

    if (userEmail || userId || userName || userPhone) {
      let foundIncoming = null;
      let foundActive = null;

      for (const [_, call] of Object.entries(calls)) {
        if (!call) continue;
        const recEmail = (call.recipient?.email || "").toLowerCase().trim();
        const calEmail = (call.caller?.email || "").toLowerCase().trim();
        const recId = (call.recipient?.id || "").toLowerCase().trim();
        const calId = (call.caller?.id || "").toLowerCase().trim();
        const recName = (call.recipient?.name || call.recipient?.displayName || "").toLowerCase().trim();
        const calName = (call.caller?.name || call.caller?.displayName || "").toLowerCase().trim();
        const recPhone = (call.recipient?.phone || "").replace(/[^0-9]/g, "");
        const calPhone = (call.caller?.phone || "").replace(/[^0-9]/g, "");

        const isMeRecipient =
          (userEmail && (recEmail === userEmail || recEmail.includes(userEmail) || userEmail.includes(recEmail))) ||
          (userId && (recId === userId || recEmail.includes(userId) || userId.includes(recId))) ||
          (userName && (recName === userName || recName.includes(userName) || userName.includes(recName))) ||
          (userPhone && recPhone && recPhone.includes(userPhone));

        const isMeCaller =
          (userEmail && (calEmail === userEmail || calEmail.includes(userEmail) || userEmail.includes(calEmail))) ||
          (userId && (calId === userId || calEmail.includes(userId) || userId.includes(calId))) ||
          (userName && (calName === userName || calName.includes(userName) || userName.includes(calName))) ||
          (userPhone && calPhone && calPhone.includes(userPhone));

        if (isMeRecipient && call.status === "RINGING") {
          foundIncoming = call;
          break;
        }

        if ((isMeRecipient || isMeCaller) && (call.status === "ACCEPTED" || call.status === "RINGING")) {
          foundActive = call;
        }
      }

      return NextResponse.json({
        incoming: foundIncoming,
        active: foundActive,
      });
    }

    return NextResponse.json({ activeCalls: Object.values(calls) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
