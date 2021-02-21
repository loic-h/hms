<template>
  <div class="login">
    <h1>Game</h1>
    <span>{{ gameUrl }}</span>
  </div>
</template>

<script>
export default {
  name: 'Game',
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
