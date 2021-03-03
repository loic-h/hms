import Vuex from "vuex";
import { listen, push, subscribe } from '../../services/pusher';
import { v4 as uuid } from 'uuid';

export default new Vuex.Store({
  state: {
    id: null,
    name: null,
    ready: false,
    gameId: null
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
      commit('id', id);
      commit('name', name);
    },
    ready: ({ state, commit, dispatch }, { name }) => {
      commit('ready', true);
      commit('name', name);
      subscribe(state.gameId)
      .then(() => {
        dispatch('join');
      });
      // Join on server reload
      listen(`room-${state.gameId}`, () => {
        dispatch('join')
      });
    },
    join: ({ state }) => {
      push(`join-${state.gameId}`, {
        id: state.id,
        name: state.name
      });
    }
  }
});
