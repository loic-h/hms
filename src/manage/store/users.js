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
        },
      } */
    ]
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
            scores: {}
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
      state.users = [...state.users.filter(a => a.id !== payload)];
    }
  },

  getters: {
    itemById: (state) => id => {
      return state.items.find(a => a.id === id);
    },
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
  }
}
