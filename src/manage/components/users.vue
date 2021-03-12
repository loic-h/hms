<template>
  <div class="users">
    <users-item
      v-for="item in users"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :score="item.score" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsersItem from "./users-item";

export default {
  name: 'Users',
  components: {
    UsersItem
  },
  computed: {
    ...mapGetters('games', ['users'])
  }
};
</script>

<style lang="scss">
.users {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
