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
      }
    }
  },

  {
    path: '/create/:playlistId',
    name: 'Create',
    beforeEnter: async (to) => {
      const { playlistId } = to.params;
      const game = await store.dispatch('games/fetch', { playlistId });
      return { path: game.manageUrl };
    }
  },

  {
    path: '/manage/:id/:trackId?',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from) => {
      const { id } = to.params;
      let game;
      try {
        game = await store.dispatch('games/fetch', { id });
      } catch(e) {
        console.log(e)
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
