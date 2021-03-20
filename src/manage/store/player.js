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
      if (!id || id !== state.id) {
        return;
      }
      const track = rootGetters['tracks/itemById'](id);
      return rootGetters['audio/isPlaying'](track.preview);
    },

    nextTrack: (state, getters, rootState, rootGetters) => {
      return rootGetters['tracks/nextItemById'](state.id);
    }
  },

  actions: {
    play: async ({ getters, commit, dispatch, rootState, rootGetters }, id) => {
      commit('id', id);
      const src = getters.track.preview;
      await dispatch('audio/play', { src }, { root: true });
      push('play', {
        id,
        position: rootGetters['tracks/itemPosition'](id),
        src: rootState.audio.src,
        currentTime: rootState.audio.currentTime
      });
    },

    pause: ({ dispatch }) => {
      dispatch('audio/pause', null, { root: true });
      push('pause', {});
    },

    next: ({ commit, getters, dispatch, rootGetters }) => {
      if (!getters.nextTrack) {
        return;
      }
      dispatch('play', getters.nextTrack.id);
      commit('tracks/id', getters.nextTrack.id, { root: true });
    }
  }
};
