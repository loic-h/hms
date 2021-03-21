<template>
  <header class="header">
    <logo class="header__logo" />
    <user
      class="header__user"
      :name="name" />
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '../../shared/components/logo';
import User from '../../shared/components/user';

export default {
  name: 'Header',
  components: {
    Logo,
    User
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
  }
}
</style>
