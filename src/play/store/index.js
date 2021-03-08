import Vuex from "vuex";
import { listen, push, subscribe } from '../../services/pusher';
import { v4 as uuid } from 'uuid';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    id: state.id,
    name: state.name
  })
});

export default new Vuex.Store({
  state: {
    id: null,
    name: "",
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
  },

  plugins: [vuexLocal.plugin]
});
