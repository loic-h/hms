<template>
  <div class="play-button">
    <button @click="$emit('pause')" class="material-icons" v-if="playing">pause_circle_outline</button>
    <button @click="$emit('play')" class="material-icons" v-else>play_circle_outline</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayButton',
  computed: {
    ...mapGetters('audio', ['isPlaying'])
  },
  props: {
    playing: { type: Boolean, default: false }
  }
};
</script>
