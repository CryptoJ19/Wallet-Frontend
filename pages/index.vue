<template>
  <ContainerConsole :title="title">
    {{ title }}
  </ContainerConsole>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';

export default {
  components: {
    ContainerConsole,
  },
  data: () => ({
    title: 'index',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
