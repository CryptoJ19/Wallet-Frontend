import { customFetch, customFetchToken, getHeaderWithToken } from '../../helpers/customFetch';

const apiUrl = 'https://test.cashflash.io/api';

export default {
  state: {
    referal: {},
  },
  actions: {

    async getReferalData(ctx) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/referral`,
          'GET',
          header,
        );
        const content = await rawResponse.json();
        return content;
      });
      console.log('getReferalData', res);
      ctx.commit('updateReferal', res.result);
      return res;
    },

    async fetchSendInvite(ctx, data) {
      const res = await customFetchToken(ctx, async () => {
        const header = getHeaderWithToken();
        const rawResponse = await customFetch(
          `${apiUrl}/referral/send-mail`,
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
    updateReferal(state, value) {
      state.referal = value;
    },
  },
  getters: {
    getReferal(state) {
      return state.referal;
    },
  },
};
