<template>
  <div>
    <track-component
      v-for="item in items"
      :key="item.id"
      v-bind="item" />
  </div>
</template>

<script>
import TrackComponent from "./track";

export default {
  name: "Tracks",
  components: {
    TrackComponent
  },
  computed: {
    items() {
      return this.$store.state.tracks.items;
    }
  }
}
</script>
