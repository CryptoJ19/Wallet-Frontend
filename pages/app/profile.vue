<template>
  <ContainerConsole :title="title">
    <Profile />
  </ContainerConsole>
</template>
<script>
import { mapActions } from 'vuex';
import ContainerConsole from '~/src/components/ContainerConsole';
import Profile from '~/src/screens/Profile';

export default {
  components: {
    ContainerConsole,
    Profile,
  },
  data: () => ({
    title: '',
  }),
  mounted() {
    this.title = this.$t('main.menu.profile');
    this.fetchCheckGA();
  },
  methods: {
    ...mapActions([
      'fetchCheckGA',
    ]),
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
