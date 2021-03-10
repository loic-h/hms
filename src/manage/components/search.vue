<template>
  <div class="search">
    <input-text
      placeholder="Search for a playlist on spotify"
      :value="query"
      @update="onPlaylistInput" />
    <ul v-if="items.length > 0">
      <li
        v-for="item in items"
        :key="item.id">
        <button @click="selectPlaylist(item)">
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputText from '../../shared/components/input-text';
import debounce from '../../utils/debounce';

export default {
  name: 'Search',
  components: {
    InputText
  },
  computed: {
    ...mapState({
      items: state => state.playlists.items,
      query: state => state.playlists.query
    })
  },
  methods: {
    onPlaylistInput: debounce(function (value) {
      this.$store.dispatch("search", value);
    }, 500),
    selectPlaylist(item) {
      this.$store.dispatch("playlist", item);
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
        background-color: var(--grey-pale);
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
