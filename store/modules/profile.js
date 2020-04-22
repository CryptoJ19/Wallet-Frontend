import { customFetch, customFetchToken } from '../../helpers/customFetch';

export default {
  state: {
    email: '',
    isAuthorized: false,
  },
  actions: {
    async fetchForgotChange(ctx, data) {
      const rawResponse = await customFetch(
        'https://cashflash.hedpay.com/api/auth/restore/change',
        'POST',
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
    // logout(state) {
    //   state.email = '';
    //   state.isAuthorized = false;
    //   localStorage.removeItem('accessToken');
    //   localStorage.removeItem('refreshToken');
    //   sessionStorage.removeItem('accessToken');
    //   sessionStorage.removeItem('refreshToken');
    // },
    // updateIsAuthorized(state, value) {
    //   state.isAuthorized = value;
    // },
    // updateEmail(state, value) {
    //   state.email = value;
    // },
    // updateAccess(state, value) {
    //   localStorage.setItem('accessToken', value);
    // },
    // updateRefresh(state, value) {
    //   localStorage.setItem('refreshToken', value);
    // },
    // temporaryAccess(state, value) {
    //   sessionStorage.setItem('accessToken', value);
    // },
    // temporaryRefresh(state, value) {
    //   sessionStorage.setItem('refreshToken', value);
    // },
  },
  getters: {
    // getIsAuthorized(state) {
    //   return state.isAuthorized;
    // },
    // getEmail(state) {
    //   return state.email;
    // },
  },
};
