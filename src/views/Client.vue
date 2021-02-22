<template>
  <template v-if="ready">
    <template v-if="playing">
      Playing
    </template>
    <template v-else>
      Waiting
    </template>
  </template>
  <template v-else>
    <button @click="onReadyClick">
      Ready?
    </button>
  </template>
</template>

<script>
import socket from "../services/socket";

export default {
  name: 'Client',
  data() {
    return {
      audio: new Audio(),
      url: null,
      playing: false,
      ready: false
    }
  },
  watch: {
    ready(value) {
      console.log(value)
      if (value) {
        this.initAudio();
      }
    }
  },
  beforeUnmount() {
    socket.off("client:play");
    socket.off("client:pause");
  },
  methods: {
    initAudio() {
      socket.on("client:play", url => {
        this.audio.src = url;
        this.play();
      });

      socket.on("client:pause", () => {
        this.pause();
      });
    },
    play() {
      this.audio.play();
      this.playing = true;
    },
    pause() {
      this.audio.pause();
      this.playing = false;
    },
    onReadyClick() {
      this.ready = true
    }
  }
};
</script>
