import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import NotFound from '../views/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game,
    beforeEnter: async (to, from) => {
      const id = to.params.id;
      if (id === store.state.playlists.id) {
        return true;
      }
      const playlist = await store.dispatch('playlist', id);
      if (!playlist) {
        return { name: 'NotFound' };
      }
      return true;
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
})

router.beforeEach(async (to, from) => {
  if (store.state.spotify.connected || to.name === 'NotFound') {
    return true
  }
  const connected = await store.dispatch("token");
  if (!connected) {
    return { name: 'NotFound' };
  }
  return true;
});

export default router
