<template>
  <div class="cont-console">
    <div class="cont-console__menu">
      <MainMenu
        :show-menu="showMenu"
        :title="title"
      />
    </div>
    <div class="cont-console__main">
      <div
        v-if="contentLoader"
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
    title: String,

  },
  data: () => ({
    showMenu: false,
    contentLoader: true,
  }),
  mounted() {
    document.body.addEventListener('click', (e) => this.closeOnDocClick(e));

    this.init();
  },
  computed: {
    ...mapGetters(['getIsAuthorized']),
  },
  methods: {
    ...mapActions([
      'fetchGetProfile',
    ]),
    async init() {
      if (getAccessToken() === false) {
        console.log(getAccessToken());

        this.$router.push({ path: 'authorization' });
      } else if (this.getIsAuthorized === false) {
        console.log('стор пуст');
        const res = await this.fetchGetProfile();
        console.log('GetProfile', res);
      } else {
        console.log('стор уже заполнен');
        this.contentLoader = false;
      }
    },
    closeOnDocClick(e) {
      console.log(e.target.closest('.main-menu') === null
        && e.target.closest('.head-console') === null);
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
