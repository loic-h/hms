import socket from "../services/socket";

export default {
  namespaced: true,

  state: {
    name: null
  },

  mutations: {
    name: (state, payload) => {
      state.name = payload;
    }
  },

  actions: {
    name: ({ commit }, payload) => {
      commit('name', payload);
      socket.emit('user', payload);
    }
  }
};
