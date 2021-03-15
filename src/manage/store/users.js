export default {
  namespaced: true,

  state: {
    items: [
      /* {
        id: String,
        name: String,
        gameIds: []
      } */
    ],
    answers: [/*
      {
        gameId,
        trackId,
        userId,
        score,
        items: []
      }
    */]
  },

  mutations: {
    items: (state, payload) => {
      state.items = payload;
    },

    item: (state, payload) => {
      if (!payload.id) {
        return;
      }

      const index = state.items.findIndex(a => a.id === payload.id);
      if (index < 0) {
        state.items = [
          ...state.items,
          {
            id: payload.id,
            name: payload.name,
            gameIds: [payload.gameId],
            scores: {},
            answers: []
          }
        ];
      } else {
        const items = [...state.items];
        const gameIds = items[index].gameIds || [];
        if (!gameIds.includes(payload.gameId)) {
          gameIds.push(payload.gameId);
          payload.gameIds = gameIds;
        }
        delete payload.gameId;
        items[index] = {
          ...items[index],
          ...payload
        };
        state.items = [ ...items ];
      }
    },

    removeItem: (state, payload) => {
      state.items = [...state.items.filter(a => a.id !== payload)];
    },

    answers: (state, payload) => {
      state.answers = payload;
    }
  },

  getters: {
    itemById: (state) => id => {
      return state.items.find(a => a.id === id);
    },

    usersByAnswers: (state, getters, rootState) => id => {
      return state.items
        .filter(a => [...a.gameIds].includes(rootState.games.id))
        .map(user => {
        const answer = state.answers.find(a => {
          return a.userId === user.id && a.trackId === id && a.gameId === rootState.games.id
        }) || { score: 0, items: [] };
        return {
          ...user,
          answers: answer.items,
          score: answer.score
        };
      })
    },

    score: (state, getters, rootState) => (userId) => {
      const score = state.answers.reduce((a, v) => {
        if (v.userId === userId && v.gameId === rootState.games.id) {
          a += v.score;
        }
        return a;
      }, 0);
      return score
    }
  },

  actions: {
    score: ({ state, commit, rootState }, { userId, value }) => {
      const trackId = rootState.tracks.id;
      const gameId = rootState.games.id;
      let answers = [...state.answers];
      let answersIndex = answers.findIndex(a => {
        return a.gameId === gameId && a.trackId === trackId && a.userId === userId
      });
      answers[answersIndex].score = value;
      commit('answers', answers);
    },

    answers: ({ state, commit }, { userId, items, trackId, gameId }) => {
      let answers = [...state.answers];
      let answersIndex = answers.findIndex(a => {
        return a.gameId === gameId && a.trackId === trackId && a.userId === userId
      });
      if (answersIndex >= 0) {
        answers[answersIndex].items = items;
      } else {
        answers.push({
          gameId,
          trackId,
          userId,
          items,
          score: 0
        });
      }
      commit('answers', answers);
    }
  }
}
