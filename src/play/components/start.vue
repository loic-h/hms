<template>
  <div class="home__logo cursored">
      <logo type="big" />
  </div>

  <form @submit="onSubmit" class="start">
    <input-text
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
    ...mapState(['name'])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const name = e.target.elements.name.value;
      this.$store.dispatch('ready', { name });
    }
  }
};
</script>

<style lang="scss">
.start {
padding-top: 3rem;

  input {
    margin-bottom: 1rem;
  }
}
</style>
