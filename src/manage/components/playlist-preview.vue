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
      :connected-game="connectedGame"
      @play="onTrackPlay"
      @pause="onTrackPause" />
    <div class="playlist-preview__footer">
      <cta class="playlist-preview__cta" :block="true" :to="createUrl">
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
    ...mapState('audio', ['playingId']),
    ...mapGetters('audio', ['isPlaying']),
    ...mapGetters('playlists', {
      playlist: 'current'
    }),
    ...mapGetters('spotify', ['connected']),

    playingItemId() {
      if (this.playingId && this.isPlaying(this.playingId, this.connectedGame)) {
        return this.playingId;
      }
    },

    createUrl() {
      let url = `/create/${this.playlist.id}`;
      if (this.connectedGame) {
        url += `?connected=${this.connectedGame ? 1 : 0}`
      }
      return url;
    }
  },
  beforeUnmount() {
    this.$store.dispatch('audio/stop'), { connected: this.connectedGame };
  },
  watch: {
    connectedGame(v) {
      if (v) {
        this.$store.dispatch('spotify/loadPlayer');
      }
    }
  },
  methods: {
    back() {
      this.$store.dispatch('tracks/reset');
    },
    onTrackPlay(item) {
      this.$store.dispatch('audio/play', { ...item, connected: this.connectedGame });
    },
    onTrackPause(item) {
      this.$store.dispatch('audio/pause', { connected: this.connectedGame });
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
