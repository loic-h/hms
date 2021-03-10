let audio;

export default {
  namespaced: true,

  state: {
    src: null,
    playing: false
  },

  mutations: {
    src: (state, payload) => {
      state.src = payload;
    },

    playing: (state, payload) => {
      state.playing = payload;
    }
  },

  getters: {
    isPlaying: (state) => (src) => {
      return state.src === src && state.playing === true;
    }
  },

  actions: {
    src: ({ commit }, payload) => {
      commit('src', payload)
      audio = new Audio();
      audio.addEventListener('canplaythrough', () => {
        audio.play()
      });
      audio.addEventListener('ended', () => {
        commit('playing', false);
      });
      audio.src = payload;
    },

    play: ({ state, commit, dispatch }, payload) => {
      if (state.src !== payload) {
        dispatch('src', payload);
      } else {
        audio.play();
      }
      commit('playing', true);
    },

    pause: ({ commit }) => {
      audio.pause();
      commit('playing', false);
    }
  }
}
