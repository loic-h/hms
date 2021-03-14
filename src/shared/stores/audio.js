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
    },
  },

  actions: {
    src: ({ state, getters, commit, dispatch }, payload) => {
      if (audio) {
        dispatch('stop');
      }
      commit('src', payload)
      audio = new Audio();
      commit('playing', true);
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      });
      audio.addEventListener('ended', () => {
        commit('playing', false);
        commit('src', null);
      });
      audio.src = state.src;
    },

    play: ({ state, getters, commit, dispatch }, payload) => {
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
    },

    stop: ({ commit }) => {
      if (audio) {
        audio.src = '';
        audio = null;
      }
      commit('src', null);
      commit('playing', false);
    }
  }
}
