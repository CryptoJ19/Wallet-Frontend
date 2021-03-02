<template>
  <div>
    <div
      v-if="globalLoader"
      class="cont-console__loader cont-console__loader_global"
    >
      <Loader />
    </div>
    <div
      v-if="!globalLoader && getIsAuthorized"
      class="cont-console"
    >
      <div class="cont-console__menu">
        <MainMenu
          :show-menu="showMenu"
          :title="title"
        />
      </div>
      <div class="cont-console__main">
        <div
          v-if="contentLoader === true"
          class="cont-console__loader"
        >
          <Loader />
        </div>
        <div v-else>
          <div class="cont-console_submenu">
            <HeadConsole
              :title="title"
              @toggleMenu="toggleMenu"
            />
          </div>
          <div class="cont-console__content">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MainMenu from '~/src/components/MainMenu';
import HeadConsole from '~/src/components/HeadConsole';
import Loader from '~/src/ui/Loader';
import { getAccessToken } from '~/helpers/customFetch';

export default {
  components: {
    MainMenu,
    HeadConsole,
    Loader,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    showMenu: false,
    contentLoader: false,
    globalLoader: true,
  }),
  computed: {
    ...mapGetters([
      'getIsAuthorized',
      'getGAEnabled',
    ]),
  },
  watch: {
    getGAEnabled(v) {
      console.log('watch getGAEnabled', v);
      if (v === false) {
        this.fetchTempGAToken();
      }
    },
  },
  mounted() {
    document.body.addEventListener('click', (e) => this.closeOnDocClick(e));

    this.init();
  },
  methods: {
    ...mapActions([
      'fetchGetProfile',
      'fetchTempGAToken',
      'logout',
      'fetchCheckGA',
      'fetchGetTransactions',
      'fetchGetReferalData',
      'fetchGetDocFiles',
      'fetchGetMyBonuses',
      'fetchGetCurrencies',
    ]),
    async init() {
      if (getAccessToken() === false) {
        this.logout();
      } else if (this.getIsAuthorized === false) {
        // const resCheckGA = await this.fetchCheckGA();
        // console.log('fetchCheckGA', resCheckGA);
        // if (resCheckGA.ok && !resCheckGA.result.enabled) {
        //   await this.fetchTempGAToken();
        // }
        const resGetReferalData = this.fetchGetReferalData();
        const resProfile = this.fetchGetProfile();
        const resFiles = this.fetchGetDocFiles();
        const resMyBonuses = this.fetchGetMyBonuses();
        const resCurrencies = this.fetchGetCurrencies();

        await Promise.all([resGetReferalData, resProfile, resFiles, resMyBonuses, resCurrencies]);
        this.globalLoader = false;
      } else {
        this.globalLoader = false;
      }
    },
    closeOnDocClick(e) {
      // console.log(e.target.closest('.main-menu') === null
      //   && e.target.closest('.head-console') === null);
      if (e.target.closest('.main-menu') === null
        && e.target.closest('.head-console') === null) {
        this.showMenu = false;
      }
    },
    toggleMenu(i = null) {
      console.log(i);
      if (i === null) {
        this.showMenu = !this.showMenu;
      } else {
        this.showMenu = i;
      }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
