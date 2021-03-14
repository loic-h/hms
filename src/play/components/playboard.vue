<template>
  <div class="playboard">
    <header-component class="playboard__header" />
    <h1 class="playboard__title cursored">{{ gameTitle }}</h1>
    <div class="playboard__content">
      <div class="playboard__position">
        <span>{{ trackPosition }}</span>
        <span>{{ totalTracks }}</span>
      </div>
      <player />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderComponent from './header';
import Player from './player';

export default {
  name: 'Playboard',
  components: {
    HeaderComponent,
    Player
  },
  computed: {
    ...mapState(['gameTitle', 'trackPosition', 'totalTracks'])
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

  &__content {
    flex-grow: 1;
  }
}
</style>
