<template>
  <div class="progress-play-button" :style="{ width: `${size}px`, height: `${size}px` }">
    <progress-component :size="size" :progress="progress" :stroke="stroke" :dark="dark" />
    <play-button
      class="progress-play-button__buttons"
      :circle="false"
      :playing="playing"
      @play="$emit('play')"
      @pause="$emit('pause')" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProgressComponent from '../../shared/components/progress';
import PlayButton from './play-button';

export default {
  name: 'ProgressPlayButton',

  components: {
    ProgressComponent,
    PlayButton
  },

  props: {
    playing: { type: Boolean, default: false },
    size: { type: Number, default: 120 },
    stroke: { type: Number, default: 12 },
    dark: { type: Boolean, default: false }
  },

  computed: {
    ...mapGetters('audio', ['progress']),

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
.progress-play-button {
  position: relative;

  &__buttons {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }
}
</style>
