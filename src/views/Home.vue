<template>
  <div class="home">
    <h1>Create a game</h1>
    <search />
    <tracks />
  </div>
</template>

<script>
import Search from "../components/search";
import Tracks from "../components/tracks";

export default {
  name: 'Home',
  components: {
    Search,
    Tracks
  }
}
</script>
