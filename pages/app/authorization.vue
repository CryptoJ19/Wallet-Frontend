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
    title: '',
  }),
  mounted() {
    this.title = 'Authorization';
    document.title = this.title;
  },
};
</script>
