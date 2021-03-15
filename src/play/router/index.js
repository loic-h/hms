import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../../shared/views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/play/:id',
    name: 'Home',
    component: Home,
    beforeEnter: (to) => {
      store.commit('game/id', to.params.id);
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
