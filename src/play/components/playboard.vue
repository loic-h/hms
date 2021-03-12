<template>
  <div class="playboard">
    <header-component />
    <div class="playboard__content">
      <player />
    </div>
  </div>
</template>

<script>
import HeaderComponent from './header';
import Player from './player';

export default {
  name: 'Playboard',
  components: {
    HeaderComponent,
    Player
  }
};
</script>

<style lang="scss">
.playboard {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  &__content {
    flex-grow: 1;
  }
}
</style>
