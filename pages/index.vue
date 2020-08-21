<template>
  <div>
    <Landing />
  </div>
</template>
<script>
import Landing from '~/src/screens/Landing';

export default {
  components: {
    Landing,
  },
  mounted() {
    if (typeof this.$route.query.ref !== 'undefined') {
      const { ref } = this.$route.query;
      document.location.replace(`http://${window.location.host}/app/authorization?ref=${ref}`);
    }
  },
  head() {
    return {
      title: 'CashFlash',
    };
  },
};
</script>
