<template>
  <div class="user">
    <div class="material-icons">face</div>
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    name: { type: String, default: null }
  }
}
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;

  div {
    margin-right: 0.5rem;
  }
}
</style>
