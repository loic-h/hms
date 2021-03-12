<template>
  <input
    class="input-text"
    type="text"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput" />
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: { type: String, default: ''},
    placeholder: { type: String, default: null},
    disabled: { type: String, default: null}
  },
  methods: {
    onInput(e) {
      this.$emit('update', e.target.value);
    }
  }
}
</script>

<style lang="scss">
.input-text {
  border-radius: var(--border-radius);
  border: solid 1px var(--grey-light);
  padding: 1rem;
  // max-width: 18rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: var(--black);
  }

  &:disabled {
    color: var(--grey-light);
  }
}
</style>
