import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../../shared/views/NotFound.vue';
import store from '../store';
import { connectPlay } from "../../services/spotify";

const routes = [
  {
    path: '/play/:id?',
    name: 'Home',
    component: Home,
    beforeEnter: (to) => {
      if (to.params.id) {
        store.commit('game/id', to.params.id);
      }

      if (to.query.connected) {
        store.commit('game/connected', to.query.connected);
        connectPlay();
      }

      const hashParams = new URLSearchParams(to.hash.slice(1));
      if (hashParams.get('token_type') === 'Bearer') {
        store.dispatch('spotify/token', hashParams.get('access_token'));
        console.log(store.state.game.id)
        if (store.state.game.id) {
          return { name: 'Home', params: { id: store.state.game.id } };
        }
      }
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
