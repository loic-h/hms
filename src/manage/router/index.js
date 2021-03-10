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
    path: '/manage/:id',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from) => {
      const id = to.params.id;
      if (id === store.state.playlists.id) {
        return true;
      }
      const playlist = await store.dispatch('playlist', { id });
      console.log(id, playlist)
      if (!playlist) {
        // return { name: 'NotFound' };
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
});

export default router
