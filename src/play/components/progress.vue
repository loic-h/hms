<template>
  <svg
    class="progress"
    :height="size"
    :width="size"
  >
    <circle
      class="progress__background"
      stroke="currentColor"
      fill="transparent"
      :stroke-width="stroke"
      :r="normalizedRadius"
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
      :r="normalizedRadius"
      :cx="origin"
      :cy="origin"
    />
  </svg>
</template>

<script>
export default {
  props: {
    radius: { type: Number, default: 60 },
    progress: { type: Number, default: 0 },
    stroke: { Number, default: 12 }
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - this.progress / 100 * this.circumference;
    },
    normalizedRadius() {
      return this.radius - this.stroke * 2
    },
    circumference() {
      return this.normalizedRadius * 2 * Math.PI
    },
    size() {
      return this.radius + (this.stroke * 2);
    },
    origin() {
      return this.size * 0.5;
    }
  }
}
</script>

<style lang="scss">
.progress {

  &__progress {
    transition: stroke-dashoffset 0.1s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    color: var(--black);
  }

  &__background {
    color: var(--grey-pale);
  }
}
</style>
