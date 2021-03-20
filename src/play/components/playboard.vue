<template>
  <div class="playboard">
    <header-component class="playboard__header" />
    <h1 class="playboard__title cursored">{{ title }}</h1>
    <div class="playboard__content">
      <div class="playboard__position">
        <span>{{ position }}</span>
        <span>{{ totalTracks }}</span>
      </div>
      <player class="playboard__player" />
      <div v-if="id">
        <answer />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderComponent from './header';
import Player from './player';
import Answer from './answer';


export default {
  name: 'Playboard',
  components: {
    HeaderComponent,
    Player,
    Answer
  },
  computed: {
    ...mapState('game', ['title', 'totalTracks']),
    ...mapState('track', ['position', 'id'])
  }
};
</script>

<style lang="scss">
.playboard {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;

  &__header {
    width: 100%;
    margin-bottom: 2rem;
  }

  &__title {
    @include h1;
    margin-bottom: 2rem;
  }

  &__position {
    margin-bottom: 1rem;

    span {

      &:first-child {
        @include h1;

        &:before {
          content: '# ';
        }
      }

      &:last-child {

        &:before {
          content: ' / ';
        }
      }
    }
  }

  &__player {
    margin-bottom: 2rem;
  }

  &__content {
    flex-grow: 1;
    width: 25rem;
    max-width: 100%;
  }
}
</style>
