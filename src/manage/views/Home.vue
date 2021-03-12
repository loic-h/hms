<template>
  <page class="home container">
    <div class="home__logo cursored">
      <logo type="big" />
    </div>
    <playlist-preview
      v-if="tracks.length > 0"/>
    <template v-else>
      <search @input="value => searchValue = value" />
      <template v-if="!query">
        <div>
          <button
            class="home__create"
            v-if="searchValue && searchValue !== ''"
            @click="createFromPlaylist">
            Create from playlist ID
          </button>
        </div>
      </template>
    </template>

  </page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '../../shared/components/page';
import Logo from '../../shared/components/logo';
import Search from '../components/search';
import PlaylistPreview from '../components/playlist-preview';

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    Search,
    PlaylistPreview
  },
  data() {
    return {
      searchValue: null
    };
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      query: state => state.playlists.query
    })
  },
  methods: {
    createFromPlaylist() {
      this.$store.dispatch('playlist', { id: this.searchValue });
    }
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__create {
    margin-top: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }

  &__logo {
    margin-bottom: 3rem;
  }
}
</style>
