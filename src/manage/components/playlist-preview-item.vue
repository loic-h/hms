<template>
  <div
    class="playlist-preview-item"
    :class="{
      'playlist-preview-item--disabled': !preview,
      'playlist-preview-item--playing': isPlaying(preview)
    }">
    <div class="playlist-preview-item__infos">
      <h3>{{ name }}</h3>
      <span>{{ artist }}</span>
    </div>
    <div class="playlist-preview-item__controls">
      <template v-if="preview">
        <button @click="pause(preview)" class="material-icons" v-if="isPlaying(preview)">pause_circle_filled</button>
        <button @click="play(preview)" class="material-icons" v-else>play_circle_filled</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlaylistPreviewItem',
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null },
    artist: { type: String, default: null },
    preview: { type: String, default: null }
  },
  computed: {
    ...mapGetters('audio', ['isPlaying'])
  },
  methods: {
    onBackClick() {
      this.$store.dispatch('resetTracks');
    },
    play(url) {
      this.$store.dispatch('audio/play', url);
    },
    pause() {
      this.$store.dispatch('audio/pause');
    }
  }
}
</script>

<style lang='scss'>
.playlist-preview-item {
  $root: &;

  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);

  &__infos {
    flex-grow: 1;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  span {
    font-size: 1rem;
  }

  &__controls {
    margin-left: 1rem;
    color: var(--grey-light);
  }

  &:hover:not(&--disabled):not(&--playing) {
    background-color: var(--grey-pale);

    #{$root}__controls {
      color: var(--black);
    }
  }

  &--disabled {
    color: var(--grey-light);
    text-decoration: line-through;
  }

  &--playing {
    background-color: var(--black);
    color: var(--white);

    #{$root}__controls {
      color: var(--white);
    }
  }

  button {
    color: inherit;
  }
}
</style>
