import { customFetch, customFetchToken } from '../../helpers/customFetch';

export default {
  state: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  },
  actions: {
    async fetchSignin(ctx, data) {
      const rawResponse = await customFetch(
        'https://cashflash.hedpay.com/api/auth/login',
        'POST',
        data.data,
      );
      const content = await rawResponse.json();
      if (content.ok) {
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
        let token;
        if (localStorage.getItem('accessToken') !== null) {
          token = localStorage.getItem('accessToken');
        } else {
          token = sessionStorage.getItem('accessToken');
        }
        const header = {
          Authorization: `Bearer ${token}`,
        };
        const rawResponse = await customFetch(
          'https://cashflash.hedpay.com/api/auth/validate-email',
          'POST',
          data,
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log(res);
      return res;
    },
  },
  mutations: {
    updateAccess(state, value) {
      localStorage.setItem('accessToken', value);
      state.accessToken = value;
    },
    updateRefresh(state, value) {
      localStorage.setItem('refreshToken', value);
      state.refreshToken = value;
    },
    temporaryAccess(state, value) {
      sessionStorage.setItem('accessToken', value);
      state.accessToken = value;
    },
    temporaryRefresh(state, value) {
      sessionStorage.setItem('refreshToken', value);
      state.refreshToken = value;
    },
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
  },
};
