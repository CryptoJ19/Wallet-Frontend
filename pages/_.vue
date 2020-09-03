<template>
  <div>
    <div
      v-if="mode === 1"
      class="error-page"
    >
      <div class="error-page__box">
        <div class="error-page__num">
          404
        </div>
        <div class="error-page__text">
          {{ $t('main.pageNotFound') }}
        </div>
      </div>
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
<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 320px;
  }
  &__num {
    font-size: 35px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  &__text {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
