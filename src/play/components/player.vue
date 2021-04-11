<template>
  <div class="player">
    <circle-progress :size="160" :progress="progress" :stroke="16">
      <div class="player__status">
        <template v-if="playing">
          Playing
        </template>
        <template v-else>
          Waiting
        </template>
      </div>
    </circle-progress>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { listen } from '../../services/pusher';
import CircleProgress from '../../shared/components/circle-progress';

export default {
  name: "Player",
  components: {
    CircleProgress
  },
  mounted() {
    this.initAudio();
  },
  computed: {
    ...mapState('audio', ['playing']),
    ...mapGetters('audio', ['progress']),
    ...mapState('game', ['connected'])
  },
  methods: {
    initAudio() {
      if (this.connected) {
        this.$store.dispatch('spotify/loadPlayer');
      }

      listen('play', ({ id, preview, uri, currentTime, position }) => {
        this.$store.dispatch('audio/play', { id, preview, uri, currentTime, connected: this.connected });
        this.$store.commit('track/id', id);
        this.$store.commit('track/src', preview);
        this.$store.commit('track/position', position)
      });

      listen('pause', () => {
        this.$store.dispatch('audio/pause', { connected: this.connected });
      });
    }
  },
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
