<template>
  <div class="login">
    <h1>Game</h1>
    <span>{{ gameUrl }}</span>
    <tracks />
  </div>
</template>

<script>
import Tracks from "../components/tracks";

export default {
  name: 'Game',
  components: {
    Tracks
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
    gameUrl() {
      return new URL(`/play/${this.gameId}`, window.location.origin).toString();
    }
  }
}
</script>
