<template>
  <div class="admin container">
    <header class="admin__header">
      <logo
        class="admin__logo"
        type="small" />
      <div class="admin__title">
        <h1 class="h1">
          {{ playlistName }}
        </h1>
      </div>
    </header>
    <div class="admin__share">
      <div class="admin__link" ref="link">
        {{ gameUrl }}
      </div>
      <div @click="copy" class="material-icons admin__copy">content_copy</div>
    </div>
    <main>
      <div class="admin__tracks">
        <h3 class="admin__section-headline h3">
          <div class="material-icons">queue_music</div>
          <span>Tracklist</span>
        </h3>
        <tracklist />
      </div>
    </main>
  </div>
  <div class="login">
    <h1>Manage the game</h1>
    <p>Share link: <a :href="gameUrl">{{ gameUrl }}</a></p>
    <clients />

  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tracklist from '../components/tracklist';
import Clients from '../components/clients';
import Logo from '../../shared/components/logo';
import InputText from '../../shared/components/input-text';
import { unsubscribe } from '../../services/pusher';
import copy from '../../utils/copy';

export default {
  name: 'Admin',
  components: {
    Tracklist,
    Clients,
    Logo,
    InputText
  },
  computed: {
    ...mapState({
      playlistName: state => state.playlists.name
    }),
    gameId() {
      return this.$route.params.id;
    },
    gameUrl() {
      return new URL(`/play/${this.gameId}`, window.location.origin).toString();
    }
  },
  mounted() {
    this.$store.dispatch('room', this.$route.params.id);
  },
  beforeUnmount() {
    unsubscribe(this.$store.getters.gameId);
  },
  methods: {
    copy() {
      copy(this.gameUrl);
    }
  }
}
</script>

<style lang="scss">
.admin {

  &__header {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    width: 100%;
    margin-bottom: 1rem;

    &__logo {
      flex-basis: 25%;
    }

    &:after {
      content: '';
      display: block;
      flex-basis: 25%;
    }
  }

  &__title {
    display: flex;
    flex-grow: 1;
  }

  &__share {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  &__link {
    border-radius: var(--border-radius);
    border: 1px solid var(--grey-light);
    padding: 1rem;
    margin-right: 0.5rem;
    max-width: 100%;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__copy {
    cursor: pointer;
  }

  &__section-headline {
    display: flex;
    align-items: center;

    > div {
      margin-right: 0.25rem;
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

    &__header {
      align-items: flex-start;
      margin-bottom: 2rem;

      &:after {
        content: '';
        display: block;
        flex-basis: 25%;
      }
    }

    &__title {
      justify-content: center;
    }

    &__logo {
      flex-basis: 25%;
    }
  }
}
</style>
