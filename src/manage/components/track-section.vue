<template>
  <div class="track-section" v-if="selectedItem">
    <div class="track-section__header">
      <div class="track-section__position">
        <span class="material-icons track-section__position-icon">speaker</span>
        <div>
          <span class="track-section__number h1">
            {{ itemPosition(selectedItem.id) }}
          </span>
          <span class="track-section__total">
            {{ totalAvailableItems }}
          </span>
        </div>
      </div>
      <button
        v-if="selectedItem.id === currentPlayerTrackId"
        @click="reveal"
        class="track-section__reveal">
          <span class="material-icons">{{ revealIcon }}</span>
          <span class="link">Reveal</span>
        </button>
    </div>
    <div class="track-section__content">
      <progress-play-button
        class="track-section__play"
        :playing="isCurrentPlaying"
        :size="120"
        :stroke="12"
        @play="play"
        @pause="pause" />
      <div class="track-section__infos">
        <h2 class="track-section__name h1">{{ selectedItem.name }}</h2>
        <div class="track-section__artist">{{ selectedItem.artist }}</div>
      </div>
      <track-section-user class="track-section__users" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ProgressPlayButton from './progress-play-button';
import TrackSectionUser from './track-section-user';

export default {
  name: 'TrackSection',

  components: {
    ProgressPlayButton,
    TrackSectionUser
  },

  data() {
    return {
      revealed: false
    };
  },

  computed: {
    ...mapGetters('tracks', ['selectedItem', 'totalAvailableItems', 'itemPosition']),
    ...mapGetters('player', ['isPlaying']),
    ...mapState('player', {
      currentPlayerTrackId: state => state.id
    }),

    isCurrentPlaying() {
      return this.isPlaying(this.selectedItem.id);
    },

    revealIcon() {
      return this.revealed ? 'check' : 'error_outline';
    }
  },

  methods: {
    play() {
      this.$store.dispatch('player/play', this.selectedItem.id);
    },
    pause() {
      this.$store.dispatch('player/pause');
    },
    reveal() {
      this.$store.dispatch('tracks/reveal');
      this.revealed = true;
      setTimeout(() => this.revealed = false, 1000);
    }
  }
}
</script>

<style lang="scss">
.track-section {

  &__header {
    display: flex;
  }

  &__position {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  &__position-icon {
    margin-right: 0.25rem;
  }

  &__number {

    &:before {
      content: '# ';
    }
  }

  &__total {

    &:before {
      content: ' / ';
    }
  }

  &__reveal {
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      display: block;

      &:last-child {
        margin-left: 0.25rem;
        font-weight: 600;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__play {
    margin-bottom: 1rem;

    button {
      @include icon(xl);
      cursor: pointer;
    }
  }

  &__infos {
    text-align: center;
  }

  &__name {
    margin-bottom: 0.5rem;
  }

  &__users {
    width: 100%;
  }
}
</style>
