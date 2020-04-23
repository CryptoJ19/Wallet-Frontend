<template>
  <ContainerConsole :title="title">
    <Profile />
  </ContainerConsole>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import Profile from '~/src/screens/Profile';

export default {
  components: {
    ContainerConsole,
    Profile,
  },
  data: () => ({
    title: 'Profile',
  }),
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
