import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../styles/index.scss';
import directives from '../directives';

const app = createApp(App);

for (let [key, value] of Object.entries(directives)) {
  app.directive(key, value)
}

app
  .use(store)
  .use(router)
  .mount('#app');
