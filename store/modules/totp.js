import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';

const apiUrl = process.env.BASE_URL;

export default {
  state: {
    GAToken: '',
    GAEnabled: false,
  },
  actions: {

    async fetchDisableGA(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/totp/disable`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      if (res.ok) {
        ctx.commit('updateGAEnabled', false);
      }
      return res;
    },

    async fetchCheckGA(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/totp/enabled`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log('fetchTempGAToken', res);
      if (res.ok && res.result.enabled) {
        ctx.commit('updateGAEnabled', true);
      } else if (res.ok && !res.result.enabled) {
        ctx.commit('updateGAEnabled', false);
      }
      return res;
    },

    async fetchСonfirmationGA(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/totp/validate`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      // console.log('fetchTempGAToken', res);
      if (res.ok) {
        ctx.commit('updateGAEnabled', true);
      }
      return res;
    },

    async fetchTempGAToken(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/auth/totp/enable`,
          'POST',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      console.log('fetchTempGAToken', res);
      if (res.ok) {
        ctx.commit('updateGAToken', res);
      }
      return res;
    },
  },
  mutations: {
    updateGAEnabled(state, value) {
      state.GAEnabled = value;
    },
    updateGAToken(state, value) {
      state.GAToken = value.result.tempTotp;
    },
  },
  getters: {
    getGAEnabled(state) {
      return state.GAEnabled;
    },
    getGAToken(state) {
      console.log(state);
      return state.GAToken;
    },
  },
};
