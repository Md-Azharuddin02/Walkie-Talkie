const { Server } = require('socket.io');

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('message', (msg) => {
      const isoDate = '2025-08-17T08:12:58.888Z';
      const date = new Date(isoDate);

      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // 12-hour format (AM/PM)
      });

      const message = { msg, timestamp: formattedTime}
      io.emit('message', message); // Broadcast to room
    });

    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = { socketServer };