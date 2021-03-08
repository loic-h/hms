<template>
  <page class="home container">
    <logo class="home__logo" />
    <h1 class="home__headline h1 cursored">
      {{ $options.title }}
    </h1>
    <search />
    <ul v-if="tracks.length > 0">
      <li
        v-for="item in tracks"
        :key="item.id">
        {{ item.artists.join(', ') }} – {{ item.name }}
      </li>
    </ul>
    <router-link
      v-if="playlistId"
      :to="`/manage/${playlistId}`">
      Create
    </router-link>
  </page>
</template>

<script>
import Page from '../../shared/components/page';
import Logo from '../../shared/components/logo';
import Search from '../components/search';
import globals from '../../utils/globals';

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    Search
  },
  title: globals.title,
  computed: {
    tracks() {
      return this.$store.state.tracks.items
    },
    playlistId() {
      return this.$store.state.playlists.id
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
  padding-bottom: 6rem;

  &__logo {
    @include icon(l);
    margin-bottom: 1rem;

    @include media(min-width, m) {
      @include icon(xl);
    }
  }

  &__headline {
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
