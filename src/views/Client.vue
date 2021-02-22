<template>
  Client
</template>

<script>
import socket from "../services/socket";

export default {
  name: 'Client',
  data() {
    return {
      audio: new Audio()
    }
  },
  mounted() {
    socket.on("client:play", url => {
      console.log(url)
      this.audio.src = url;
      this.audio.play();
    });

    socket.on("client:pause", () => {
      this.audio.pause();
    });
  },
  beforeUnmount() {
    // socket.off("client:play");
    // socket.off("client:pause");
  }
};
</script>
