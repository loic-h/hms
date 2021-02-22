const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('server:play', url => {
      console.log('play', url);
      socket.broadcast.emit('client:play', url);
    });

    socket.on('server:pause', url => {
      console.log('pause', url);
      socket.broadcast.emit('client:pause', url);
    });
  });
};
