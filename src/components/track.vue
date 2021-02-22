<template>
  <div>
    <span>
      {{ name }} – {{ artists.join(', ') }}
    </span>
    <button
      v-if="canplay"
      @click="togglePlay">
      {{ buttonCopy }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Track',
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null },
    artists: { type: Array, default: () => [] },
    preview: { type: String, default: null }
  },
  data() {
    return {
      audio: null,
      canplay: false
    };
  },
  computed: {
    buttonCopy() {
      return this.playing ? "Pause" : "Play";
    },
    playing() {
      return this.$store.state.server.playing === this.preview;
    }
  },
  watch: {
    playing(value) {
      if (!this.audio) {
        return;
      }
      if (value) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  },
  mounted() {
    if (this.preview) {
      this.audio = new Audio(this.preview);
      this.audio.addEventListener('canplaythrough', this.onCanPlay);
    }
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('canplaythrough', this.onCanPlay);
    }
  },
  methods:{
    togglePlay() {
      if (this.playing) {
        this.$store.dispatch('server/pause', this.preview);
      } else {
        this.$store.dispatch('server/play', this.preview);
      }
    },
    onCanPlay() {
      this.canplay = true;
    }
  }
};
</script>
