import { getUser, getUserPlaylists } from '../../services/spotify';

export default {
  namespaced: true,

  state: {
    token: null,
    name: null,
    id: null
  },

  mutations: {
    token: (state, payload) => {
      state.token = payload;
    },

    name: (state, payload) => {
      state.name = payload;
    },

    id: (state, payload) => {
      state.id = payload;
    }
  },

  actions: {
    token: ({ commit, dispatch }, payload) => {
      commit('token', payload);
      getUser({ token: payload })
        .then(body => {
          commit('name', body.display_name);
          commit('id', body.id);
        })
        .catch(e => console.error(e));

    },

    playlists: ({ state, commit }) => {
      getUserPlaylists({
        userId: state.id,
        token: state.token
      })
        .then(body => {
          commit('playlists/items', body.items, { root: true });
        });
    }
  }
};
