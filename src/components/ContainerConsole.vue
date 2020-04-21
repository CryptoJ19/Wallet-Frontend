<template>
  <div class="cont-console">
    <div class="cont-console__menu">
      <MainMenu
        :show-menu="showMenu"
        :title="title"
      />
    </div>
    <div class="cont-console__main">
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
</template>
<script>
import MainMenu from '~/src/components/MainMenu';
import HeadConsole from '~/src/components/HeadConsole';

export default {
  components: {
    MainMenu,
    HeadConsole,
  },
  props: {
    title: String,
  },
  data: () => ({
    showMenu: false,
  }),
  mounted() {
    document.body.addEventListener('click', (e) => this.closeOnDocClick(e));
  },
  methods: {
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
