<template>
  <div class="cont-console">
    <div class="cont-console__menu">
      <MainMenu :title="title" />
    </div>
    <div class="cont-console__main">
      <div class="cont-console_submenu">
        <HeadConsole :title="title" />
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
};
</script>
<style lang="scss" scoped>

</style>
