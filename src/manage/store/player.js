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
      if (rootGetters['games/isGameConnected']) {
        return rootGetters['spotify/isPlaying'](track.uri);
      }
      return rootGetters['audio/isPlaying'](track.preview);
    },

    nextTrack: (state, getters, rootState, rootGetters) => {
      return rootGetters['tracks/nextItemById'](state.id);
    }
  },

  actions: {
    play: async ({ getters, commit, dispatch, rootState, rootGetters }, id) => {
      commit('id', id);
      let src, uri;
      if (rootGetters['games/isGameConnected']) {
        uri = getters.track.uri;
        await dispatch('spotify/play', { uri }, { root: true });
      } else  {
        src = getters.track.preview;
        dispatch('audio/play', { src }, { root: true });
      }
      push('play', {
        id,
        position: rootGetters['tracks/itemPosition'](id),
        src,
        uri,
        currentTime: rootState.audio.currentTime
      });
    },

    pause: ({ dispatch, rootGetters }) => {
      if (rootGetters['games/isGameConnected']) {
        dispatch('spotify/pause', null, { root: true });
      } else  {
        dispatch('audio/pause', null, { root: true });
      }
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
