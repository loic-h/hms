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
    }
  },

  actions: {
    fetch: async ({ getters, commit, dispatch }, { id, playlistId }) => {
      if (!id) {
        id = await dispatch('create', playlistId);
      }
      commit('id', id);
      const game = getters.itemById(id);
      if (!game) {
        return;
      }
      await dispatch('tracks/fetch', { id: game.playlistId }, {root: true });
      return game;
    },

    create: ({ commit, rootGetters }, playlistId) => {
      const playlist = rootGetters['playlists/itemById'](playlistId);
      const id = uid();
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

    room: async ({ state, commit, dispatch, rootState, rootGetters }) => {
      subscribe(state.id)
        .then(() => {
          // Reconnect clients
          push('room', {});
          listen('join', ({ name, id, gameId }) => {
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
            push('status', data);
          });
          listen('answers', ({ userId, trackId, items }) => {
            dispatch('users/answers', { userId, items, trackId, gameId: state.id }, { root: true });
          });
        });
    }
  }
}
