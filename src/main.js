import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io-client';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

  const socket = io(window.location.origin);
