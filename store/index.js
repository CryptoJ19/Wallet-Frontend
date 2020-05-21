import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import totp from './modules/totp';
import transactions from './modules/transactions';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    auth,
    totp,
    transactions,
  },
});

export default store;
