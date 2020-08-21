<template>
  <ContainerConsole :title="title">
    <Referal />
  </ContainerConsole>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import Referal from '~/src/screens/Referal';

export default {
  components: {
    ContainerConsole,
    Referal,
  },
  head() {
    return {
      title: this.$t('main.menu.referal'),
    };
  },
};
</script>
