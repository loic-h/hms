import { push, subscribe } from '../services/pusher';
import { v4 as uuid } from 'uuid';

export default {
  namespaced: true,

  state: {
    id: null,
    name: null,
    ready: false
  },

  mutations: {
    name: (state, payload) => {
      state.name = payload;
      localStorage.setItem('playerName', state.name);
    },

    id: (state, payload) => {
      state.id = payload;
      localStorage.setItem('playerId', state.id);
    },

    ready: (state, payload) => {
      state.ready = payload;
    },

    gameId: (state, payload) => {
      state.gameId = payload;
    }
  },

  actions: {
    load: ({ commit }) => {
      const id = localStorage.getItem('playerId') || uuid();
      const name = localStorage.getItem('playerName');
      console.log(id)
      commit('id', id);
      commit('name', name);
    },
    ready: ({ state, commit }, { name }) => {
      commit('ready', true);
      commit('name', name);
      subscribe(state.gameId)
        .then(() => {
          push('join', {
            id: state.id,
            name: state.name
          });
        });
    }
  }
};
