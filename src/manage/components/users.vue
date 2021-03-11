<template>
  <div class="clients">
    <users-item
      v-for="item in gameUsers"
      :key="item.id"
      :id="item.id"
      :name="item.name" />
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
    ...mapGetters(['gameUsers'])
  }
};
</script>
