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
      return rootGetters['audio/isPlaying'](id, rootGetters['games/isGameConnected']);
    },

    nextTrack: (state, getters, rootState, rootGetters) => {
      return rootGetters['tracks/nextItemById'](state.id);
    }
  },

  actions: {
    play: async ({ getters, commit, dispatch, rootState, rootGetters }, id) => {
      commit('id', id);
      let src, uri;
      dispatch('audio/play', { ...getters.track, connected: rootGetters['games/isGameConnected'] }, { root: true });
      push('play', {
        id,
        position: rootGetters['tracks/itemPosition'](id),
        src,
        uri,
        currentTime: rootState.audio.currentTime
      });
    },

    pause: ({ dispatch, rootGetters }) => {
      dispatch('audio/pause', { connected: rootGetters['games/isGameConnected'] }, { root: true });
      push('pause', {});
    },

    next: ({ commit, getters, dispatch, rootGetters }) => {
      const nextTrack = getters.nextTrack;
      if (!getters.nextTrack) {
        return;
      }
      commit('tracks/id', nextTrack.id, { root: true });
      dispatch('play', nextTrack.id);
    }
  }
};
