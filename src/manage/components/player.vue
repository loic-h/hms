<template>
  <div
    v-if="id"
    class="player">
    <div class="player__container container">
      <play-button
        class="player__controls"
        :playing="isPlaying(id)"
        @play="play(id)"
        @pause="pause" />
      <div class="player__infos">
        <div class="player__name h2">{{ track.name }}</div>
        <div class="player__artist">{{ track.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlayButton from './play-button';

export default {
  name: "Player",
  components: {
    PlayButton
  },
  computed: {
    ...mapState('player', ['id']),
    ...mapGetters('player', ['isPlaying', 'track']),
  },
  methods: {
    play() {
      this.$store.dispatch('games/play', this.id);
    },
    pause() {
      this.$store.dispatch('games/pause');
    }
  }
};
</script>

<style lang="scss">
.player {
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background-color: var(--black);
  color: var(--white);
  box-sizing: border-box;

  &__container {
    display: flex;
    align-items: center;
  }

  &__controls {
    margin-right: 1rem;

    button {
      @include icon(l);
      display: block;
      color: var(--white);
    }
  }

}
</style>
