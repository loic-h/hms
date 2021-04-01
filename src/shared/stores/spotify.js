import { getUser, getUserPlaylists, loadSpotifySDK, connect, play, pause } from '../../services/spotify';

export default {
  namespaced: true,

  state: {
    token: null,
    name: null,
    id: null,
    player: null,
    uri: null,
    playing: false
  },

  mutations: {
    token: (state, payload) => {
      state.token = payload;
    },

    name: (state, payload) => {
      state.name = payload;
    },

    id: (state, payload) => {
      state.id = payload;
    },

    player: (state, payload) => {
      state.player = payload;
    },

    uri: (state, payload) => {
      state.uri = payload;
    },

    playing: (state, payload) => {
      state.playing = payload;
    }
  },

  getters: {
    connected: (state) => {
      return !!state.token;
    },

    isPlaying: (state) => async (uri) => {
      return state.uri === uri && state.playing;
    },
  },

  actions: {
    token: async ({ commit, dispatch }, payload) => {
      commit('token', payload);
      const body = await getUser({ token: payload });
      commit('name', body.display_name);
      commit('id', body.id);
    },

    playlists: ({ state, commit }) => {
      getUserPlaylists({
        userId: state.id,
        token: state.token
      })
        .then(body => {
          commit('playlists/items', body.items, { root: true });
        });
    },

    loadPlayer: ({ state, commit, getters, rootState }) => {
      if (!getters.connected) {
        connect();
      }
      loadSpotifySDK(state.token)
        .then(player => {
          commit('player', player);
          player.addListener('player_state_changed', paylaod => dispatch('status', payload));
        });
    },

    play: async ({ state, commit }, { uri }) => {
      await play(uri, state.token);
      commit('playing', true);
    },

    pause: async ({ state, commit }) => {
      await pause(state.token);
      commit('playing', false);
    },

    status: ({ commit }, payload) => {
      commit('playing', !payload.paused);
      commit('uri', paylaod.track_window.current_track.uri);
    }
  }
};
