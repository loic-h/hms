<template>
  <div class="tracklist">
    <tracklist-item
      v-for="item in tracks"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :artist="item.artist"
      :preview="item.preview"
      :controls="controls"
      :selected="trackId === item.id || (selectPlaying && playingItemId === item.id)"
      :is-playing="item.id === playingItemId"
      @click="onItemClick(item)"
      @play="$emit('play', item)"
      @pause="$emit('pause', item)" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TracklistItem from "./tracklist-item";

export default {
  name: "Tracks",
  components: {
    TracklistItem
  },
  props: {
    controls: { type: Boolean, default: false },
    playingItemId: { type: String, default: null },
    selectPlaying: { type: Boolean, default: false }
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      trackId: state => state.tracks.id
    })
  },
  methods: {
    onItemClick(item) {
      if (!item.preview) {
        return;
      }
      this.$emit('item-click', item.id);
    }
  }
}
</script>
