<template>
  <form @submit="onSubmit">
    <label for="name">Name</label>
    <input type="text" name="name" :value="name" />
    <button>
      Start
    </button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Start",
  computed: {
    ...mapState('client', ['name'])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const name = e.target.elements.name.value;
      this.$store.dispatch("client/ready", { name });
    }
  }
};
</script>
