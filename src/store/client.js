import { push, subscribe } from "../services/pusher";

export default {
  namespaced: true,

  state: {
    gameId: null,
    name: null
  },

  mutations: {
    name: (state, payload) => {
      state.name = payload;
    },

    gameId: (state, payload) => {
      state.gameId = payload;
    }
  },

  actions: {
    name: ({ state, commit }, payload) => {
      commit('name', payload);
      subscribe(state.gameId)
        .then(() => {
          push("join", {
            name: state.name
          });
        });
    }
  }
};
