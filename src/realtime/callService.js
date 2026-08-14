"use client";

import socket from "./client";

export function callUser(targetUserId, caller) {
  if (!targetUserId) {
    console.error("❌ No target user ID provided");
    return;
  }

  socket.emit("call-user", {
    targetUserId,
    caller: {
      id: caller?.id,
      name: caller?.name,
      displayName: caller?.displayName,
      avatar: caller?.avatar,
    },
  });

  console.log(
    `📞 Calling ${targetUserId} from ${caller?.name || "Unknown"}`
  );
}