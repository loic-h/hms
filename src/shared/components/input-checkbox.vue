<template>
  <label class="input-checbox">
    <span class="material-icons">{{ sprite }}</span>
    <input type="checkbox" @input="onInput" />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'InputCheckbox',
  props: {
    modelValue: { type: Boolean, default: null }
  },
  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.checked);
    }
  },
  computed: {
    sprite() {
      return this.modelValue ? 'check_box' : 'check_box_outline_blank';
    }
  }
}
</script>

<style lang="scss">
.input-checbox {
  display: flex;
  align-items: center;

  span {
    display: block;
    margin-right: 0.25rem;
  }
}
</style>
