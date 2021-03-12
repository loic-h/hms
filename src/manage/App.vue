<template>
  <router-view/>
</template>

<script>
export default {
  watch: {
    '$route' (to, from) {
      if(to.name === 'Admin') {
        const id = to.params.trackId || this.$store.getters['tracks/firstAvailableItemId'];
        this.$store.commit('tracks/id', id);
      }
    }
  }
}
</script>

<style>
#app {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
