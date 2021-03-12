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
      :selectPlaying="true" />
    <div class="playlist-preview__footer">
      <cta class="playlist-preview__cta" :href="`/create/${playlistId}`">
        Create
      </cta>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tracklist from './tracklist';
import Cta from '../../shared/components/cta';

export default {
  name: 'PlaylistPreview',
  components: {
    Tracklist,
    Cta
  },
  computed: {
    ...mapState({
      playlistId: state => state.playlists.id
    }),
    playlist() {
      console.log(this.playlistId)
      return this.$store.state.playlists.items.find(a => a.id === this.playlistId);
    }
  },
  beforeUnmount() {
    this.$store.dispatch('audio/stop');
  },
  methods: {
    back() {
      this.$store.dispatch('tracks/reset');
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
