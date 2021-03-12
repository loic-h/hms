import api from '../../api';

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

    selectedItem: (state, getters) => {
      return getters.itemById(state.id);
    },

    availableItems: (state) => {
      return state.items.filter(a => a.preview);
    },

    totalAvailableItems: (state, getters) => {
      return getters.availableItems.length;
    },

    itemPosition: (state, getters) => id => {
      return getters.availableItems.findIndex(a => a.id === id) + 1;
    },
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
        commit('items', items);
        commit('error', err);
      }
      commit('loading', false);
      return body;
    },

    reset: ({ commit }) => {
      commit('items', []);
    }
  }
}
