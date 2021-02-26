import {
  customFetch,
  customFetchToken,
  getHeaderWithToken,
  customFetchFormdata,
} from '../../helpers/customFetch';

const apiUrl = process.env.BASE_URL;

export default {
  state: {
    profile: {},
    countryFields: {},
    transactions: {},
    isAuthorized: false,
    docFiles: [],
    countries: {},
    currencies: [],
    bonuses: [],
    myBonuses: [],
  },
  actions: {
    async fetchPostPurchaseBuycft(ctx, data) {
      console.log(data);
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetchFormdata(
          `${apiUrl}/purchase/buy-cft`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    async fetchGetCurrencies(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const rawResponse = await customFetch(`${apiUrl}/currencies`, 'GET');
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateCurrencies', res.result);
      }
      return res;
    },

    async fetchGetMyBonuses(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/purchase/my-bonuses`, 'GET', header);
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateMyBonuses', res.result);
      }
      return res;
    },

    async fetchGetBonusesList(ctx) {
      const rawResponse = await customFetch(`${apiUrl}/purchase/bonuses`, 'GET');
      const res = await rawResponse.json();
      if (res.ok) {
        ctx.commit('updateBonuses', res.result);
      }
      return res;
    },

    async fetchGetCountries(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const rawResponse = await customFetch(`${apiUrl}/auth/get-countries`, 'GET');
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateCountries', res.result);
      }
      return res;
    },

    async fetchDelDocFiles(ctx, i) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/documents?id=${i}`,
          'DELETE',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    async fetchVerifyProfile(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/profile/verify`, 'PUT', header);
        const content = await rawResponse.json();
        return content;
      });
      // if (res.ok) {
      // }
      return res;
    },

    async fetchGetDocFiles(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/profile/me/documents`, 'GET', header);
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateDocFile', res.result);
      }
      return res;
    },

    async fetchPostDocFiles(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetchFormdata(
          `${apiUrl}/profile/me/documents`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    async fetchGetTransactions(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/txs?limit=${data.limit}&offset=${data.limit * (data.page - 1)}`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateTransactions', res.result);
      }
      return res;
    },

    async fetchEditProfilePassword(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/profile/me/password`, 'PUT', header, data);
        const content = await rawResponse.json();
        return content;
      });
      console.log('fetchEditProfilePassword', res);
      return res;
    },

    async fetchEditFormPerson(ctx, payload) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/form/${payload.tab}`,
          'POST',
          header,
          payload.data,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log('fetchEditProfile', res);
      return res;
    },

    async fetchEditProfile(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/profile/me`, 'PUT', header, data);
        const content = await rawResponse.json();
        return content;
      });
      // console.log('fetchEditProfile', res);
      return res;
    },

    async fetchSendValidation(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/auth/send-validation`, 'GET', header);
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    logout(ctx) {
      ctx.commit('logout');
      document.location.replace(`http://${window.location.host}/app/authorization`);
    },
    async fetchGetProfile(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(`${apiUrl}/profile/me`, 'GET', header);
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateProfile', res.result);
        ctx.commit('updateIsAuthorized', true);
        ctx.commit('updateCountry', res.result?.country);
      }
      return res;
    },
    async fetchForgotChange(ctx, data) {
      const rawResponse = await customFetch(`${apiUrl}/auth/restore/change`, 'POST', null, data);
      const content = await rawResponse.json();
      console.log('fetchForgotChange', content);
      return content;
    },

    async fetchForgotSend(ctx, data) {
      const rawResponse = await customFetch(`${apiUrl}/auth/restore/send`, 'POST', null, data);
      const content = await rawResponse.json();
      console.log('fetchForgotSend', content);
      return content;
    },
    async fetchSignin(ctx, data) {
      const rawResponse = await customFetch(`${apiUrl}/auth/login`, 'POST', null, data.data);
      const content = await rawResponse.json();

      if (content.ok) {
        ctx.commit('updateIsAuthorized', true);
        if (data.remember) {
          ctx.commit('updateAccess', content.result.access);
          ctx.commit('updateRefresh', content.result.refresh);
        } else {
          ctx.commit('temporaryAccess', content.result.access);
          ctx.commit('temporaryRefresh', content.result.refresh);
        }
      }
      return content;
    },
    async fetchSignup(ctx, data) {
      const rawResponse = await customFetch(`${apiUrl}/auth/register`, 'POST', null, data);
      const content = await rawResponse.json();
      console.log('fetchSignup', content);
      if (content.ok) {
        ctx.commit('updateAccess', content.result.access);
        ctx.commit('updateRefresh', content.result.refresh);
      }
      return content;
    },
    async fetchValidateEmail(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/validate-email`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },
  },
  mutations: {
    updateCountry(state, country){
      state.country = country;
    },
    logout(state) {
      state.profile = {};
      state.transactions = {};
      state.isAuthorized = false;
      state.referal = {};
      state.docFiles = [];
      state.countries = {};
      state.currencies = [];
      state.bonuses = [];
      state.myBonuses = [];
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    updateTransactions(state, value) {
      state.transactions = value;
    },
    updateIsAuthorized(state, value) {
      state.isAuthorized = value;
    },
    updateProfile(state, value) {
      state.profile = {
        ...value,
      };
    },
    updateAccess(state, value) {
      localStorage.setItem('accessToken', value);
    },
    updateRefresh(state, value) {
      localStorage.setItem('refreshToken', value);
    },
    temporaryAccess(state, value) {
      sessionStorage.setItem('accessToken', value);
    },
    temporaryRefresh(state, value) {
      sessionStorage.setItem('refreshToken', value);
    },
    updateDocFile(state, value) {
      state.docFiles = value;
    },
    updateCountries(state, value) {
      state.countries = value;
    },
    updateCurrencies(state, value) {
      state.currencies = value;
    },
    updateBonuses(state, value) {
      state.bonuses = value;
    },
    updateMyBonuses(state, value) {
      state.myBonuses = value.bonuses;
    },
    updateCountryFields(state, value) {
      state.countryFields = { ...value };
    },
  },
  getters: {
    getTransactionCount(state) {
      if (state.transactions.count) {
        return state.transactions.count;
      }
      return 1;
    },
    getTransactionList(state) {
      if (state.transactions.txs) {
        return state.transactions.txs;
      }
      return false;
    },
    getWallets(state) {
      return state.profile.wallets;
    },
    getAvatar(state) {
      return state.profile.avatar;
    },
    getProfile(state) {
      return state.profile;
    },
    getIsAuthorized(state) {
      return state.isAuthorized;
    },
    getEmail(state) {
      return state.email;
    },
    getDocFile(state) {
      return state.docFiles;
    },
    getCountris(state) {
      const obj = { ...state.profile.countryCodes };
      const newArr = [];
      Object.keys(obj).forEach((item) => {
        newArr.push({ short: item, full: obj[item] });
      });
      return newArr;
    },
    getCountriesReg(state) {
      return state.countries;
    },
    getCountriesRegSort(state) {
      const obj = { ...state.countries };
      const newArr = [];
      Object.keys(obj).forEach((item) => {
        newArr.push({ short: item, full: obj[item] });
      });
      return newArr;
    },
    getCurrencies(state) {
      return state.currencies;
    },
    getBonuses(state) {
      return state.bonuses;
    },
    getMyBonuses(state) {
      return state.myBonuses.reverse();
    },
    getCountryFields(state) {
      return state.countryFields;
    },
    getCurrencyByName: (state) => (currency) =>
      state.currencies.find((item) => {
        if (item.id.toUpperCase() === currency) {
          return item;
        }
        return false;
      }),
  },
};
