const { Server } = require("socket.io");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Map phone -> socketId
  const onlineUsers = new Map();
  const socketToPhone = new Map();

  io.on("connection", (socket) => {
    socket.on("join", ({ userPhoneNumber }) => {
      if (!userPhoneNumber) return;
      onlineUsers.set(userPhoneNumber, socket.id);
      socketToPhone.set(socket.id, userPhoneNumber);
      console.log(`JOIN: ${userPhoneNumber} -> ${socket.id}`);
    });

    socket.on("send-message", (data) => {
      const { senderPhoneNumber, recieverName, recieverPhoneNumber, msg, timestamp } = data || {};
      if (!recieverPhoneNumber) return;

      const receiverSocketId = onlineUsers.get(recieverPhoneNumber);
      if (!receiverSocketId) {
        console.log(`Receiver ${recieverPhoneNumber} is offline`);
        return;
      }

      io.to(receiverSocketId).emit("received-message", {
        senderPhoneNumber,
        msg,
        timestamp,
        recieverName,

      });
    });

    socket.on("disconnect", () => {
      const phone = socketToPhone.get(socket.id);
      if (phone) {
        onlineUsers.delete(phone);
        socketToPhone.delete(socket.id);
        console.log(`DISCONNECT: ${phone} (${socket.id}) removed from onlineUsers`);
      }
    });
  });

  return io;
};

module.exports = { socketServer };
