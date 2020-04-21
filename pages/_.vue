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
    title: 'CashFlash',
    mode: 0,
    resetData: {},
  }),
  mounted() {
    // console.log('Текущий путь', this.$route);
    if (this.$route.path === '/reset') {
      this.mode = 2;
      this.resetData = this.$route.query;
    } else {
      this.mode = 1;
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
