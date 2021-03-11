import Vuex from "vuex";
import { listen, push, subscribe } from '../../services/pusher';
import { nanoid } from 'nanoid';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'hms-play',
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
    },

    id: (state, payload) => {
      state.id = payload;
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
      if (!state.id) {
        commit('id', nanoid(6 ));
      }
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
        name: state.name,
        gameId: state.gameId
      });
    }
  },

  plugins: [vuexLocal.plugin]
});
