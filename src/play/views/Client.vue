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
import Start from '../components/start';
import Player from '../components/player';

export default {
  name: 'Client',
  components: {
    Start,
    Player
  },
  computed: {
    ...mapState(['ready', 'name'])
  },
  created() {
    this.$store.dispatch("load");
  }
};
</script>
