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
  data: () => ({
    title: 'Purchase',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
