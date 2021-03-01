<template>
  <template v-if="ready">
    <h3>{{ name }}</h3>
    <player />
  </template>
  <template v-else>
    <start />
  </template>
</template>

<script>
import { mapState } from 'vuex';
import Start from '../components/client/start';
import Player from '../components/client/player';

export default {
  name: 'Client',
  components: {
    Start,
    Player
  },
  computed: {
    ...mapState('client', ['ready', 'name'])
  },
  created() {
    this.$store.dispatch("client/load");
  }
};
</script>
