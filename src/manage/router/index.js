import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import NotFound from '../../shared/views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to) => {
      const hashParams = new URLSearchParams(to.hash.slice(1));
      if (hashParams.get('token_type') === 'Bearer') {
        store.dispatch('spotify/token', hashParams.get('access_token'));
        if (store.state.games.id) {
          return { name: 'Admin', params: { id: store.state.games.id } };
        }
      }
      store.commit('games/id', null);
    }
  },

  {
    path: '/create/:playlistId',
    name: 'Create',
    beforeEnter: async (to) => {
      const { playlistId } = to.params;
      let { connected } = to.query;
      connected = connected && !!parseInt(connected);
      const game = await store.dispatch('games/fetch', { playlistId, connected });
      return { path: game.manageUrl };
    }
  },

  {
    path: '/manage/:id?/:trackId?',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from) => {
      let { id } = to.params;
      if (!id) {
        return { name: 'Home' };
      }
      let game;
      try {
        game = await store.dispatch('games/fetch', { id });
      } catch(e) {
        console.log('Error fetching game', e);
      }
      if (!game) {
        return { name: 'Home' };
      }
      return true;
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0
    }
  }
});

export default router
