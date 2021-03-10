<template>
  <page class="home container">
    <div class="home__logo cursored">
      <logo type="big" />
    </div>
    <tracklist
      v-if="tracks.length > 0"
      :controls="true" />
    <search v-else />
  </page>
</template>

<script>
import Page from '../../shared/components/page';
import Logo from '../../shared/components/logo';
import Search from '../components/search';
import Tracklist from '../components/tracklist';

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    Search,
    Tracklist
  },
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
    margin-bottom: 3rem;
  }
}
</style>
