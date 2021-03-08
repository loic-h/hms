<template>
  <div class="search">
    <input-text
      placeholder="Search for a playlist on spotify"
      @update="onPlaylistInput" />
    <ul v-if="items.length > 0">
      <li
        v-for="item in items"
        :key="item.id">
        <button @click="selectPlaylist(item.id)">
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import InputText from '../../shared/components/input-text';
import debounce from '../../utils/debounce';

export default {
  name: 'Search',
  components: {
    InputText
  },
  computed: {
    items() {
      return this.$store.state.playlists.items;
    }
  },
  methods: {
    onPlaylistInput: debounce(function (value) {
      this.$store.dispatch("search", value);
    }, 500),
    selectPlaylist(id) {
      this.$store.dispatch("playlist", id);
    }
  }
};
</script>

<style lang="scss">
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ul {
    padding-top: 2rem;
    width: 100%;
    max-width: 30rem;

    li {

      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      button {
        @include ease;
        width: 100%;
        border: solid 1px var(--grey-light);
        border-radius: var(--border-radius);
        padding: 1.5rem 1rem;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: var(--black);
          border-color: var(--black);
          color: var(--white);
        }
      }
    }
  }
}
</style>
