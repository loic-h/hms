import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import audio from '../../shared/stores/audio';
import audioNative from '../../shared/stores/audio-native';
import spotify from '../../shared/stores/spotify';
import user from './user';
import game from './game';
import track from './track';

const vuexLocal = new VuexPersistence({
  key: 'hms-play',
  storage: window.localStorage,
  reducer: state => ({
    user: {
      id: state.user.id,
      name: state.user.name
    },
    game: {
      id: state.game.id,
      answers: state.game.answers,
      connected: state.game.connected
    }
  })
});

export default new Vuex.Store({
  modules: {
    audio,
    audioNative,
    spotify,
    user,
    game,
    track
  },
  plugins: [vuexLocal.plugin]
});
