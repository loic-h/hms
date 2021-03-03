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
import debounce from "../../utils/debounce";

export default {
  computed: {
    items() {
      return this.$store.state.playlists.items;
    }
  },
  methods: {
    onPlaylistInput: debounce(function (event) {
      this.$store.dispatch("search", event.target.value);
    }, 500),
    selectPlaylist(id) {
      this.$store.dispatch("playlist", id);
    }
  }
};
</script>
