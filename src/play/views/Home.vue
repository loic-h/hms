<template>
  <page class="home container">
    <playboard v-if="ready" />
    <start v-else />
  </page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '../../shared/components/page';
import Start from '../components/start';
import Playboard from '../components/playboard';

export default {
  name: 'Client',
  components: {
    Page,
    Start,
    Playboard
  },
  computed: {
    ...mapState('user', ['ready', 'name'])
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
