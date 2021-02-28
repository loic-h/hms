<template>
  <div class="clients">
    <h3>Players</h3>
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
  name: 'Clients',
  components: {
    ClientsItem
  },
  computed: {
    ...mapState('server', ['clients'])
  }
};
</script>
