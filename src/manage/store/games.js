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
    decoratedItems: (state) => {
      return [...state.items].map(a => {
        const playUrl = new URL(`/play/${a.id}`, window.location.origin);
        // playUrl.searchParams.append('pid', a.playlistId);
        return {
          ...a,
          playUrl: playUrl.toString(),
          manageUrl: `/manage/${a.id}`
        };
      })
    },

    itemById: (state, getters) => id => {
      return getters.decoratedItems.find(a => a.id === id);
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
        name: playlist.name
      });
      return id;
    },

    remove: ({ commit }, id) => {
      commit('removeItem', id);
      commit('id', null);
    },

    room: async ({ state, commit, rootState, rootGetters }) => {
      subscribe(state.id)
        .then(() => {
          // Reconnect clients
          push(`room-${state.id}`, {});
          listen(`join-${state.id}`, ({ name, id, gameId }) => {
            commit('users/item', { name, id, gameId }, { root: true });
            let data = {
              title: rootGetters['playlists/name'],
              totalTracks: rootGetters['tracks/totalAvailableItems']
            };
            if (rootState.audio.playing) {
              data = {
                ...data,
                src: rootState.audio.src,
                currentTime: rootState.audio.currentTime
              };
            }
            push(`status-${state.id}`, data);
          });
        });
    }
  }
}
