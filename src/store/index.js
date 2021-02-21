import { createStore } from 'vuex'
import api from "../api";

export default createStore({
  state: {
    spotify: {
      on: false,
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
    }
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
    }
  },
  actions: {
    token: ({ commit }) => {
      commit("spotify", { loading: true });
      api.connect()
        .then(body => {
          commit("spotify", { on: true });
        })
        .catch(err => {
          commit("spotify", { error: err });
          console.log(err)
        })
        .finally(() => {
          commit("spotify", { loading: false });
        });
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

    playlist: ({ commit }, payload) => {
      commit("playlists", { id: payload, items: [] });
      commit("tracks", { loading: true });
      api.playlist({ id: payload })
        .then(body => {
          commit("tracks", {
            items: body.items
          });
        })
        .catch(err => {
          commit("tracks", { error: err });
        }).finally(() => {
          commit("tracks", { loading: false });
        });
    }
  }
});
