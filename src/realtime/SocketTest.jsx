"use client";

import { useEffect, useState } from "react";
import socket from "./client";

export default function SocketTest() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Connected to realtime server:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected from realtime server");
      setConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div>
      {connected
        ? "🟢 Realtime connected"
        : "🔴 Realtime disconnected"}
    </div>
  );
}