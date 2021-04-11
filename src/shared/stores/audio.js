export default {
  namespaced: true,

  state: {
    playingId: null
  },

  mutations: {
    playingId: (state, payload) => {
      state.playingId = payload;
    }
  },

  getters: {
    connected: (state, getters, rootSate, rootGetters) => connected => {
      if (typeof connected === 'boolean' || connected === 'true') {
        return (connected);
      }
      if (typeof rootGetters['games/isGameConnected'] === 'boolean') {
        return (rootGetters['games/isGameConnected']);
      }
    },

    isPlaying: (state, getters, rootSate, rootGetters) => (id, connected) => {
      if (id !== state.playingId) {
        return;
      }
      const item = rootGetters['tracks/itemById'](id);
      if (!item) {
        return;
      }
      if (getters.connected(connected)) {
        return rootGetters['spotify/isPlaying'](item.uri);
      } else {
        return rootGetters['audioNative/isPlaying'](item.preview);
      }
    },

    progress: (state, getters, rootSate, rootGetters) => {
      if (getters.connected()) {
        // return rootGetters['spotify/isPlaying'](item.uri);
      } else {
        return rootGetters['audioNative/progress'];
      }
    },
  },

  actions: {
    play: ({ commit, dispatch, getters }, { id, preview, uri, currentTime, connected })  => {
      commit('playingId', id);
      if (getters.connected(connected)) {
        dispatch('spotify/play', { uri, currentTime }, { root: true });
      } else {
        dispatch('audioNative/play', { src: preview, currentTime }, { root: true });
      }
    },

    pause: ({ dispatch, getters }, { connected })  => {
      if (getters.connected(connected)) {
        dispatch('spotify/pause', null, { root: true });
      } else {
        dispatch('audioNative/pause', null, { root: true });
      }
    },

    stop: ({ commit, dispatch, getters }, { connected } = {})  => {
      commit('playingId', null);
      if (getters.connected(connected)) {
        // dispatch('spotify/stop', { root: true });
        dispatch('spotify/pause', { root: true });
      } else {
        dispatch('audioNative/stop', { root: true });
      }
    },

    progress: ({ }, { connected } = {}) => {
      if (getters.connected(connected)) {
        // dispatch('spotify/progress', { root: true });
      } else {
        dispatch('audioNative/progress', { root: true });
      }
    }
  }
}
