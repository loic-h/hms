import { push } from '../../services/pusher';

const ANSWER_LIMIT = 3;

export default {
  namespaced: true,

  state: {
    id: null,
    title: null,
    totalTracks: null,
    answers: [/*
      {
        gameId,
        trackId,
        items: []
      }
    */]
  },

  mutations: {
    id: (state, payload) => {
      state.id = payload;
    },

    title: (state, payload) => {
      state.title = payload;
    },

    answers: (state, payload) => {
      state.answers = payload;
    },

    totalTracks: (state, payload) => {
      state.totalTracks = payload;
    },
  },

  getters: {
    answers: (state, getters, rootState) => {
      return state.answers.find(a => a.gameId === state.gameId && a.trackId === rootState.track.id);

    },
    answersItems: (state, getters) => {
      return getters.answers ? getters.answers.items : [];
    }
  },

  actions: {
    answer: ({ state, commit, rootState }, payload) => {
      const stateAnswers = [...state.answers];
      let answerIndex = stateAnswers.findIndex(a => a.gameId === state.gameId && a.trackId === rootState.track.id);
      if (answerIndex < 0) {
        stateAnswers.push({
          gameId: state.gameId,
          trackId: rootState.track.id,
          items: []
        });
        answerIndex = stateAnswers.length - 1;
      }
      let items = stateAnswers[answerIndex].items;
      items.unshift(payload);
      items = items.slice(0, ANSWER_LIMIT);
      stateAnswers[answerIndex] = {
        ...stateAnswers[answerIndex],
        items
      };
      commit('answers', stateAnswers);
      push('answers', {
        items,
        userId: rootState.user.id,
        trackId: rootState.track.id
      });
    },

    removeAnswer: ({ state, commit, rootState }, index) => {
      const stateAnswers = [...state.answers];
      let answerIndex = stateAnswers.findIndex(a => a.gameId === state.gameId && a.trackId === rootState.track.id);
      let items = stateAnswers[answerIndex].items;
      items.splice(index, 1);
      items = items.slice(0, ANSWER_LIMIT);
      stateAnswers[answerIndex] = {
        ...stateAnswers[answerIndex],
        items
      };
      commit('answers', stateAnswers);
      push('answers', {
        items,
        userId: rootState.user.id,
        trackId: rootState.track.id
      });
    }
  }
}
