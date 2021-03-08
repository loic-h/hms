import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "../styles/variables.scss";
// import "../styles/reset.css";

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
