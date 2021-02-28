<template>
  <template v-if="ready">
    <player />
  </template>
  <template v-else>
    <start />
  </template>
</template>

<script>
import Start from '../components/client/start';
import Player from '../components/client/player';
import { unsubscribe } from "../services/pusher";

export default {
  name: 'Client',
  components: {
    Start,
    Player
  },
  computed: {
    ready() {
      return !! this.$store.state.client.name;
    }
  },
  beforeUnmount() {
    unsubscribe(this.$store.getters.server.playlists.id);
  }
};
</script>
