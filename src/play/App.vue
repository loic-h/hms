<template>
  <router-view/>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState('spotify', ['token'])
  },
  mounted() {
    if (token) {
      this.$store.dispatch('spotify/token', token);
    }
  }
}
</script>
