<template>
  <header class="header">
    <logo class="header__logo" />
    <div class="header__user">
      <div class="material-icons">face</div>
      <span>{{ name }}</span>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '../../shared/components/logo';

export default {
  name: 'Header',
  components: {
    Logo
  },
  computed: {
    ...mapState('user', ['name'])
  }
}
</script>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  justify-items: center;

  &__logo {
    grid-column-start: 2;
  }

  &__user {
    justify-self: flex-end;
    display: flex;
    align-items: center;

    div {
      margin-right: 0.5rem;
    }
  }
}
</style>
