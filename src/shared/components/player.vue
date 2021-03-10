<template>
  <audio ref="audio" :src="src" />
</template>

<script>
export default {
  name: "Player",
  props: {
    src: { type: String, default: null }
  }
};
</script>
