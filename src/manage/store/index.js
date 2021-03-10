import Vuex from 'vuex';
import api from '../../api';
import { subscribe, listen, push } from '../../services/pusher';
import audioStore from '../../shared/stores/audio';

export default new Vuex.Store({
  state: {
    spotify: {
      connected: false,
      loading: false,
      error: null
    },
    playlists: {
      query: null,
      id: null,
      name: [],
      items: [],
      loading: false,
      error: null
    },
    tracks: {
      items: [],
      loading: false,
      error: null
    },
    clients: [
      /* {
        id: String,
        name: String,
        messages
      } */
    ]
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

    client: (state, payload) => {
      if (!payload.id) {
        return;
      }
      let items = [...state.clients];
      const itemIndex = items.findIndex(a => a.id === payload.id);
      if (itemIndex >= 0) {
        items[itemIndex] = {
          ...state.clients[itemIndex],
          ...payload
        };
      } else {
        items = [
          ...state.clients,
          payload
        ];
      }
      state.clients = [...items];
    }
  },

  getters: {
    gameId: (state) => {
      return state.playlists.id
    }
  },

  actions: {
    token: async ({ commit }) => {
      commit('spotify', { loading: true });
      let connected;
      try {
        await api.connect();
        connected = true;
        commit('spotify', { connected });
      } catch(err) {
        commit('spotify', { error: err });
      }
      commit('spotify', { loading: false });
      return connected;
    },

    search: ({ commit }, payload) => {
      commit('playlists', { query: payload, loading: true });
      api.search({ query: payload, type: 'playlist' })
        .then(body => {
          commit('playlists', {
            items: body.items
          });
        })
        .catch(err => {
          commit('playlists', { error: err });
        }).finally(() => {
          commit('playlists', { loading: false });
        });
    },

    playlist: async ({ commit }, { id, name }) => {
      commit('playlists', { id });
      commit('tracks', { loading: true });
      let body;
      try {
        body = await api.playlist({ id })
        commit('playlists', { name });
        const items = body.items.map(a => ({ ...a, artist: a.artists.join(', ') }));
        commit('tracks', { items });
      } catch(err) {
        commit('tracks', { error: err });
      }
      commit('tracks', { loading: false });
      return body;
    },

    room: async ({ getters, commit }) => {
      subscribe(getters.gameId)
        .then(() => {
          // Reconnect clients
          push(`room-${getters.gameId}`, {});
          listen(`join-${getters.gameId}`, ({ name, id }) => {
            commit('client', { name, id });
          });
        });
    },

    play: ({ state, commit }, payload) => {
      commit('audio/play');
      push('play', {
        url: payload
      });
    },

    pause: ({ state, commit }, payload) => {
      commit('audio/pause');
      push('pause', {
        url: payload
      });
    },

    resetTracks: ({ commit }) => {
      commit('tracks', { items: [] });
    }
  },

  modules: {
    audio: audioStore
  }
});
