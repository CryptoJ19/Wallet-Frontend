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
    title: '',
  }),
  mounted() {
    // if (this.BaseUrl === 'https://cashflash.io/api') {
    //   document.location.replace(`http://${window.location.host}/app/`);
    // }
    this.title = this.$t('main.menu.purchase');
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
