import { subscribe, listen, push } from '../../services/pusher';
import { nanoid } from 'nanoid';

export default {
  namespaced: true,

  state: {
    id: null,
    items: [
    /* {
      id: String,
      playlistId: String,
      name: String
    } */
    ]
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    items: (state, payload) => {
      state.items = payload;
    },

    addItem: (state, payload) => {
      state.items = [
        ...state.items,
        payload
      ]
    },

    removeItem: (state, payload) => {
      const items = [...state.items];
      const index = items.findIndex(a => a.id === payload);
      items.splice(index, 1);
      state.items = [...items];
    }
  },

  getters: {
    itemById: (state) => id => {
      return state.items.find(a => a.id === id);
    },

    currentItem: (state, getters) => {
      return getters.itemById(state.id);
    },

    users: (state, getters, rootState) => {
      return rootState.users.items.filter(a => a.gameIds && a.gameIds.includes(state.id))
        .map(a => ({
          ...a,
          score: a.scores[state.id] || 0
        }))
        .sort((a, b) => b - a);
    }
  },

  actions: {
    fetch: async ({ getters, commit, dispatch }, { id, playlistId }) => {
      if (!id) {
        id = await dispatch('create', playlistId);
      }
      commit('id', id);
      const game = getters.itemById(id);
      await dispatch('tracks/fetch', { id: game.playlistId }, {root: true });
      return game;
    },

    create: ({ commit, rootGetters }, playlistId) => {
      const playlist = rootGetters['playlists/itemById'](playlistId);
      const id = nanoid(6);
      commit('addItem', {
        id,
        playlistId,
        name: playlist.name,
        manageUrl: `/manage/${id}`,
        playUrl: new URL(`/play/${id}`, window.location.origin).toString()
      });
      return id;
    },

    remove: ({ commit }, id) => {
      commit('removeItem', id);
      commit('id', null);
    },

    room: async ({ state, commit }) => {
      subscribe(state.id)
        .then(() => {
          // Reconnect clients
          push(`room-${state.id}`, {});
          listen(`join-${state.id}`, ({ name, id, gameId }) => {
            commit('users/item', { name, id, gameId }, { root: true });
          });
        });
    },

    play: ({ rootGetters, dispatch }, payload) => {
      const { preview } = rootGetters['tracks/itemById'](payload)
      dispatch('audio/play', payload, { root: true });
      push('play', {
        url: preview
      });
    },

    pause: ({ dispatch }, payload) => {
      dispatch('audio/pause', null, { root: true });
      push('pause', {
        url: payload
      });
    },
  }
}
