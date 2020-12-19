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
    setErrorTextFromResponse({ commit, getters }, res) {
      if (
        res?.data?.errors
        && res?.data?.errors[0]
        && res?.data?.errors[0]?.field
        && res?.data?.errors[0]?.reason
      ) {
        const error = res.data?.errors[0];
        const errorText = `Please check field ${
          error.field
        }. Reason: ${getters.verificationErrorReason(error.reason)}`;
        commit('setVerificationError', errorText);
      } else {
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
