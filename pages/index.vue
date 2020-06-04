<template>
  <div>
    landing
  </div>
</template>
<script>

import baseUrl from '../config';

export default {
  components: {
  },
  data: () => ({
    title: 'CashFlash',
  }),
  mounted() {
    if (typeof this.$route.query.ref !== 'undefined') {
      const { ref } = this.$route.query;
      document.location.replace(`${baseUrl}/app/authorization?ref=${ref}`);
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
