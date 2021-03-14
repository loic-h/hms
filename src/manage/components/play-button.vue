<template>
  <div class="play-button">
    <button @click="$emit('pause')" class="material-icons" v-if="playing">pause_circle_outline</button>
    <button @click="$emit('play')" class="material-icons" v-else>play_circle_outline</button>
  </div>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    playing: { type: Boolean, default: false }
  }
};
</script>
