<template>
  <div class="login">
    <h1>Manage the game</h1>
    <p>Share link: <a :href="gameUrl">{{ gameUrl }}</a></p>
    <tracks />
  </div>
</template>

<script>
import Tracks from "../components/tracks";
import { unsubscribe } from "../services/pusher";

export default {
  name: 'Admin',
  components: {
    Tracks
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
    gameUrl() {
      return new URL(`/game/${this.gameId}`, window.location.origin).toString();
    }
  },
  mounted() {
    this.$store.dispatch("server/room", this.$route.params.id);
  },
  beforeUnmount() {
    unsubscribe(this.$store.getters.server.playlists.id);
  }
}
</script>
