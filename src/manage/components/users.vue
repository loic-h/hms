<template>
  <div class="clients">
    <clients-item
      v-for="item in clients"
      :key="item.id"
      :id="item.id"
      :name="item.name" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ClientsItem from "./clients-item";

export default {
  name: 'Users',
  components: {
    ClientsItem
  },
  computed: {
    ...mapState(['clients'])
  }
};
</script>
