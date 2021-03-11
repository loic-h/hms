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
      :selected="trackId === item.id"
      @click="onItemClick(item.id)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TracklistItem from "./tracklist-item";

export default {
  name: "Tracks",
  components: {
    TracklistItem
  },
  props: {
    controls: { type: Boolean, default: false }
  },
  computed: {
    ...mapState({
      tracks: state => state.tracks.items,
      trackId: state => state.tracks.id
    })
  },
  methods: {
    onItemClick(id) {
      this.$emit('item-click', id);
    }
  }
}
</script>

<style lang="scss">
.tracklist {
  max-width: 30rem;
}
</style>
