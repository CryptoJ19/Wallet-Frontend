import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import totp from './modules/totp';
import transactions from './modules/transactions';
import referal from './modules/referal';
import verification from './modules/verification';

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      totp,
      transactions,
      referal,
      verification,
    },
  });

export default store;
