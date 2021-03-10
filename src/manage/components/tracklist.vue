<template>
  <div class="tracklist">
    <tracklist-item
      v-for="item in tracks"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :artist="item.artist"
      :preview="item.preview"
      :controls="controls" />
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
      tracks: state => state.tracks.items
    })
  },
}
</script>

<style lang="scss">
.tracklist {
  max-width: 30rem;
}
</style>
