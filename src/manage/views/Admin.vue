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

    <ul class="admin__mobile-menu">
      <li
        v-for="(icon, index) in ['queue_music', 'speaker', 'group']"
        :key="index"
        :class="{ 'is-selected': currentSection === index + 1 }">
        <button
          @click="currentSection = index + 1"
          class="material-icons">
          {{ icon }}
        </button>
      </li>
    </ul>

    <main
      class="admin__main"
      :class="`admin__main--${currentSection}`"
      v-swipe="onMainSwipe">

      <div class="admin__tracks">
        <h3 class="admin__section-headline h3">
          <div class="material-icons">queue_music</div>
          <span>Tracklist</span>
        </h3>
        <tracklist
          @item-click="onItemClick"/>
      </div>

      <div class="admin__track">
        <track-section />
      </div>

      <div class="admin__players">
        <h3 class="admin__section-headline h3">
          <div class="material-icons">group</div>
          <span>Players</span>
        </h3>
        <users class="admin__users" />
      </div>
    </main>
  </div>
  <player />
</template>

<script>
import { mapState } from 'vuex';
import Tracklist from '../components/tracklist';
import TrackSection from '../components/track-section';
import Users from '../components/users';
import Player from '../components/player';
import Logo from '../../shared/components/logo';
import InputText from '../../shared/components/input-text';
import { unsubscribe } from '../../services/pusher';
import copy from '../../utils/copy';

export default {
  name: 'Admin',
  components: {
    Tracklist,
    TrackSection,
    Users,
    Logo,
    InputText,
    Player
  },
  data() {
    return {
      currentSection: 2
    }
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
    },
    onItemClick(id) {
      this.currentSection = 2;
      this.$router.push(`/manage/${this.gameId}/${id}`);
    },
    onMainSwipe(e) {
      if (e.direction === 2 && this.currentSection < 3) {
        this.currentSection = this.currentSection + 1;
      }
      if (e.direction === 4 && this.currentSection > 1) {
        this.currentSection = this.currentSection - 1;
      }
    }
  }
}
</script>

<style lang="scss">
.admin {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

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

  &__mobile-menu {
    display: flex;
    justify-content: space-around;
    box-shadow: 0 1px 0 var(--grey-light);
    margin-bottom: 1rem;

    li {
      padding: 0.5rem;
      color: var(--grey-light);

      &.is-selected {
        color: var(--black);
      }
    }

    @include media(min-width, l) {
      display: none;
    }
  }

  &__main {
    display: flex;
    flex-grow: 1;

    > div {

      &:not(:last-child) {
        margin-right: 1.5rem;
      }
    }

    @include media(max-width, l) {
      > div {
        display: none;
      }

      @for $i from 1 through 3 {
        &--#{$i} {
          > div:nth-child(#{$i}) {
            display: block;
          }
        }
      }
    }
  }

  &__tracks,
  &__players {
    width: 100%;

    @include media(min-width, l) {
      width: 20rem;
      max-width: 20%;
    }
  }

  &__track {
    flex-grow: 1;
  }

  &__section-headline {
    display: flex;
    align-items: center;
    padding-left: 1rem;

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
