<template>
  <router-view/>
</template>

<script>
import { mapState } from 'vuex';
import { connect } from '../services/spotify';

export default {
  name: 'App',
  computed: {
    ...mapState('spotify', ['token'])
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'Admin') {
        const id = to.params.trackId || this.$store.getters['tracks/firstAvailableItemId'];
        this.$store.commit('tracks/id', id);
      }
    },
    token: {
      async handler(v) {
        try {
          await this.$store.dispatch('spotify/token', v);
        } catch {
          console.log(this.$router)
          console.log(this.$route)
          if (this.$route.name === 'Admin') {
            connect();
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>
