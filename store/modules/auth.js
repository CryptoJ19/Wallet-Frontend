const customFetch = (url, method, data) => fetch(url, {
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export default {
  state: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  },
  actions: {
    async fetchSignin(ctx, data, remember, successCallback, errorCallback) {
      const rawResponse = await customFetch(
        'https://cashflash.hedpay.com/api/auth/login',
        'POST',
        data,
      );
      const content = await rawResponse.json();
      console.log('fetchSignin', content);
      if (content.ok) {
        if (remember) {
          ctx.commit('updateAccess', content);
          ctx.commit('updateRefresh', content);
        }
        successCallback();
      }
      console.log(ctx, data, remember, successCallback, errorCallback);
      if (errorCallback) errorCallback(content);
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
        ctx.commit('updateAccess', content);
        ctx.commit('updateRefresh', content);
        return true;
      }
      return false;
    },

    async fetchValidateEmail(ctx, data) {
      const rawResponse = await customFetch(
        'https://cashflash.hedpay.com/api/auth/validate-email',
        'POST',
        data,
      );
      const content = await rawResponse.json();
      console.log('fetchValidateEmail', content);
      if (content.ok) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    updateAccess(state, data) {
      localStorage.setItem('accessToken', data.result.access);
      state.accessToken = data.result.access;
    },
    updateRefresh(state, data) {
      localStorage.setItem('refreshToken', data.result.refresh);
      state.refreshToken = data.result.refresh;
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
