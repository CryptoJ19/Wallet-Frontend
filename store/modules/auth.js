import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';
import { baseUrl, apiUrl } from '../../config';

export default {
  state: {
    profile: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      nickname: '',
      wallets: [],
    },
    transactions: {},
    isAuthorized: false,
  },
  actions: {
    async fetchDelDocFiles(ctx, i) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/documents?id=${i} `,
          'DELETE',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    async fetchGetDocFiles(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/documents`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    async fetchPostDocFiles(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        // console.log(header);
        header['content-type'] = 'multipart/form-data';
        const rawResponse = await customFetch(
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

    async fetchGetTransactions(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/txs`,
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
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me/password`,
          'PUT',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      console.log('fetchEditProfilePassword', res);
      return res;
    },

    async fetchEditProfile(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me`,
          'PUT',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log('fetchEditProfile', res);
      return res;
    },

    async fetchSendValidation(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/send-validation`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      return res;
    },

    logout(ctx) {
      ctx.commit('logout');
      document.location.replace(`${baseUrl}/app/authorization`);
    },
    async fetchGetProfile(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/profile/me`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateProfile', res.result);
        ctx.commit('updateIsAuthorized', true);
      }
      return res;
    },
    async fetchForgotChange(ctx, data) {
      const rawResponse = await customFetch(
        `${apiUrl}/auth/restore/change`,
        'POST',
        null,
        data,
      );
      const content = await rawResponse.json();
      console.log('fetchForgotChange', content);
      return content;
    },

    async fetchForgotSend(ctx, data) {
      const rawResponse = await customFetch(
        `${apiUrl}/auth/restore/send`,
        'POST',
        null,
        data,
      );
      const content = await rawResponse.json();
      console.log('fetchForgotSend', content);
      return content;
    },
    async fetchSignin(ctx, data) {
      const rawResponse = await customFetch(
        `${apiUrl}/auth/login`,
        'POST',
        null,
        data.data,
      );
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
      const rawResponse = await customFetch(
        `${apiUrl}/auth/register`,
        'POST',
        null,
        data,
      );
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
    logout(state) {
      state.profile = {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        nickname: '',
        wallets: [],
      };
      state.transactions = {};
      state.isAuthorized = false;
      state.referal = {};
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
        birth: '',
        placeBirth: '',
        docIdent: '',
        docNum: '',
        releaseDate: '',
        expireDate: '',
        docIdentCopy: '',
        docIdentCopyFile: '',
        state: '',
        street: '',
        city: '',
        cap: '',
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
  },
  getters: {
    getTransactionList(state) {
      if (state.transactions.txs) {
        return state.transactions.txs;
      }
      return false;
    },
    getWallets(state) {
      return state.profile.wallets;
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
  },
};
