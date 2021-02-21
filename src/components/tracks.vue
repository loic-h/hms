<template>
  <h3>
    Tracks
  </h3>
  <ul v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.id">
      {{ item.artists.join(', ')}} – {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tracks",
  computed: {
    items() {
      return this.$store.state.tracks.items
    }
  }
}
</script>
