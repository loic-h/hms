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
      <cta class="playlist-preview__cta" :block="true" :to="`/create/${playlist.id}?connected=${connectedGame}`">
        Create
      </cta>
      <input-checkbox
        v-if="connected"
        class="playlist-preview__connected"
        v-model="connectedGame">
        Players have a spotify account
      </input-checkbox>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Tracklist from './tracklist';
import Cta from '../../shared/components/cta';
import InputCheckbox from '../../shared/components/input-checkbox';

export default {
  name: 'PlaylistPreview',
  components: {
    Tracklist,
    Cta,
    InputCheckbox
  },
  data() {
    return {
      connectedGame: false
    };
  },
  computed: {
    ...mapGetters('playlists', {
      playlist: 'current'
    }),
    ...mapGetters('tracks', ['playingItemId']),
    ...mapGetters('spotify', ['connected'])
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
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__connected {
    padding-top: 0.5rem;
  }
}
</style>
