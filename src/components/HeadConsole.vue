<template>
  <div class="head-console">
    <div class="head-console__title">
      {{ title }}
    </div>
    <div class="head-console__right">
      <div class="head-console__item head-console__user">
        <div class="head-console__name">
          nicknake
        </div>
        <div
          class="head-console__ava"
          :style="`background-image: url(${imagePath()})`"
        />
      </div>
      <div class="head-console__item head-console__settings">
        <img
          src="~assets/imgs/icons/gear.svg"
          alt="settings"
        >
      </div>
      <div class="head-console__item head-console__info">
        <img
          src="~assets/imgs/icons/info.svg"
          alt="info"
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
  methods: {
    imagePath() {
      return require('assets/imgs/ava.png');
    },
  },
};
</script>
<style lang="scss" scoped>
  .head-console {
    display: flex;
    height: 188px;
    padding: 0 50px;
    justify-content: space-between;
    align-items: center;
    &__right {
      display: flex;
      align-items: center;
    }
    &__title {
      font-weight: bold;
      font-size: 50px;
      color: #000;
    }
    &__item {
      cursor: pointer;
      &:not(:first-child) {
        padding: 5px;
      }
      &:not(:last-child) {
        margin: 0 15px 0 0;
      }
    }
    &__user {
      display: flex;
      align-items: center;
      background: $yellow;
      border-radius: 22px;
      height: 40px;
      padding: 0 5px 0 14px;
      cursor: pointer;
    }
    &__name {
      color: $grey;
      font-weight: 600;
      font-size: 16px;
      margin: 0 10px 0 0;
    }
    &__ava {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      /*background-image: url(~assets/imgs/ava.png);*/
      background-size: cover;
      background-position: center center;
    }
  }
</style>
