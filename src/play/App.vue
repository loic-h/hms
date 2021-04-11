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
    if (this.token) {
      this.$store.dispatch('spotify/token', this.token);
    }
  }
}
</script>
