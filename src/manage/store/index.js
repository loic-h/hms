import Vuex from 'vuex';
import audio from '../../shared/stores/audio';
import playlists from './playlists';
import tracks from './tracks';
import games from './games';
import users from './users';

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  key: 'hms-manage',
  storage: window.localStorage,
  reducer: state => ({
    games: state.games,
    users: state.users
  })
});

export default new Vuex.Store({
  modules: {
    audio,
    playlists,
    tracks,
    games,
    users
  },

  plugins: [vuexLocal.plugin]
});
