export default {
  namespaced: true,

  state: {
    items: [
      /* {
        id: String,
        name: String,
        gameIds: [],
        scores: {
          gameId: 0
        }
      } */
    ],
    answers: [/*
      {
        gameId,
        trackId,
        userId,
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
      const answers = state.answers.filter(a => {
        return a.trackId === id && a.gameId === rootState.games.id
      });
      return answers.map(a => {
        const user = getters.itemById(a.userId);
        return {
          ...user,
          answers: a.items
        };
      })
    }
  },

  actions: {
    modifyScore: ({ commit, getters }, { value, userId, gameId }) => {
      const user = getters.itemById(userId);
      const scores = { ...user.scores };
      scores[gameId] = value;
      commit('item', {
        id: userId,
        scores
      });
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
          items
        });
      }
      commit('answers', answers);
    }
  }
}
