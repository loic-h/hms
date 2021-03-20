import api from '../../api';
import { push } from '../../services/pusher';

export default {
  namespaced: true,

  state: {
    id: null,
    items: [],
    loading: false,
    error: null
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    items: (state, payload) => {
      state.items = payload;
    },

    loading: (state, payload) => {
      state.loading = payload;
    },

    error: (state, payload) => {
      state.error = payload;
    },
  },

  getters: {
    firstAvailableItemId: (state, getters) => {
      if (getters.availableItems.length <= 0) {
        return;
      }
      return getters.availableItems[0].id;
    },

    itemById: (state) => id => {
      return state.items.find(a => a.id === id);
    },

    itemIndexById: (state, getters) => id => {
      return getters.availableItems.findIndex(a => a.id === id);
    },

    itemByPreview: (state) => preview => {
      return state.items.find(a => a.preview === preview);
    },

    nextItemById: (state, getters) => id => {
      const index = getters.itemIndexById(id);
      if (index >= getters.totalAvailableItems) {
        return;
      }
      return getters.availableItems[index + 1];
    },

    selectedItem: (state, getters) => {
      return getters.itemById(state.id);
    },

    availableItems: (state) => {
      return state.items.filter(a => a.preview);
    },

    totalAvailableItems: (state, getters) => {
      return getters.availableItems.length;
    },

    itemIndex: (state, getters) => {
      return getters.itemIndexById(state.id);
    },

    itemPosition: (state, getters) => id => {
      return getters.itemIndex + 1;
    },

    playingItemId(state, getters, rootState, rootGetters) {
      const preview = rootState.audio.src;
      if (!rootGetters['audio/isPlaying'](preview)) {
        return;
      }
      const track = getters.itemByPreview(preview);
      return track && track.id;
    }
  },

  actions: {
    fetch: async ({ commit, dispatch }, { id }) => {
      commit('loading', true);
      let body;
      try {
        body = await api.playlist({ id })
        const items = body.items.map(a => ({ ...a, artist: a.artists.join(', ') }));
        dispatch('playlists/save', { id, name: body.name }, { root: true });
        commit('items', items);
      } catch(err) {
        console.error(err)
        commit('error', err);
      }
      commit('loading', false);
      return body;
    },

    reset: ({ commit }) => {
      commit('items', []);
    },

    reveal: ({ state, getters }) => {
      push('reveal', {
        id: state.id,
        name: getters.selectedItem.name,
        artist: getters.selectedItem.artist
      })
    }
  }
}
