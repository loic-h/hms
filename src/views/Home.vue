<template>
  <div class="home">
    <h1>Create a game</h1>
    <search />
    <h3>
      Tracks
    </h3>
    <ul v-if="tracks.length > 0">
      <li
        v-for="item in tracks"
        :key="item.id">
        {{ item.artists.join(', ') }} – {{ item.name }}
      </li>
    </ul>
    <router-link
      v-if="playlistId"
      :to="`/game/${playlistId}/admin`">
      Create
    </router-link>
  </div>
</template>

<script>
import Search from "../components/search";

export default {
  name: 'Home',
  components: {
    Search
  },
  computed: {
    tracks() {
      return this.$store.state.server.tracks.items
    },
    playlistId() {
      return this.$store.state.server.playlists.id
    }
  }
};
</script>
