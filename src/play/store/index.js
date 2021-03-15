import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import audio from '../../shared/stores/audio';
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
      answers: state.game.answers
    }
  })
});

export default new Vuex.Store({
  modules: {
    audio,
    user,
    game,
    track
  },
  plugins: [vuexLocal.plugin]
});
