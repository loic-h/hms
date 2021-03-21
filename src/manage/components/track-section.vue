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
      <button @click="reveal" class="track-section__reveal">
          <span class="material-icons">error_outline</span>
          <span class="link">Reveal</span>
        </button>
    </div>
    <play-button
      class="track-section__controls"
      :playing="isPlaying(selectedItem.id)"
      @play="play"
      @pause="pause" />
    <div class="track-section__infos">
      <h2 class="track-section__name h1">{{ selectedItem.name }}</h2>
      <div class="track-section__artist">{{ selectedItem.artist }}</div>
    </div>
    <track-section-user />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayButton from './play-button';
import TrackSectionUser from './track-section-user';

export default {
  name: 'TrackSection',
  components: {
    PlayButton,
    TrackSectionUser
  },
  computed: {
    ...mapGetters('tracks', ['selectedItem', 'totalAvailableItems', 'itemPosition']),
    ...mapGetters('player', ['isPlaying'])
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

  &__controls {

    button {
      @include icon(xl);
      cursor: pointer;
    }
  }

  &__name {
    margin-bottom: 0.5rem;
  }
}
</style>
