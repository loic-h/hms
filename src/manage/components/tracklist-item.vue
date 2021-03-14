<template>
  <div
    class="tracklist-item"
    :class="{
      'tracklist-item--disabled': !preview,
      'tracklist-item--selected': selected
    }">
    <div class="tracklist-item__infos">
      <h3>{{ name }}</h3>
      <span>{{ artist }}</span>
    </div>
    <play-button
      v-if="controls && preview"
      class="tracklist-item__controls"
      :playing="isPlaying"
      @play="$emit('play')"
      @pause="$emit('pause')" />
  </div>
</template>

<script>
import PlayButton from './play-button';

export default {
  name: 'PlaylistPreviewItem',
  components: {
    PlayButton
  },
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null },
    artist: { type: String, default: null },
    preview: { type: String, default: null },
    controls: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    isPlaying: { type: Boolean, default: false }
  }
}
</script>

<style lang='scss'>
.tracklist-item {
  $root: &;

  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-sizing: border-box;
  width: 100%;

  &__infos {
    flex-grow: 1;
    overflow: hidden;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__controls {
    margin-left: 1rem;
    color: var(--grey-light);
  }

  &:hover:not(&--disabled):not(&--selected) {
    background-color: var(--grey-pale);

    #{$root}__controls {
      color: var(--black);
    }
  }

  &--disabled {
    color: var(--grey-light);
    text-decoration: line-through;
  }

  &:not(&--disabled) {
    cursor: pointer;
  }

  &--selected {
    background-color: var(--black);
    color: var(--white);

    #{$root}__controls {
      color: var(--white);
    }
  }

  button {
    color: inherit;
  }
}
</style>
