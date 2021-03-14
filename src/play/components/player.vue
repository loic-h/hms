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
import { mapState } from 'vuex';
import { listen } from '../../services/pusher';
import ProgressComponent from './progress';

export default {
  name: "Player",
  components: {
    ProgressComponent
  },
  mounted() {
    this.initAudio();
  },
  computed: {
    ...mapState('audio', ['playing'])
  },
  methods: {
    initAudio() {
      listen("play", ({ url }) => {
        console.log('play', url)
        this.$store.dispatch('audio/play', url);
      });

      listen("pause", () => {
        this.$store.dispatch('audio/play');
      });
    }
  }
}
</script>
