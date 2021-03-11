<template>
  <tracklist
    :controls="true"
    :selectPlaying="true" />
  <div class="playlist-preview__footer">
    <cta class="playlist-preview__cta" :href="`/create/${playlistId}`">
      Create
    </cta>
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
  },
  beforeUnmount() {
    this.$store.dispatch('audio/stop');
  }
}
</script>

<style lang="scss">
.playlist-preview {

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
