<template>
  <svg
    class="progress"
    :class="{ 'progress--dark': dark }"
    :height="size"
    :width="size"
  >
    <circle
      class="progress__background"
      stroke="currentColor"
      fill="transparent"
      :stroke-width="stroke"
      :r="radius"
      :cx="origin"
      :cy="origin"
    />
    <circle
      class="progress__progress"
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
.progress {
  $root: &;
  display: block;

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
}
</style>
