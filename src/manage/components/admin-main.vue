<template>
  <div class="container">
    <ul class="admin-mobile-menu">
      <li
        v-for="(icon, index) in ['queue_music', 'speaker', 'group']"
        :key="index"
        :class="{ 'is-selected': currentSection === index + 1 }">
        <button @click="currentSection = index + 1">
          <span class="material-icons">
            {{ icon }}
          </span>
        </button>
      </li>
    </ul>
  </div>

  <main
    class="admin-main"
    :class="`admin-main--${currentSection}`"
    v-swipe="onMainSwipe">

    <div class="admin-main__tracks">
      <h3 class="admin-main__section-headline h3">
        <div class="material-icons">queue_music</div>
        <span>Tracklist</span>
      </h3>
      <tracklist
        @item-click="onItemClick"/>
    </div>

    <div class="admin-main__track">
      <track-section />
    </div>

    <div class="admin-main__players">
      <h3 class="admin-main__section-headline h3">
        <div class="material-icons">group</div>
        <span>Players</span>
      </h3>
      <users class="admin-main__users" />
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
  data() {
    return {
      currentSection: 2
    }
  },
  computed: {
    ...mapState({
      playlist: state => state.playlists.name,
    }),
    ...mapGetters('games', ['trackUrl'])
  },
  methods: {
    onItemClick(id) {
      this.currentSection = 2;
      this.$router.push(this.trackUrl(id));
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
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  > div {
    overflow: auto;
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

    > div {
      margin-right: 0.25rem;
    }
  }

  @include media(max-width, l) {
    > div {
      display: none;
      padding-left: var(--container-padding-s);
      padding-right: var(--container-padding-s);
    }

    @for $i from 1 through 3 {
      &--#{$i} {
        > div:nth-child(#{$i}) {
          display: block;
        }
      }
    }
  }

  @include media(max-width, s) {
    > div {
      padding-left: var(--container-padding-xs);
      padding-right: var(--container-padding-xs);
      padding-top: 1rem;
    }

    &__section-headline {
      display: none;
    }
  }

  @include media(min-width, l) {
    padding-left: var(--container-padding-s);
    padding-right: var(--container-padding-s);

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