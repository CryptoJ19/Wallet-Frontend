<template>
  <Authorization />
</template>
<script>
import Authorization from '~/src/screens/Authorization';

export default {
  components: {
    Authorization,
  },
  head() {
    return {
      title: 'Authorization',
    };
  },
};
</script>
