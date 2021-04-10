import { subscribe, listen, push } from '../../services/pusher';
import uid from '../../utils/uid';

export default {
  namespaced: true,

  state: {
    id: null,
    items: [
    /* {
      id: String,
      playlistId: String,
      name: String,
      connected: false // Use spotify SDK to play music
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
        if (a.connected) {
          playUrl.searchParams.append('connected', a.connected);
        }
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

    users: (state, getters, rootState, rootGetters) => {
      return rootState.users.items.filter(a => a.gameIds && a.gameIds.includes(state.id))
        .map(a => ({
          ...a,
          score: rootGetters['users/score'](a.id)
        }))
        .sort((a, b) => b.score - a.score);
    },

    trackUrl: (state, getters) => id => {
      return `${getters.currentItem.manageUrl}/${id}`;
    },

    isGameConnected: (state, getters) => {
      if (!getters.currentItem) {
        return;
      }
      return !!getters.currentItem.connected;
    }
  },

  actions: {
    fetch: async ({ getters, commit, dispatch }, { id, playlistId, connected }) => {
      if (!id) {
        id = await dispatch('create', { playlistId, connected });
      }
      commit('id', id);

      const game = getters.itemById(id);
      if (!game) {
        return;
      }
      await dispatch('tracks/fetch', { id: game.playlistId }, {root: true });

      if (game.connected) {
        dispatch('spotify/loadPlayer', null, { root: true });
      }

      return game;
    },

    create: ({ commit, rootGetters }, { playlistId, connected }) => {
      const playlist = rootGetters['playlists/itemById'](playlistId);
      const id = uid();
      commit('addItem', {
        id,
        playlistId,
        name: playlist.name,
        connected
      });
      return id;
    },

    remove: ({ commit }, id) => {
      commit('removeItem', id);
      commit('id', null);
    },

    room: async ({ state, getters, commit, dispatch, rootState, rootGetters }) => {
      subscribe(state.id)
        .then(() => {
          // Reconnect clients
          push('room', {});
          listen('join', ({ name, id, gameId }) => {
            commit('users/item', { name, id, gameId }, { root: true });
            const game = getters.itemById(gameId);
            let data = {
              title: rootGetters['playlists/name'],
              totalTracks: rootGetters['tracks/totalAvailableItems'],
              connect: game.connected
            };
            if (rootState.audio.playing) {
              data = {
                ...data,
                src: rootState.audio.src,
                currentTime: rootState.audio.currentTime
              };
            }
            push('status', data);
          });
          listen('answers', ({ userId, trackId, items }) => {
            dispatch('users/answers', { userId, items, trackId, gameId: state.id }, { root: true });
          });
        });
    }
  }
}
