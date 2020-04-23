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
    title: 'index',
  }),
  mounted() {
    if (getAccessToken() === false) {
      console.log(getAccessToken());
      this.$router.push({ path: 'authorization' });
    } else {
      this.$router.push({ path: 'wallet' });
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
