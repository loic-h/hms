export default {
  namespaced: true,

  state: {
    id: null,
    src: null,
    position: '-'
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    src: (state, payload) => {
      state.src = payload;
    },

    position: (state, payload) => {
      state.position = payload;
    }
  }
};
