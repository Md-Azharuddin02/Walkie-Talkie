const { Server } = require("socket.io");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const userTosocket = new Map();
  const socketTouser = new Map();

  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      console.log("Message received on server:", data);
      if (!data.socket) return;
      userTosocket.set(data.userId, data.socket);
      socketTouser.set(data.socket, data.userId);

      console.log("userTosocket", userTosocket.get(data.userId));
      console.log("socketTouser", socketTouser.get(data.socket));

      // Private message
      socket.join(data.userId);
      console.log(`👤 User is now online as socket ${data.userId}`);
      io.emit("presence:update", { online: true });
    });
  });

  return io;
};

module.exports = { socketServer };
