<template>
  <template v-if="playing">
    Playing
  </template>
  <template v-else>
    Waiting
  </template>
</template>

<script>
import { listen } from '../../services/pusher';

export default {
  name: "Player",
  data() {
    return {
      audio: new Audio(),
      url: null,
      playing: false
    }
  },
  mounted() {
    this.initAudio();
  },
  methods: {
    initAudio() {
      listen("play", ({ url }) => {
        this.audio.src = url;
        this.play();
      });

      listen("pause", () => {
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
}
</script>
