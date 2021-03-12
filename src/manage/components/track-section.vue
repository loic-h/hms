<template>
  <div class="track-section" v-if="selectedItem">
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
    <play-button
      class="track-section__controls"
      :playing="isPlaying(selectedItem.id)"
      @play="play"
      @pause="pause" />
    <div class="track-section__infos">
      <h2 class="track-section__name h1">{{ selectedItem.name }}</h2>
      <div class="track-section__artist">{{ selectedItem.artist }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayButton from './play-button';

export default {
  name: 'TrackSection',
  components: {
    PlayButton
  },
  computed: {
    ...mapGetters('tracks', ['selectedItem', 'totalAvailableItems', 'itemPosition']),
    ...mapGetters('audio', ['isPlaying'])
  },
  methods: {
    play() {
      this.$store.dispatch('games/play', this.selectedItem.id);
    },
    pause() {
      this.$store.dispatch('games/pause');
    }
  }
}
</script>

<style lang="scss">
.track-section {

  &__position {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
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
