<template>
  <ContainerConsole :title="title">
    <Purchase />
  </ContainerConsole>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import Purchase from '~/src/screens/Purchase';

export default {
  components: {
    ContainerConsole,
    Purchase,
  },
  head() {
    return {
      title: this.$t('main.menu.purchase'),
    };
  },
};
</script>
