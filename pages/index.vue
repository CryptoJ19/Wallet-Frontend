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
import baseUrl from '../config';

export default {
  components: {
    ContainerConsole,
  },
  data: () => ({
    title: 'CashFlash',
  }),
  mounted() {
    if (getAccessToken() === false) {
      // console.log(getAccessToken());
      document.location.replace(`${baseUrl}/authorization`);
      // this.$router.replace({ path: 'authorization' });
    } else {
      document.location.replace(`${baseUrl}/wallet`);
      // this.$router.replace({ path: 'wallet' });
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
