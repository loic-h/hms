import Vuex from "vuex";
import { listen, push, subscribe } from '../../services/pusher';
import { nanoid } from 'nanoid';
import VuexPersistence from 'vuex-persist'
import audio from '../../shared/stores/audio';

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
    ready: false,
    gameId: null,
    gameTitle: null,
    trackUrl: null,
    trackOrder: null
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    ready: (state, payload) => {
      state.ready = payload;
    },

    gameId: (state, payload) => {
      state.gameId = payload;
    },

    gameTitle: (state, payload) => {
      state.gameTitle = payload;
    }
  },

  actions: {
    game: ({ commit }, payload) => {
      commit('gameId', payload);
    },

    ready: ({ state, commit, dispatch }, { name }) => {
      if (!state.id) {
        commit('id', nanoid(6 ));
      }
      commit('ready', true);
      subscribe(state.gameId)
        .then(() => {
          dispatch('join');
        });
      // Join on server reload
      listen(`room-${state.gameId}`, ({ title }) => {
        dispatch('join');
        dispatch('audio/pause', null, { root: true });
      });

      listen(`status-${state.gameId}`, ({ title, src, currentTime }) => {
        if (src) {
          dispatch('audio/play', { src, currentTime }, { root: true });
        }
        commit('gameTitle', title);
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

  modules: {
    audio
  },

  plugins: [vuexLocal.plugin]
});
