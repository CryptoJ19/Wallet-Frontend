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
  data: () => ({
    title: '',
  }),
  mounted() {
    this.title = this.$t('main.menu.referal');
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
