<template>
  <component :is="component"
    class="cta"
    :class="{
      'cta--block': block
    }"
    :to="to"
    :href="href">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Cta",
  props: {
    href: { type: String, default: null },
    to: { type: String, default: null },
    block: { type: Boolean, default: false }
  },
  computed: {
    component() {
      if (this.to) {
        return 'router-link';
      }
      if (this.href) {
        return 'a';
      }
      return 'button';
    }
  }
}
</script>

<style lang="scss">
.cta {
  border-radius: var(--border-radius);
  border: solid 1px var(--black);
  padding: 1rem;
  // max-width: 18rem;
  // width: 100%;
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: var(--white);
    color: var(--black);
  }

  &--block {
    width: 100%;
    max-width: 15rem;
  }
}
</style>
