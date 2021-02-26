const socketIo = require('socket.io');

module.exports = (server) => {
  const socket = socketIo(server);

  socket.on('connection', (io) => {
    console.log('a user connected');

    io.on('server:play', ({ room, url }) => {
      console.log('play', url);
      io.to(room).broadcast.emit('client:play', url);
    });

    io.on('server:pause', ({ room, url }) => {
      console.log('pause', url);
      io.to(room).broadcast.emit('client:pause', url);
    });

    io.on('room:join', room => {
      console.log('create room', room);
      io.to(room).join(room);
    });
  });
};
