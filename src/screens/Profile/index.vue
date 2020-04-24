<template>
  <div>
    <button @click="logout()">
      logout
    </button>
    <button @click="fetchSendValidation()">
      SendValidation
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'logout',
      'fetchSendValidation',
    ]),
  },
};
</script>
