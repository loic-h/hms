<template>
  <label for="playlist">
    Search for a playlist on spotify
  </label>
  <input type="text" @input="onPlaylistInput" />
  <ul v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.id"
      @click="selectPlaylist(item.id)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.server.playlists.items;
    }
  },
  methods: {
    onPlaylistInput(event) {
      this.$store.dispatch("server/search", event.target.value);
    },
    selectPlaylist(id) {
      this.$store.dispatch("server/playlist", id);
    }
  }
};
</script>
