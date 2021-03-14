<template>
  <progress-component :radius="120" :progress="progress" :stroke="24" />
  <template v-if="playing">
    Playing
  </template>
  <template v-else>
    Waiting
  </template>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    ...mapState('audio', ['playing']),
    ...mapGetters('audio', ['progress'])
  },
  methods: {
    initAudio() {
      listen("play", (payload) => {
        this.$store.dispatch('audio/play', payload);
      });

      listen("pause", () => {
        this.$store.dispatch('audio/pause');
      });
    }
  }
}
</script>
