import { listen, push, subscribe } from '../../services/pusher';
import { nanoid } from 'nanoid';

export default {
  namespaced: true,

  state: {
    id: null,
    name: name,
    ready: false
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    name: (state, payload) => {
      state.name = payload;
    },

    ready: (state, payload) => {
      state.ready = payload;
    },
  },

  actions: {
    ready: ({ state, commit, dispatch, rootState }, { name }) => {
      if (!state.id) {
        commit('id', nanoid(6 ));
      }
      commit('ready', true);
      commit('name', name);
      subscribe(rootState.game.id)
        .then(() => {
          dispatch('join');
        });
      // Join on server reload
      listen('room', () => {
        dispatch('join');
        dispatch('audio/pause', null, { root: true });
      });

      listen('status', ({ title, src, currentTime, totalTracks }) => {
        if (src) {
          dispatch('audio/play', { src, currentTime }, { root: true });
        }
        commit('game/title', title, { root: true });
        commit('game/totalTracks', totalTracks, { root: true });
      });
    },

    join: ({ state, rootState }) => {
      push('join', {
        id: state.id,
        name: state.name,
        gameId: rootState.game.id
      });
    }
  }
};
