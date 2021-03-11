import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import NotFound from '../../shared/views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/create/:playlistId',
    name: 'Create',
    beforeEnter: async (to) => {
      const { playlistId } = to.params;
      const game = await store.dispatch('game', { playlistId });
      return { path: `/manage/${game.id}` };
    }
  },

  {
    path: '/manage/:id/:trackId?',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from) => {
      const { id } = to.params;
      await store.dispatch('game', { id });
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
  routes
});

export default router
