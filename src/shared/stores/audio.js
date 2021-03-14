export default {
  namespaced: true,

  state: {
    src: null,
    progress: null,
    playing: false,
    audio: null
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

    currentTime: (state) => {
      return state.audio.currentTime;
    }
  },

  actions: {
    src: ({ state, getters, commit, dispatch }, payload) => {
      if (state.audio) {
        dispatch('stop');
      }
      commit('src', payload)
      state.audio = new Audio();
      commit('playing', true);
      state.audio.addEventListener('canplaythrough', () => {
        state.audio.play();
      });
      state.audio.addEventListener('ended', () => {
        commit('playing', false);
        commit('src', null);
      });
      state.audio.src = state.src;
    },

    play: ({ state, getters, commit, dispatch }, payload) => {
      if (state.src !== payload) {
        dispatch('src', payload);
      } else {
        state.audio.play();
      }
      commit('playing', true);
    },

    pause: ({ state, commit }) => {
      state.audio.pause();
      commit('playing', false);
    },

    stop: ({ state, commit }) => {
      if (state.audio) {
        state.audio.src = '';
        state.audio = null;
      }
      commit('src', null);
      commit('playing', false);
    }
  }
}
