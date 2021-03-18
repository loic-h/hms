<template>
  <header class="admin-header container">
    <a href="/">
      <logo
        class="admin-header__logo"
        type="small" />
    </a>
    <div class="admin-header__title">
      <h1 class="h1">
        {{ game.name }}
      </h1>
    </div>

    <ul class="admin-header__actions">
      <li>
        <button @click="copy" class="material-icons">{{ linkSprite }}</button>
      </li>
      <li>
        <button @click="remove" class="material-icons">delete_forever</button>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '../../shared/components/logo';
import copy from '../../utils/copy';

export default {
  name: 'AdminHeader',
  components: {
    Logo
  },
  computed: {
    ...mapGetters('games', {
      game: 'currentItem'
    }),
    linkSprite() {
      return this.copied ? 'check' : 'link';
    }
  },
  data() {
    return {
      copied: false
    }
  },
  methods: {
    copy() {
      copy(this.game.playUrl);
      this.copied = true;
      setTimeout(() => this.copied = false, 3000);
    },
    remove() {
      const confirm = window.confirm(`Do you want to delete the game "${this.game.name || this.game.id}"?`);
      if (confirm) {
        this.$store.dispatch('games/remove', this.game.id);
        window.location.href = '/';
      }
    }
  }
}
</script>

<style lang="scss">
.admin-header {
  display: flex;
  padding-top: 1rem;
  width: 100%;
  margin-bottom: 1rem;

  a {
    display: block;
    text-decoration: none;
  }

  &__title {
    display: flex;
    flex-grow: 1;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;

    li {
      margin-left: 1rem;
    }
  }

  @include media(max-width, m) {

    &__logo {

      h3 {
        display: none;
      }
    }
  }

  @include media(min-width, m) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;

    &__title {
      justify-content: center;
    }
  }
}
</style>
