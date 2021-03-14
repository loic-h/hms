<template>
  <progress-component :radius="120" :progress="10" :stroke="24" />
  <template v-if="playing">
    Playing
  </template>
  <template v-else>
    Waiting
  </template>
</template>

<script>
import { listen } from '../../services/pusher';
import ProgressComponent from './progress';

export default {
  name: "Player",
  components: {
    ProgressComponent
  },
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
