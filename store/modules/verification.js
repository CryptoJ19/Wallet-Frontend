export default {
  state: {
    defaultVerificationError: 'Verification error. Please check all fields',
    verificationError: 'Verification error. Please check all fields', // to display in Modal
    verificationErrorReasons: {
      required: 'The field is required',
      invalid: 'The field was filled with an incorrect value',
    },
  },
  actions: {
    setErrorTextFromResponse({ commit, getters }, res) {
      let errorText = '';
      try {
        const errors = res.data.data.errors;
        Object.keys(errors).forEach(el => {
          if (errors[el].length > 0) {
            errorText = errors[el][0]
          }
        })
      } catch (error) {
        errorText = res.msg || getters.defaultVerificationError;
      }
      // errorText = errorText ? (res.msg || getters.defaultVerificationError) : getters.defaultVerificationError;
      commit('setVerificationError', errorText);
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
