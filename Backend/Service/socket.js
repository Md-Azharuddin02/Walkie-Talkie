const UserModel = require("../Model/Users");
const { Server } = require("socket.io");

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const onLineUsers = new Map();

  io.on("connection", (socket) => {
    socket.on("join", (data) => {
      const {userPhoneNumber, socketId} = data
      onLineUsers.set(userPhoneNumber,socketId)
    });
    socket.on("message", async (data) => {
      const {senderPhoneNumber, recieverPhoneNumber, msg, timestamp} = data
      console.log(onLineUsers.get(recieverSocketId))
      
       const recieverSocketId= onLineUsers.get(recieverPhoneNumber)
       console.log(recieverSocketId)

       socket.to(recieverSocketId).emit(senderPhoneNumber, msg, timestamp)

    });
  });

  return io;
};

module.exports = { socketServer };
