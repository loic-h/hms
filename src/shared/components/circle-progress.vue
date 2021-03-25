<template>
  <div
    class="circle-progress"
    :class="{ 'circle-progress--dark': dark }"
    :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="circle-progress__sprite">
      <circle
        class="circle-progress__background"
        stroke="currentColor"
        fill="transparent"
        :stroke-width="stroke"
        :r="radius"
        :cx="origin"
        :cy="origin"
      />
      <circle
        class="circle-progress__progress"
        stroke="currentColor"
        :stroke-dasharray="circumference + ' ' + circumference"
        fill="transparent"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="radius"
        :cx="origin"
        :cy="origin"
      />
    </svg>
    <div
      class="circle-progress__content"
      :style="{ padding: stroke }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: { type: Number, default: 120 },
    progress: { type: Number, default: 0 },
    stroke: { Number, default: 12 },
    dark: { type: Boolean, default: false }
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - this.progress / 100 * this.circumference;
    },
    circumference() {
      return this.radius * 2 * Math.PI
    },
    radius() {
      return (this.size - (this.stroke * 2)) / 2;
    },
    origin() {
      return this.size * 0.5;
    }
  }
}
</script>

<style lang="scss">
.circle-progress {
  $root: &;
  display: flex;
  position: relative;

  &__sprite {
    width: 100%;
    height: 100%;
  }

  &__progress {
    transition: stroke-dashoffset 0.1s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    color: var(--black);
  }

  &__background {
    color: var(--grey-pale);
  }

  &--dark {
    #{$root}__progress {
      color: var(--white);
    }

    #{$root}__background {
      color: var(--grey);
    }
  }

  &__content {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }


}
</style>
