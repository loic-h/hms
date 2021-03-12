<template>
  <component :is="component"
    class="cta"
    :to="href">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Cta",
  props: {
    href: { type: String, default: null }
  },
  computed: {
    component() {
      if (this.href) {
        return 'router-link';
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
  width: 100%;
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: var(--white);
    color: var(--black);
  }
}
</style>
