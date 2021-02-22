<template>
  <div class="login">
    <h1>Manage the game</h1>
    <p>Share link: <a :href="gameUrl">{{ gameUrl }}</a></p>
    <tracks />
  </div>
</template>

<script>
import Tracks from "../components/tracks";

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
  }
}
</script>
