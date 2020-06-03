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
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
  mounted() {
    if (typeof this.$route.query.ref !== 'undefined') {
      const { ref } = this.$route.query;
      document.location.replace(`${baseUrl}/authorization?ref=${ref}`);
    } else if (getAccessToken() === false) {
      document.location.replace(`${baseUrl}/authorization`);
    } else {
      document.location.replace(`${baseUrl}/wallet`);
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
