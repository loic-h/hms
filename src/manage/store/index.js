import Vuex from 'vuex';
import api from '../../api';
import { subscribe, listen, push } from '../../services/pusher';
import audioStore from '../../shared/stores/audio';
import { nanoid } from 'nanoid';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    games: state.games
  })
});

export default new Vuex.Store({
  state: {
    spotify: {
      connected: false,
      loading: false,
      error: null
    },
    playlists: {
      query: null,
      name: [],
      items: [],
      loading: false,
      error: null
    },
    tracks: {
      id: null,
      items: [],
      loading: false,
      error: null
    },
    games: {
      id: null,
      items: [
        /* {
        id: String,
        playlistId: String,
        users: []
      } */
      ]
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
    },

    game: (state, payload) => {
      state.games.id = payload;
    },

    newGame: (state, payload) => {
      if (state.games.items.find(a => a.id === payload.id)) {
        return;
      }
      state.games.items = [
        ...state.games.items,
        {
          ...payload,
          users: []
        }
      ]
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
    },

    firstAvailableTrackId: (state, getters) => {
      if (getters.availableTracks.length <= 0) {
        return;
      }
      return getters.availableTracks[0].id;
    },

    trackById: (state) => id => {
      return state.tracks.items.find(a => a.id === id);
    },

    selectedTrack: (state, getters) => {
      return getters.trackById(state.tracks.id);
    },

    availableTracks: (state) => {
      return state.tracks.items.filter(a => a.preview);
    },

    totalAvailableTracks: (state, getters) => {
      return getters.availableTracks.length;
    },

    trackPosition: (state, getters) => id => {
      return getters.availableTracks.findIndex(a => a.id === id) + 1;
    },

    gameById: (state) => id => {
      return state.games.items.find(a => a.id === id);
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

    playlist: async ({ commit }, { id }) => {
      const gameId =
      commit('playlists', { id });
      commit('tracks', { loading: true });
      let body;
      try {
        body = await api.playlist({ id })
        const items = body.items.map(a => ({ ...a, artist: a.artists.join(', ') }));
        commit('playlists', { name: body.name });
        commit('tracks', { items });
      } catch(err) {
        commit('tracks', { error: err });
      }
      commit('tracks', { loading: false });
      return body;
    },

    game: async ({ getters, commit, dispatch }, { id, playlistId }) => {
      if (!id) {
        id = await dispatch('newGame', playlistId);
      }
      const game = getters.gameById(id);
      commit('game', game.id);
      await dispatch('playlist', { id: game.playlistId });
    },

    newGame: ({ commit }, playlistId) => {
      const id = nanoid(6);
      commit('newGame', { id, playlistId });
      return id;
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

    play: ({ getters, dispatch }, payload) => {
      const { preview } = getters.trackById(payload)
      dispatch('audio/play', payload, { root: true });
      push('play', {
        url: preview
      });
    },

    pause: ({ state, dispatch }, payload) => {
      dispatch('audio/pause', null, { root: true });
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
  },

  plugins: [vuexLocal.plugin]
});
