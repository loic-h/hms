<template>
  <div class="play-button">
    <button @click="$emit('pause')" class="material-icons" v-if="playing">{{ pauseSprite }}</button>
    <button @click="$emit('play')" class="material-icons" v-else>{{ playSprite }}</button>
  </div>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    playing: { type: Boolean, default: false },
    circle: { type: Boolean, default: true }
  },
  computed: {
    playSprite() {
      return this.circle ? 'play_circle_outline' : 'play_arrow';
    },
    pauseSprite() {
      return this.circle ? 'pause_circle_outline' : 'pause';
    }
  }
};
</script>

<style lang="scss">
.play-button {

  button {
    display: block;
  }
}
</style>
