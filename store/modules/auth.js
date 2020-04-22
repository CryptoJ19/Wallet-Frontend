import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';

export default {
  state: {
    email: '',
    isAuthorized: false,
  },
  actions: {
    async fetchGetProfile(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          'https://cashflash.hedpay.com/api/profile/me',
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log(res);
      return res;
    },
    async fetchForgotChange(ctx, data) {
      const rawResponse = await customFetch(
        'https://cashflash.hedpay.com/api/auth/restore/change',
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
        'https://cashflash.hedpay.com/api/auth/restore/send',
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
        'https://cashflash.hedpay.com/api/auth/login',
        'POST',
        null,
        data.data,
      );
      const content = await rawResponse.json();
      if (content.ok) {
        console.log('data.data.email', data, data.data.email);
        ctx.commit('updateEmail', data.data.email);
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
        'https://cashflash.hedpay.com/api/auth/register',
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
          'https://cashflash.hedpay.com/api/auth/validate-email',
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
      state.email = '';
      state.isAuthorized = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    updateIsAuthorized(state, value) {
      state.isAuthorized = value;
    },
    updateEmail(state, value) {
      state.email = value;
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
    getIsAuthorized(state) {
      return state.isAuthorized;
    },
    getEmail(state) {
      return state.email;
    },
  },
};
