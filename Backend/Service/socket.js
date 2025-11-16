const { Server } = require("socket.io");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.API_BASE_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Maps
  const onlineUsers = new Map();      // phone → socketId
  const socketToPhone = new Map();    // socketId → phone

  io.on("connection", (socket) => {

    // -------------------------------
    // USER JOINS
    // -------------------------------
    socket.on("join", ({ userPhoneNumber }) => {
      if (!userPhoneNumber) return;

      onlineUsers.set(userPhoneNumber, socket.id);
      socketToPhone.set(socket.id, userPhoneNumber);


      io.emit("online-users-list", Array.from(onlineUsers.keys()));
    });

    // -------------------------------
    // SEND MESSAGE
    // -------------------------------
    socket.on("send-message", (data = {}) => {
      // FIX: Handle misspelled frontend keys
      const senderPhoneNumber = data.senderPhoneNumber;

      const receiverPhoneNumber =
        data.receiverPhoneNumber || data.recieverPhoneNumber;

      const receiverName =
        data.receiverName || data.recieverName;

      const message = data.message;
      const timestamp = data.timestamp;

      if (!senderPhoneNumber || !receiverPhoneNumber || !message) {
        return;
      }

      const receiverSocketId = onlineUsers.get(receiverPhoneNumber);

      // Send to receiver
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("received-message", {
          senderPhoneNumber,
          receiverPhoneNumber,
          receiverName,
          message,
          timestamp,
          direction: "in",
        });
      }

      // Send confirmation to sender
      io.to(socket.id).emit("message-sent-confirmation", {
        senderPhoneNumber,
        receiverPhoneNumber,
        receiverName,
        message,
        timestamp,
        direction: "out",
      });
    });

    // -------------------------------
    // TYPING INDICATOR
    // -------------------------------
    socket.on("typing", ({ sender, receiver, isTyping }) => {
      if (!sender || !receiver) return;

      const receiverId = onlineUsers.get(receiver);

      if (receiverId) {
        io.to(receiverId).emit("typing", {
          sender,
          isTyping,
        });
      }
    });

    // -------------------------------
    // DISCONNECT
    // -------------------------------
    socket.on("disconnect", () => {
      const phone = socketToPhone.get(socket.id);

      if (phone) {
        onlineUsers.delete(phone);
        socketToPhone.delete(socket.id);

        io.emit("online-users-list", Array.from(onlineUsers.keys()));
      }
    });
  });

  return io;
};

module.exports = { socketServer };
