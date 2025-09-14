const UserModel = require("../Model/Users");
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
    socket.on("new-connection", async ({userId}) => {
      console.log("New connection established with ID:", socket.id);

      let user = await UserModel.findById(userId);
        user.socketId = socket.id;
        await user.save();
    });

    socket.on("message", (data) => async () => {
    //  const {senderSocketId, receiverPhoneNumber, msg, timestamp} = data
     console.log("data in socket message", data.receiverPhoneNumber)

     receiverSocketId = await UserModel.findOne({receiverId})
     console.log("  receiverSocketId", receiverSocketId.socketId)
      
      userTosocket.set(data.userId, data.socket);
      socketTouser.set(data.socket, data.userId);

      // Private message
      socket.join(data.userId);
      console.log(`👤 User is now online as socket ${data.userId}`);
      io.emit("presence:update", { online: true });
    });
  });

  return io;
};

module.exports = { socketServer };
