<template>
  <div class="player">
    <div class="player__container container">
      <play-button
        class="player__controls"
        :playing="isPlaying(id)"
        @play="play(id)"
        @pause="pause" />
      <div class="player__infos">
        <router-link :to="url">
          <div class="player__name">{{ name }}</div>
          <div class="player__artist">{{ artist }}</div>
        </router-link>
      </div>
      <button
        v-if="nextTrack"
        @click="$store.dispatch('player/next')"
        class="material-icons">skip_next</button>
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
    ...mapState({
      trackId: state => {
        return state.player.id || state.tracks.id
      }
    }),
    ...mapGetters('player', ['isPlaying', 'nextTrack']),
    ...mapGetters('tracks', {
      trackById: 'itemById'
    }),
    ...mapGetters('games', ['trackUrl']),
    name() {
      return this.track ? this.track.name : '-';
    },
    artist() {
      return this.track ? this.track.artist : '-';
    },
    track() {
      return this.trackById(this.trackId)
    },
    url() {
      return this.trackUrl(this.trackId);
    }
  },
  methods: {
    play() {
      this.$store.dispatch('player/play', this.trackId);
    },
    pause() {
      this.$store.dispatch('player/pause');
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
  font-size: 0.8rem;

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

  &__infos {
    flex-grow: 1;
  }

  &__name {
    font-weight: 900;
  }

  a {
    text-decoration: none;
  }
}
</style>
