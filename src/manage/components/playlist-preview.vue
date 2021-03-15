<template>
  <div class="playlist-preview" v-if="playlist">
    <div class="playlist-preview__header">
      <button
        @click="back"
        class="material-icons">
        arrow_back
      </button>
      <h2 class="h1">
        {{ playlist.name }}
      </h2>
    </div>
    <tracklist
      :controls="true"
      :selectPlaying="true"
      :playing-item-id="playingItemId"
      @play="onTrackPlay"
      @pause="onTrackPause" />
    <div class="playlist-preview__footer">
      <cta class="playlist-preview__cta" :href="`/create/${playlist.id}`">
        Create
      </cta>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tracklist from './tracklist';
import Cta from '../../shared/components/cta';

export default {
  name: 'PlaylistPreview',
  components: {
    Tracklist,
    Cta
  },
  computed: {
    ...mapGetters('playlists', {
      playlist: 'current'
    }),
    ...mapGetters('tracks', ['playingItemId'])
  },
  beforeUnmount() {
    this.$store.dispatch('audio/stop');
  },
  methods: {
    back() {
      this.$store.dispatch('tracks/reset');
    },
    onTrackPlay(item) {
      this.$store.dispatch('audio/play', { src: item.preview });
    },
    onTrackPause(item) {
      this.$store.dispatch('audio/pause');
    }
  }
}
</script>

<style lang="scss">
.playlist-preview {
  width: 100%;

  &__header {
    display: flex;

    &:after {
      content: '';
      flex-basis: 1.5rem;
    }

    button {
      flex-basis: 1.5rem;
    }

    h2 {
      flex-grow: 1;
      text-align: center;
      padding: 0.5rem;
    }
  }

  &__footer {
    background-color: var(--white);
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
