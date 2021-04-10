import Vuex from 'vuex';
import audio from '../../shared/stores/audio';
import audioNative from '../../shared/stores/audio-native';
import spotify from '../../shared/stores/spotify';
import playlists from './playlists';
import tracks from './tracks';
import games from './games';
import users from './users';
import player from './player';

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  key: 'hms-manage',
  storage: window.localStorage,
  reducer: state => ({
    games: state.games,
    users: state.users,
    spotify: { token: state.spotify.token }
  })
});

export default new Vuex.Store({
  modules: {
    audio,
    playlists,
    tracks,
    games,
    users,
    player,
    spotify,
    audioNative
  },

  plugins: [vuexLocal.plugin]
});
