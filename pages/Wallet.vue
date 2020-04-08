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
    title: 'Wallet',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
