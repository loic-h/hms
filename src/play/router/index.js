import { createRouter, createWebHistory } from 'vue-router';
import Client from '../views/Client.vue';
import NotFound from '../../shared/views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/play/:id',
    name: 'Client',
    component: Client,
    beforeEnter: (to) => {
      const gameId = to.params.id;
      store.commit('gameId', gameId);
    }
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
