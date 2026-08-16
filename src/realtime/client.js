"use client";

// Fallback safe socket client for browser runtime when standalone realtime server is optional.
let socketInstance = {
  emit: () => {},
  on: () => {},
  off: () => {},
  disconnect: () => {},
  connected: false,
};

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SOCKET_URL) {
  try {
    const { io } = require("socket.io-client");
    socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      autoConnect: false,
      reconnection: false,
      withCredentials: true,
    });
  } catch (e) {
    // Graceful fallback
  }
}

export default socketInstance;