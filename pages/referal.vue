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
    title: 'Referal',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
