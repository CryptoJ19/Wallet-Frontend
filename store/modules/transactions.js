import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';

const apiUrl = process.env.BASE_URL;

export default {
  actions: {

    async fetchGetDeposit(ctx, currency) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        console.log(header);
        const rawResponse = await customFetch(
          `${apiUrl}/wallet/deposit?currency=${currency}`,
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
