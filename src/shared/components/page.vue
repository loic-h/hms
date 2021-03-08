<template>
  <div class="page container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Page"
}
</script>

<style>
.page {
  flex-grow: 1;
  padding-top: var(--container-padding-s);
  padding-bottom: var(--container-padding-s);
}
</style>
