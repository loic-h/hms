import { push } from '../../services/pusher';

export default {
  namespaced: true,

  state: {
    id: null
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    playing: (state, payload) => {
      state.playing = payload;
    },
  },

  getters: {
    track: (state, getters, rootState, rootGetters) => {
      return rootGetters['tracks/itemById'](state.id);
    },

    isPlaying: (state, getters, rootState, rootGetters) => id => {
      if (id !== state.id) {
        return;
      }
      const track = rootGetters['tracks/itemById'](id);
      return rootGetters['audio/isPlaying'](track.preview);
    }
  },

  actions: {
    play: async ({ getters, commit, dispatch, rootState }, payload) => {
      commit('id', payload);
      const src = getters.track.preview;
      await dispatch('audio/play', { src }, { root: true });
      push('play', {
        src: rootState.audio.src,
        currentTime: rootState.audio.currentTime
      });
    },

    pause: ({ dispatch }) => {
      dispatch('audio/pause', null, { root: true });
      push('pause', {});
    },
  }
};
