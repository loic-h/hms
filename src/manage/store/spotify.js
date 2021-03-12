import api from '../../api';

export default {
  namespaced: true,

  state: {
    connected: false,
    loading: false,
    error: null
  },

  mutations: {
    spotify: (state, payload) => {
      state.spotify = {
        ...state.spotify,
        ...payload
      };
    }
  },

  actions: {
    token: async ({ commit }) => {
      commit('spotify', { loading: true });
      let connected;
      try {
        await api.connect();
        connected = true;
        commit('spotify', { connected });
      } catch(err) {
        commit('spotify', { error: err });
      }
      commit('spotify', { loading: false });
      return connected;
    },
  }
}
