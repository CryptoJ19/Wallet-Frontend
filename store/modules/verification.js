export default {
  state: {
    defaultVerificationError: 'Verification error',
    verificationError: 'Verification error', // to display in Modal
    verificationErrorReasons: {
      required: 'The field is required',
      invalid: 'The field was filled with an incorrect value',
    },
  },
  actions: {
    async setErrorTextFromResponse({ commit, dispatch }, res) {
      const erorrText = await dispatch('tryToGetErrors', res);
      const otherErrors = await dispatch('tryToGetOTherErrors', res);

      const result = erorrText || otherErrors || null;
      if (result) commit('setVerificationError', result);
      else commit('setDefaultVerificationError');
    },
    tryToGetErrors(_, res) {
      try {
        const errorText = `Verification error. ${res.data.data.Record.DatasourceResults[0].Errors[0].Message}`;
        return errorText;
      } catch (error) {
        return null;
      }
    },
    tryToGetOTherErrors(_, res) {
      try {
        const array = res.data.data.Record.DatasourceResults[0].DatasourceFields;
        const field = array.find((el) => el.Status === 'nomatch' || el.Status === 'missing');
        if (field) {
          return `Verification error. Please check field ${field.FieldName}`;
        }
        return null;
      } catch (error) {
        return null;
      }
    },
  },
  mutations: {
    setVerificationError(state, textError) {
      state.verificationError = textError;
    },
    setDefaultVerificationError(state) {
      state.verificationError = state.defaultVerificationError;
    },
  },
  getters: {
    verificationError: (state) => state.verificationError,
    verificationErrorReasons: (state) => (reason) => state.verificationErrorReasons[reason],
    defaultVerificationError: (state) => state.defaultVerificationError,
  },
};
