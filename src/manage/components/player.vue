<template>
  <div class="player">
    <div class="player__container container">
      <div class="player__controls">
        <progress-component :size="40" :progress="progress" :stroke="4" :dark="true" />
        <play-button
          class="player__play"
          :playing="isPlaying(id)"
          :circle="false"
          @play="play(id)"
          @pause="pause" />
      </div>
      <div class="player__infos">
        <div @click="onInfosClick">
          <div class="player__name">{{ name }}</div>
          <div class="player__artist">{{ artist }}</div>
        </div>
      </div>
      <button
        v-if="nextTrack"
        @click="goNext"
        class="material-icons">skip_next</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlayButton from './play-button';
import ProgressComponent from '../../shared/components/progress';

export default {
  name: "Player",

  components: {
    PlayButton,
    ProgressComponent
  },

  emits: ['show-track-section'],

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
    ...mapGetters('audio', ['progress']),
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
    },
    goNext() {
      this.$store.dispatch('player/next');
    }
  },

  methods: {
    play() {
      this.$store.dispatch('player/play', this.trackId);
    },
    pause() {
      this.$store.dispatch('player/pause');
    },
    onInfosClick() {
      console.log(this.url)
      this.$router.push(this.url);
      this.$emit('show-track-section');
    }
  }
};
</script>

<style lang="scss">
.player {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: var(--black);
  color: var(--white);
  box-sizing: border-box;
  font-size: 0.8rem;

  &__container {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &__controls {
    position: relative;
    margin-right: 1rem;
  }

  &__play {
    @include icon(s);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    color: var(--white);
  }

  &__infos {
    flex-grow: 1;
    margin-right: 1rem;
    overflow: hidden;
    cursor: pointer;

    > div {
      display: block;
    }
  }

  &__name {
    font-weight: 900;
  }

  &__name,
  &__artist {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }
}
</style>
