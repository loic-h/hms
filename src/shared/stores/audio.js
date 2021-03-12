let audio;

export default {
  namespaced: true,

  state: {
    id: null,
    playing: false
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    playing: (state, payload) => {
      state.playing = payload;
    }
  },

  getters: {
    isPlaying: (state, getters) => (id) => {
      return state.id === id && state.playing === true;
    },

    track: (state, getters, rootState, rootGetters) => {
      return rootGetters.trackById(state.id)
    },

    src: (state, getters) => {
      return getters.track.preview;
    }
  },

  actions: {
    id: ({ state, getters, commit, dispatch }, payload) => {
      if (audio) {
        dispatch('stop');
      }
      commit('id', payload)
      audio = new Audio();
      commit('playing', true);
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      });
      audio.addEventListener('ended', () => {
        commit('playing', false);
        commit('id', null);
      });
      audio.src = getters.src;
    },

    play: ({ state, getters, commit, dispatch }, payload) => {
      if (state.id !== payload) {
        dispatch('id', payload);
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
      commit('id', null);
      commit('playing', false);
    }
  }
}
