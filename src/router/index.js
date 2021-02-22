import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Client from '../views/Client.vue';
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
    name: 'Client',
    component: Client
  },
  {
    path: '/game/:id/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from) => {
      const id = to.params.id;
      if (id === store.state.server.playlists.id) {
        return true;
      }
      const playlist = await store.dispatch('server/playlist', id);
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
  if (store.state.server.spotify.connected || to.name === 'NotFound') {
    return true
  }
  const connected = await store.dispatch('server/token');
  if (!connected) {
    return { name: 'NotFound' };
  }
  return true;
});

export default router
