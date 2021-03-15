<template>
  <div class="track-section-users">
    <div
      class="track-section-users__item"
      v-for="user in users"
      :key="user.id">
      <div>
        <h3>{{ user.name }}</h3>
        <ul>
          <li v-for="(item, index) in user.answers" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="track-section-users__score">
        <button @click="increaseScore(user)">+</button>
        <span>{{ user.score }}</span>
        <button @click="decreaseScore(user)">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TrackSectionUser',
  computed: {
    ...mapGetters('tracks', ['selectedItem']),
    ...mapGetters('users', ['usersByAnswers']),
    users() {
      return this.usersByAnswers(this.selectedItem.id)
    }
  },
  methods: {
    increaseScore(user) {
      this.$store.dispatch('users/score', {
        value: user.score + 1,
        userId: user.id,
      });
    },
    decreaseScore(user) {
      if (user.score <= 0) {
        return;
      }
      this.$store.dispatch('users/score', {
        value: user.score - 1,
        userId: user.id
      });
    },
  }
}
</script>

<style lang="scss">
.track-section-users {
  padding-top: 2rem;

  &__item {
    border-radius: var(--border-radius);
    background-color: var(--grey-pale);
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: stretch;

    > div:first-child {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    h3 {
      @include h2;
      margin-bottom: 0.5rem;
    }

    ul {
      display: flex;
      flex-grow: 1;

      li {
        border-radius: var(--border-radius);
        background-color: var(--white);
        padding: 1rem;
        margin-right: 1rem;
        border: 1px solid var(--grey-light);
      }
    }
  }

  &__score {
    display: flex;
    flex-direction: column;

    span {
      font-weight: 600;
      margin: 0.5rem 0;
    }

    button {
      cursor: pointer;
    }
  }
}
</style>
