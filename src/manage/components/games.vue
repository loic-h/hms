<template>
  <div v-if="games.length > 0" class="games">
    <h3 class="games__headline">Games</h3>
    <ul class="games__list">
      <li
        v-for="item in games"
        :key="item.id">
        <router-link :to="item.manageUrl">
          {{ item.name || item.id }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Games',
  computed: {
    ...mapGetters('games', {
      games: 'decoratedItems'
    })
  }
};
</script>

<style lang="scss">
.games {
  text-align: center;

  &__headline {
    @include h2;
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
