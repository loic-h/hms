<template>
  <form @submit="onSubmit">
    <label for="name">Name</label>
    <input type="text" name="name" />
    <button>
      Start
    </button>
  </form>
</template>

<script>
export default {
  name: "Start",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch("client/name", e.target.elements.name.value)
    }
  }
};
</script>
