<template>
  <div
    class="input-text"
    :class="{ 'input-text--button': button }">
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      @input="onInput" />
    <button
      v-if="button"
      class="material-icons"
      @click="$emit('button-click')">
      {{ button }}
    </button>
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: null },
    disabled: { type: String, default: null },
    button: { type: String, default: null },
    name: { type: String, default: null }
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
  position: relative;
  border-radius: var(--border-radius);
  border: solid 1px var(--grey-light);
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: var(--black);
  }

  &:disabled {
    color: var(--grey-light);
  }

  input {
    width: 100%;
    padding: 1rem 0;
  }

  button {
    @include icon(m);
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-light);
    cursor: pointer;
  }

  &:hover {

    button {
      color: var(--black);
    }
  }

  &--button {
    padding-right: 3rem;
  }
}
</style>
