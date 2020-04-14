<template>
  <div>
    <div>
      <nuxt-link
        :to="`/wallet`"
      >
        wallet
      </nuxt-link>
    </div>
    <div>
      <nuxt-link
        :to="`/profile`"
      >
        profile
      </nuxt-link>
    </div>
    <div>
      <nuxt-link
        :to="`/authorization`"
      >
        authorization
      </nuxt-link>
    </div>
  </div>
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
