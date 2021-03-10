<template>
  <page class="home container">
    <logo class="home__logo" />
    <h1 class="home__headline h1 cursored">
      {{ $options.title }}
    </h1>
    <playlist-preview v-if="tracks.length > 0" />
    <search v-else />
  </page>
</template>

<script>
import Page from '../../shared/components/page';
import Logo from '../../shared/components/logo';
import Search from '../components/search';
import PlaylistPreview from '../components/playlist-preview';
import globals from '../../utils/globals';

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    Search,
    PlaylistPreview
  },
  title: globals.title,
  computed: {
    tracks() {
      return this.$store.state.tracks.items
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
