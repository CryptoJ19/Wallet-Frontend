import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';
import baseUrl from '../../config';

const apiUrl = 'https://test.cashflash.io/api';

export default {
  state: {
    profile: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      nickname: '',
    },
    isAuthorized: false,
  },
  actions: {
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
      document.location.replace(`${baseUrl}/authorization`);
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
    updateProfile(state, value) {
      state.profile.id = value.id;
      state.profile.email = value.email;
      state.profile.firstName = value.firstName;
      state.profile.lastName = value.lastName;
      // state.profile.nickname = value.nickname
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
