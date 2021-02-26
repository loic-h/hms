import socket from '../services/socket';
import api from "../api";

export default {
  namespaced: true,

  state: {
    spotify: {
      connected: false,
      loading: false,
      error: null
    },
    playlists: {
      id: null,
      items: [],
      loading: false,
      error: null
    },
    tracks: {
      items: [],
      loading: false,
      error: null
    },
    playing: null,
  },

  mutations: {
    spotify: (state, payload) => {
      state.spotify = {
        ...state.spotify,
        ...payload
      };
    },

    playlists: (state, payload) => {
      state.playlists = {
        ...state.playlists,
        ...payload
      };
    },

    tracks: (state, payload) => {
      state.tracks = {
        ...state.tracks,
        ...payload
      };
    },

    playing: (state, payload) => {
      state.playing = payload;
    }
  },

  actions: {
    token: async ({ commit }) => {
      commit("spotify", { loading: true });
      let connected;
      try {
        await api.connect();
        connected = true;
        commit("spotify", { connected });
      } catch(err) {
        commit("spotify", { error: err });
      }
      commit("spotify", { loading: false });
      return connected;
    },

    search: ({ commit }, payload) => {
      commit("playlists", { loading: true });
      api.search({ query: payload, type: 'playlist' })
        .then(body => {
          commit("playlists", {
            items: body.items
          });
        })
        .catch(err => {
          commit("playlists", { error: err });
        }).finally(() => {
          commit("playlists", { loading: false });
        });
    },

    playlist: async ({ commit }, payload) => {
      commit("playlists", { id: payload, items: [] });
      commit("tracks", { loading: true });
      let body;
      try {
        body = await api.playlist({ id: payload })
        commit("tracks", {
          items: body.items
        });
      } catch(err) {
        commit("tracks", { error: err });
      }
      commit("tracks", { loading: false });
      return body;
    },

    play: ({ state, commit }, payload) => {
      commit("playing", payload);
      socket.emit("server:play", {
        room: state.playlists.id,
        url: payload
      });
    },

    pause: ({ state, commit }, payload) => {
      commit("playing", null);
      socket.emit("server:pause", {
        room: state.playlists.id,
        url: payload
      });
    }
  }
};
