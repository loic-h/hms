<template>
  <form
    class="answer__form"
    @submit="onSubmit">
    <input-text
      name="answer"
      :value="value"
      button="send"
      @update="v => value = v" />
  </form>
  <ul class="answer__list">
    <li class="answer__item" v-for="(item, index) in answersItems" :key="index">
      <span>{{ item }}</span>
      <button class="material-icons" @click="removeAnswer(index)">remove_circle_outline</button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import InputText from '../../shared/components/input-text';

export default {
  name: 'Answer',
  components: {
    InputText
  },
  data() {
    return {
      value: null
    };
  },
  computed: {
    ...mapGetters('game', ['answersItems'])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch('game/answer', this.value);
      this.value = '';
    },
    removeAnswer(index) {
      this.$store.dispatch('game/removeAnswer', index);
    }
  }
};
</script>

<style lang="scss">
.answer {
  &__form {
    display: flex;

    input {
      margin-right: 0.5rem;
    }
  }

  &__item {
    text-align: left;
    position: relative;
    margin-top: 1rem;
    padding: 1rem;
    padding-right: 3rem;
    border-radius: --var(border-radius);
    background-color: var(--grey-pale);

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
    }

    button {
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
  }
}
</style>
