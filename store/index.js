import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import totp from './modules/totp';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    auth,
    totp,
  },
});

export default store;
