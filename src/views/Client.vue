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
import socket from '../services/socket';

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
  mounted() {
    socket.emit("room:join", this.$route.params.id);
  }
};
</script>
