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
import { baseUrl } from '../../config';

export default {
  components: {
    ContainerConsole,
  },
  data: () => ({
    title: 'CashFlash',
  }),
  mounted() {
    if (getAccessToken() === false) {
      document.location.replace(`${baseUrl}/app/authorization`);
    } else {
      document.location.replace(`${baseUrl}/app/wallet`);
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
