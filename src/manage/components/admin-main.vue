<template>
  <div class="container">
    <ul class="admin-mobile-menu">
      <li
        v-for="(icon, index) in ['queue_music', 'speaker', 'group']"
        :key="index"
        :class="{ 'is-selected': section === index + 1 }">
        <button @click="$emit('section', index + 1)">
          <span class="material-icons">
            {{ icon }}
          </span>
        </button>
      </li>
    </ul>
  </div>

  <main
    class="admin-main"
    :class="`admin-main--${section}`"
    v-swipe="onMainSwipe">
    <div class="admin-main__content">

      <div class="admin-main__section admin-main__tracks">
        <h3 class="admin-main__section-headline h3">
          <div class="material-icons">queue_music</div>
          <span>Tracklist</span>
        </h3>
        <tracklist
          :connected-game="isGameConnected"
          @item-click="onItemClick"/>
      </div>

      <div class="admin-main__section admin-main__track">
        <track-section />
      </div>

      <div class="admin-main__section admin-main__players">
        <h3 class="admin-main__section-headline h3">
          <div class="material-icons">group</div>
          <span>Players</span>
        </h3>
        <users class="admin-main__users" />
      </div>
    </div>
  </main>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import Tracklist from '../components/tracklist';
import TrackSection from '../components/track-section';
import Users from '../components/users';
import InputText from '../../shared/components/input-text';

export default {
  name: 'AdminMain',
  components: {
    Tracklist,
    TrackSection,
    Users,
    InputText
  },

  emits: ['section'],

  props: {
    section: { type: Number, default: null }
  },

  computed: {
    ...mapState({
      playlist: state => state.playlists.name,
    }),
    ...mapGetters('games', ['trackUrl', 'isGameConnected']),
    ...mapGetters('tracks', ['isItemAvailable'])
  },

  methods: {
    onItemClick(id) {
      if (!this.isItemAvailable(id)) {
        return;
      }
      this.$emit('section', 2);
      this.$router.push(this.trackUrl(id));
    },

    onMainSwipe(e) {
      if (e.direction === 2 && this.section < 3) {
        this.$emit('section', this.section + 1);
      }
      if (e.direction === 4 && this.section > 1) {
        this.$emit('section', this.section - 1);
      }
    }
  }
}
</script>

<style lang="scss">
.admin-mobile-menu {
  display: flex;
  box-shadow: 0 1px 0 var(--grey-light);

  li {
    flex-grow: 1;
    padding: 0.5rem;
    color: var(--grey-light);

    &.is-selected {
      color: var(--black);
    }

    button {
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  @include media(min-width, l) {
    display: none;
  }
}

.admin-main {
  $root: &;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;

  &__content {
    display: flex;
    position: relative;
    height: 100%;
  }

  &__tracks,
  &__players {
    width: 100%;
  }

  &__track {
    flex-grow: 1;
  }

  &__section-headline {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
    position: sticky;
    top: 0;
    background-color: var(--white);

    &__section {
      margin-right: 0.25rem;
    }
  }

  @include media(max-width, l) {
    display: flex;
    flex-direction: column;

    &__section {
      padding-left: var(--container-padding-s);
      padding-right: var(--container-padding-s);
      padding-top: 1rem;
      width: 100vw;
      overflow-x: hidden;
      box-sizing: border-box;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }

    &__section-headline {
      display: none;
    }

    @for $i from 1 through 3 {
      &--#{$i} {

        #{$root}__content {
          left: -#{($i - 1) * 100}vw;
        }
      }
    }
  }

  @include media(max-width, s) {
    &__section {
      padding-left: var(--container-padding-xs);
      padding-right: var(--container-padding-xs);
    }
  }

  @include media(min-width, l) {
    padding-left: var(--container-padding-s);
    padding-right: var(--container-padding-s);

    &__section {
      overflow: auto;
    }

    &__track {
      padding: 0 2rem;
    }

    &__tracks {
      width: 25rem;
      max-width: 30%;
    }

    &__players {
      width: 15rem;
      max-width: 15%;
    }
  }
}
</style>
