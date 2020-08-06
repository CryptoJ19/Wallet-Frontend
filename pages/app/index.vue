<template>
  <div>
    <!--    <div>-->
    <!--      <nuxt-link-->
    <!--        :to="`/wallet`"-->
    <!--      >-->
    <!--        wallet-->
    <!--      </nuxt-link>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <nuxt-link-->
    <!--        :to="`/profile`"-->
    <!--      >-->
    <!--        profile-->
    <!--      </nuxt-link>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <nuxt-link-->
    <!--        :to="`/authorization`"-->
    <!--      >-->
    <!--        authorization-->
    <!--      </nuxt-link>-->
    <!--    </div>-->
  </div>
</template>
<script>
import ContainerConsole from '~/src/components/ContainerConsole';
import { getAccessToken } from '~/helpers/customFetch';

export default {
  components: {
    ContainerConsole,
  },
  data: () => ({
    title: 'CashFlash',
  }),
  mounted() {
    if (getAccessToken() === false) {
      document.location.replace(`${window.location.host}/app/authorization`);
    } else {
      document.location.replace(`${window.location.host}/app/wallet`);
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
