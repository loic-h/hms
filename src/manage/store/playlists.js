import api from '../../api';

export default {
  namespaced: true,

  state: {
    query: null,
    id: null,
    items: [],
    loading: false,
    error: null
  },

  mutations: {
    query: (state, payload) => {
      state.query = payload;
    },

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
    }
  },

  getters: {
    itemById: (state) => id => {
      return state.items.find(a => a.id === id);
    },

    name: (state, getters) => {
      return getters.itemById(state.id).name;
    }
  },

  actions: {
    search: ({ commit }, payload) => {
      if (payload === '') {
        payload = null;
      }
      commit('query', payload);
      if (payload) {
        commit('loading', true);
        api.search({ query: payload, type: 'playlist' })
          .then(body => {
            commit('items', body.items);
          })
          .catch(err => {
            commit('error', err);
          }).finally(() => {
            commit('loading', false);
          });
      } else {
        commit('items', []);
      }
    },

    resetSearch: ({ commit }) => {
      commit('items', []);
      commit('query', null);
    },

    save: ({ commit, getters }, { id, name }) => {
      commit('id', id);
      if (!getters.itemById(id)) {
        commit('items', [{ id, name }]);
      }
    }
  }
}
