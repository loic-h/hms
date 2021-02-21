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
      canplay: false,
      playing: false
    };
  },
  computed: {
    buttonCopy() {
      return this.playing ? "Pause" : "Play";
    }
  },
  mounted() {
    console.log(this.preview)
    this.audio = new Audio(this.preview);
    this.audio.addEventListener('canplaythrough', () => {
      this.canplay = true;
    });
  },
  methods:{
    togglePlay() {
      if (this.playing) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.playing = !this.playing;
    }
  }
};
</script>
