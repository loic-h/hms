<template>
  <page class="home container">
    <div class="home__header">
      <user
        v-if="name"
        :name="name"
        class="home__user" />
      <cta
        v-else
        :href="$options.authorize">Connect</cta>
    </div>

    <div class="home__body">
      <a class="home__logo cursored" href="/">
        <logo type="big" />
      </a>

      <playlist-preview
        v-if="tracks.length > 0"/>

      <template v-else>

        <search />

        <template v-if="playlists.length <= 0">
          <button
            v-if="name"
            class="home__my-playlists link"
            @click="myPlaylists">
            My playlists
          </button>

          <games class="home__games" />
        </template>
      </template>
    </div>
  </page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '../../shared/components/page';
import Logo from '../../shared/components/logo';
import Search from '../components/search';
import Games from '../components/games';
import PlaylistPreview from '../components/playlist-preview';
import Cta from '../../shared/components/cta';
import User from '../../shared/components/user';
import { authorizeEndpoint } from "../../services/spotify";

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    Search,
    PlaylistPreview,
    Games,
    Cta,
    User
  },
  authorize: authorizeEndpoint,
  data() {
    return {
      searchValue: null
    };
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      query: state => state.playlists.query,
      games: state => state.games.items,
      name: state => state.spotify.name,
      playlists: state => state.playlists.items
    })
  },
  methods: {
    myPlaylists() {
      this.$store.dispatch('spotify/playlists');
    }
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__body {
    padding-top: 20vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__create {
    margin-top: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }

  &__logo {
    margin-bottom: 3rem;
    text-decoration: none;
  }

  &__my-playlists {
    padding-top: 1rem;
  }

  &__games {
    margin-top: 2rem;
  }
}
</style>
