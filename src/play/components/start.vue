<template>
  <div class="home__logo cursored">
    <logo type="big" />
  </div>
  <form @submit="onSubmit" class="start">
    <input-text
      class="start__input"
      name="name"
      :value="name"
      placeholder="Choose a name" />
    <cta>
      Join game
    </cta>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import InputText from '../../shared/components/input-text';
import Cta from '../../shared/components/cta';
import Logo from '../../shared/components/logo';

export default {
  name: 'Start',
  components: {
    InputText,
    Logo,
    Cta
  },
  computed: {
    ...mapState({
      name: state => state.user.name || state.spotify.name
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const name = e.target.elements.name.value;
      this.$store.dispatch('user/ready', { name });
    }
  }
};
</script>

<style lang="scss">
.start {
  max-width: 25rem;
  width: 100%;
  padding-top: 3rem;

  &__input {
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
  }
}
</style>
