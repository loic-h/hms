<template>
  <div class="playlist-preview">
    <div class="playlist-preview__header">
      <button @click="onBackClick" class="material-icons">arrow_back</button>
      <h1 class="h1">{{ playlistName }}</h1>
    </div>
    <playlist-preview-item
      v-for="item in tracks"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :artist="item.artist"
      :preview="item.preview" />
  </div>
  <div class="playlist-preview__footer">
    <cta
      class="playlist-preview__cta"
      v-if="playlistId"
      :href="`/manage/${playlistId}`">
      Create
    </cta>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlaylistPreviewItem from './playlist-preview-item';
import Cta from '../../shared/components/cta';

export default {
  name: 'PlaylistPreview',
  components: {
    PlaylistPreviewItem,
    Cta
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      playlistName: state => state.playlists.name,
      playlistId: state => state.playlists.id
    })
  },
  methods: {
    onBackClick() {
      this.$store.dispatch('resetTracks');
    }
  }
}
</script>

<style lang='scss'>
.playlist-preview {
  $root: &;

  max-width: 35rem;
  width: 100%;

  &__header {
    display: flex;
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      flex-grow: 1;
    }

    button {
      flex-basis: 1.5rem;
      margin-right: 1rem;
    }

    &:after {
      content: "";
      flex-basis: 1.5rem;
      margin-left: 1rem;
    }
  }

  &__footer {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    background-color: var(--white);
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
  }
}
</style>
