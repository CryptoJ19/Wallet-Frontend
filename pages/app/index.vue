<template>
  <div />
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import { getAccessToken } from '~/helpers/customFetch';

export default {
  components: {
    ContainerConsole,
  },
  mounted() {
    console.log(window.location.host);
    if (getAccessToken() === false) {
      document.location.replace(`http://${window.location.host}/app/authorization`);
    } else {
      document.location.replace(`http://${window.location.host}/app/wallet`);
    }
  },
  head() {
    return {
      title: 'CashFlash',
    };
  },
};
</script>
