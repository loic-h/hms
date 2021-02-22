import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log(socket.connected);
});

const emit = (event, payload) => {
  socket.emit(event, payload);
};

const on = (event, payload) => {
  socket.on(event, payload);
};

const off = (event, payload) => {
  socket.off(event, payload);
};

export default {
  emit,
  on,
  off
};
