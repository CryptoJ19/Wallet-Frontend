import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';

const apiUrl = 'https://test.cashflash.io/api';

export default {
  state: {
    // GAToken: '',
    // GAEnabled: false,
  },
  actions: {

    async fetchSendWithdraw(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        console.log(header);
        const rawResponse = await customFetch(
          `${apiUrl}/wallet/withdraw`,
          'POST',
          header,
          data,
        );
        const content = await rawResponse.json();
        return content;
      });
      // if (res.ok) {
      //   ctx.commit('updateGAEnabled', false);
      // }
      return res;
    },

    async fetchGetWithdraw(ctx, currency) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        console.log(header);
        const rawResponse = await customFetch(
          `${apiUrl}/wallet/withdraw?currency=${currency}`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      // if (res.ok) {
      //   ctx.commit('updateGAEnabled', false);
      // }
      return res;
    },

    // async fetchCheckGA(ctx) {
    //   const res = await customFetchToken(ctx, async () => {
    //     const header = getHeaderWithToken();
    //     const rawResponse = await customFetch(
    //       `${apiUrl}/auth/totp/enabled`,
    //       'GET',
    //       header,
    //     );
    //     const content = await rawResponse.json();
    //     return content;
    //   });
    //   // console.log('fetchTempGAToken', res);
    //   if (res.ok && res.result.enabled) {
    //     ctx.commit('updateGAEnabled', true);
    //   } else if (res.ok && !res.result.enabled) {
    //     ctx.commit('updateGAEnabled', false);
    //   }
    //   return res;
    // },
  },
  mutations: {
    // updateGAEnabled(state, value) {
    //   state.GAEnabled = value;
    // },
    // updateGAToken(state, value) {
    //   state.GAToken = value.result.tempTotp;
    // },
  },
  getters: {
    // getGAEnabled(state) {
    //   return state.GAEnabled;
    // },
    // getGAToken(state) {
    //   return state.GAToken;
    // },
  },
};
