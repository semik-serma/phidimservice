import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.REALTIME_PORT || 4000;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Maps authenticated user IDs to their Socket.IO socket IDs
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // ==========================================
  // REGISTER USER
  // ==========================================
  socket.on("register-user", (userId) => {
    if (!userId) return;

    onlineUsers.set(userId, socket.id);

    socket.userId = userId;

    console.log(
      `👤 User registered: ${userId} → ${socket.id}`
    );
  });

  // ==========================================
  // CALL A SPECIFIC USER
  // ==========================================
  socket.on("call-user", ({ targetUserId, caller }) => {
    if (!targetUserId) {
      socket.emit("call-error", {
        message: "Target user ID is required.",
      });

      return;
    }

    const targetSocketId = onlineUsers.get(targetUserId);

    if (!targetSocketId) {
      socket.emit("call-error", {
        message: "User is currently offline.",
      });

      return;
    }

    io.to(targetSocketId).emit("incoming-call", {
      caller,
      callerSocketId: socket.id,
    });

    console.log(
      `📞 Call: ${caller?.name || "Unknown"} → ${targetUserId}`
    );
  });

  // ==========================================
  // JOIN CALL ROOM
  // ==========================================
  socket.on("join-call", (roomId) => {
    socket.join(roomId);

    const usersInRoom = io.sockets.adapter.rooms.get(roomId);
    const userCount = usersInRoom ? usersInRoom.size : 0;

    console.log(
      `📞 ${socket.id} joined room: ${roomId}`
    );

    if (userCount === 1) {
      socket.emit("waiting-for-user");
    }

    if (userCount === 2) {
      socket.emit("call-ready");
      socket.to(roomId).emit("call-ready");
    }
  });

  // ==========================================
  // WEBRTC OFFER
  // ==========================================
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  // ==========================================
  // WEBRTC ANSWER
  // ==========================================
  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  // ==========================================
  // ICE CANDIDATE
  // ==========================================
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  // ==========================================
  // LEAVE CALL
  // ==========================================
  socket.on("leave-call", (roomId) => {
    socket.leave(roomId);

    socket.to(roomId).emit("user-left");
  });

  // ==========================================
  // DISCONNECT
  // ==========================================
  socket.on("disconnect", () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);

      console.log(
        `👤 User went offline: ${socket.userId}`
      );
    }

    console.log(
      "🔴 Socket disconnected:",
      socket.id
    );
  });
});

// ==========================================
// START REALTIME SERVER
// ==========================================
httpServer.listen(PORT, () => {
  console.log(
    `📞 Realtime server running on port ${PORT}`
  );
});