import { createStore } from 'vuex';
import server from './server';
import client from './client';


export default createStore({
  modules: {
    server,
    client
  }
});
