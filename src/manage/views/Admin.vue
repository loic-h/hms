<template>
  <div class="admin">
    <admin-header />

    <admin-main />

    <player />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminHeader from '../components/admin-header';
import AdminMain from '../components/admin-main';
import Player from '../components/player';
import { unsubscribe } from '../../services/pusher';

export default {
  name: 'Admin',
  components: {
    AdminHeader,
    AdminMain,
    Player
  },

  computed: {
    ...mapGetters('games', {
      'game': 'currentItem'
    })
  },

  mounted() {
    this.$store.dispatch('games/room', this.game.id);
  },

  beforeUnmount() {
    unsubscribe(this.game.id);
  }
}
</script>

<style lang="scss">
.admin {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;


  @include media(min-width, m) {

    &__main {

      > div {

        &:not(:last-child) {
          margin-right: 1.5rem;
        }
      }

      &__tracks {
        height: 100%;
      }
    }
  }

  @include media(min-width, l) {
    &__mobile-menu {
      display: none;
    }
  }
}
</style>
