<template>
  <ContainerConsole :title="title">
    <Wallet />
  </ContainerConsole>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import Wallet from '~/src/screens/Wallet';

export default {
  components: {
    ContainerConsole,
    Wallet,
  },
  data: () => ({
    title: '',
  }),
  mounted() {
    this.title = this.$t('main.menu.wallet');
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
