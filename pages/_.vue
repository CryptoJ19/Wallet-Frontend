<template>
  <div>
    <div v-if="mode === 1">
      404
    </div>
    <Reset
      v-if="mode === 2"
      :reset-data="resetData"
    />
  </div>
</template>
<script>
import Reset from '~/src/screens/Authorization/Reset';

export default {
  components: {
    Reset,
  },
  data: () => ({
    mode: 0,
    resetData: {},
  }),
  mounted() {
    if (this.$route.path === '/reset'
      && this.$route.query.email !== ''
      && this.$route.query.code !== '') {
      this.mode = 2;
      this.resetData = this.$route.query;
    } else {
      this.mode = 1;
    }
  },
  head() {
    return {
      title: 'CashFlash',
    };
  },
};
</script>
