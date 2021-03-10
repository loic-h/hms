<template>
  <div
    class="logo"
    :class="{ [`logo--${type}`]: type }">
    <span
      class="material-icons">
      album
    </span>
    <h3>{{ $options.title }}</h3>
  </div>
</template>

<script>
import globals from '../../utils/globals';

export default {
  name: 'Logo',
  title: globals.title,
  props: {
    type: { type: String, default: 'small' }
  }
};
</script>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;

  span {
    display: block;
    margin-right: 0.25rem;
  }

  h3 {
    @include h2;
    white-space: nowrap;
  }

  &--big {
    flex-direction: column;

    span {
      @include icon(l);
      margin-right: 0;
      margin-bottom: 1rem;
    }

    h3 {
      @include h1;
    }

    @include media(min-width, m) {

      span {
        @include icon(xl);
      }
    }
  }
}
</style>
