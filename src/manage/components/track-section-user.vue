<template>
  <div class="track-section-users">
    <div
      class="track-section-users__item"
      v-for="user in users"
      :key="user.id">
      <h3>{{ user.name }}</h3>
      <ul>
        <li v-for="(item, index) in user.answers" :key="index">
          {{ item }}
        </li>
      </ul>
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

    h3 {
      @include h2;
      margin-bottom: 0.5rem;
    }

    ul {
      display: flex;

      li {
        border-radius: var(--border-radius);
        background-color: var(--white);
        padding: 1rem;
        margin-right: 1rem;
        border: 1px solid var(--grey-light);
      }
    }
  }
}
</style>
