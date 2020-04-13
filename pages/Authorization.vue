<template>
  <Authorization />
</template>
<script>
import Authorization from '~/src/screens/Authorization';

export default {
  components: {
    Authorization,
  },
  data: () => ({
    title: 'Authorization',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
