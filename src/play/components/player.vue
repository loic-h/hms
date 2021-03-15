<template>
  <div class="player">
    <progress-component :radius="120" :progress="progress" :stroke="24" />
    <div class="player__status">
      <template v-if="playing">
        Playing
      </template>
      <template v-else>
        Waiting
      </template>
    </div>
  </div>
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
      listen('play', ({ id, src, currentTime, position }) => {
        this.$store.dispatch('audio/play', { src, currentTime });
        this.$store.commit('track/id', id);
        this.$store.commit('track/src', src);
        this.$store.commit('track/position', position)
      });

      listen('pause', () => {
        this.$store.dispatch('audio/pause');
      });
    }
  }
}
</script>

<style lang="scss">
.player {
  position: relative;

  &__status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
