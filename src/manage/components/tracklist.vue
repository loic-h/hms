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
      :selected="trackId === item.id || (selectPlaying && isPlaying(item.id))"
      @click="onItemClick(item)" />
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
    selectPlaying: { type: Boolean, default: false }
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      trackId: state => state.tracks.id
    }),
    ...mapGetters('audio', ['isPlaying'])
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
