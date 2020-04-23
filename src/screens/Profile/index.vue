<template>
  <div>
    <button @click="logout()">
      logout
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
};
</script>
