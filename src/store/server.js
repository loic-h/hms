import api from "../api";
import { subscribe, listen, push } from "../services/pusher";

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

  getters: {
    gameId(state) {
      return state.playlists.id
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

    room: async ({ getters }) => {
      subscribe(getters.gameId)
        .then(() => {
          listen("join", (data) => {
            console.log("joined", data);
          });
        });
    },

    play: ({ state, commit }, payload) => {
      commit("playing", payload);
      push("play", {
        url: payload
      });
    },

    pause: ({ state, commit }, payload) => {
      commit("playing", null);
      push("pause", {
        url: payload
      });
    }
  }
};
