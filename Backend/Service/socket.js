const { Server } = require('socket.io');
let ioInstance = null;

const userSocketMap = new Map(); // userId → socket.id

function init(server, corsOptions) {
  if (ioInstance) return ioInstance;

  ioInstance = new Server(server, { cors: corsOptions });

  ioInstance.on('connection', (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // Register the user with a userId
    socket.on('registerUser', (userId) => {
      userSocketMap.set(userId, socket.id);
      console.log(`📌 Registered user ${userId} → ${socket.id}`);
    });

    // Client wants to send a message to another user
    socket.on('sendMessage', (message) => {
      // const targetSocketId = userSocketMap.get(toUserId);
      // if (targetSocketId) {
      //   ioInstance.to(targetSocketId).emit('receiveMessage', {
      //     fromUserId,
      //     message,
      //   });
      // } else {
      //   console.log(`❌ User ${toUserId} not found`);
      // }
      ioInstance.emit('receiveMessage', {
        message,
      });
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Disconnected: ${socket.id}`);
      for (const [userId, sId] of userSocketMap.entries()) {
        if (sId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
    });
  });

  return ioInstance;
}

module.exports = { init, getIO: () => ioInstance };
