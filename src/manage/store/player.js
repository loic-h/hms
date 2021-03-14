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
    play: ({ getters, commit, dispatch }, payload) => {
      commit('id', payload);
      const preview = getters.track.preview;
      dispatch('audio/play', preview, { root: true });
      push('play', {
        url: preview
      });
    },

    pause: ({ dispatch }, payload) => {
      dispatch('audio/pause', null, { root: true });
      push('pause', {
        url: payload
      });
    },
  }
};
