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
    setErrorTextFromResponse({ commit }, res) {
      try {
        const errorText = `Verification error. ${res.data.data.Record.DatasourceResults[0].Errors[0].Message}`;
        if (!errorText) throw new Error('Verification error');
        commit('setVerificationError', errorText);
      } catch (error) {
        commit('setDefaultVerificationError');
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
