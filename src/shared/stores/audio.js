export default {
  namespaced: true,

  state: {
    audio: null,
    src: null,
    currentTime: null,
    duration: null,
    volume: null,
    playing: false
  },

  mutations: {
    audio: (state, payload) => {
      state.audio = payload;
    },

    src: (state, payload) => {
      state.src = payload;
    },

    playing: (state, payload) => {
      state.playing = payload;
    },

    currentTime: (state, payload) => {
      state.currentTime = payload;
    },

    volume: (state, payload) => {
      state.volume = payload;
      state.audio.volume = payload;
    },

    duration: (state, payload) => {
      state.duration = payload;
    }
  },

  getters: {
    isPlaying: (state) => (src) => {
      return state.src === src && state.playing === true;
    },

    progress: (state) => {
      if (!state.duration) {
        return 0;
      }
      return state.currentTime * 100 / state.duration;
    }
  },

  actions: {
    init: async ({ state, commit }) => {
      commit('audio', new Audio());
      state.audio.play();
      state.audio.pause();
      state.audio.currentTime = 0;
    },
    src: async ({ state, getters, commit, dispatch }, payload) => {
      if (state.audio) {
        dispatch('stop');
      } else {
        await dispatch('init');
      }
      commit('src', payload)
      commit('volume', 0.2);
      commit('playing', true);
      state.audio.addEventListener('loadedmetadata', () => {
        commit('duration', state.audio.duration);
      });
      state.audio.addEventListener('loaded', () => {
        commit('currentTime', state.currentTime);
        state.audio.currentTime = state.currentTime;
      });
      state.audio.addEventListener('canplaythrough', () => {
        state.audio.play();
      });
      state.audio.addEventListener('ended', () => {
        commit('playing', false);
        commit('src', null);
        commit('currentTime', state.duration);
      });
      state.audio.src = state.src;
    },

    play: async ({ state, getters, commit, dispatch }, { src, currentTime } = {}) => {
      if (state.src !== src) {
        await dispatch('src', src);
      } else {
        state.audio.play();
      }
      if (typeof currentTime !== 'undefined') {
        commit('currentTime', currentTime);
      }
      requestAnimationFrame(() => dispatch('progress'));
      commit('playing', true);
    },

    pause: ({ state, commit }) => {
      if (state.audio) {
        state.audio.pause();
      }
      commit('playing', false);
    },

    stop: ({ state, commit }) => {
      if (state.audio) {
        state.audio.src = '';
      }
      commit('src', null);
      commit('playing', false);
      commit('currentTime', null);
    },

    progress: ({ state, commit, dispatch }) => {
      if (state.playing) {
        commit('currentTime', state.audio.currentTime);
        requestAnimationFrame(() => dispatch('progress'))
      }
    }
  }
};
