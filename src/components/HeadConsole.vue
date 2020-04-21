<template>
  <div class="head-console">
    <div class="head-console__title">
      <button
        class="head-console__burger"
        @click="toggleMenu"
      >
        <img
          src="~assets/imgs/icons/burger.svg"
          alt="menu"
        >
      </button>
      <div>
        {{ title }}
      </div>
    </div>
    <div class="head-console__right">
      <!--      <div class="head-console__item dd-user__body">-->
      <!--        <div class="dd-user__name">-->
      <!--          nickname-->
      <!--        </div>-->
      <!--        <div-->
      <!--          class="dd-user__ava"-->
      <!--          :style="`background-image: url(${imagePath()})`"-->
      <!--        />-->
      <!--      </div>-->

      <b-dropdown
        class="dd-user head-console__item"
        right
      >
        <template v-slot:button-content>
          <div class="dd-user__name">
            nickname
          </div>
          <div
            class="dd-user__ava"
            :style="`background-image: url(${imagePath()})`"
          />
        </template>
        <b-dropdown-item-button class="dd-user__active">
          <div class="dd-user__name">
            nickname
          </div>
          <div
            class="dd-user__ava"
            :style="`background-image: url(${imagePath()})`"
          />
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <div class="dd-user__name">
            nickname
          </div>
          <div
            class="dd-user__ava"
            :style="`background-image: url(${imagePath()})`"
          />
        </b-dropdown-item-button>
        <b-dropdown-item-button class="dd-user__add">
          <div class="dd-user__name">
            add new
          </div>
          <div class="dd-user__plus">
            <img
              src="~assets/imgs/icons/cross.svg"
              alt="add"
            >
          </div>
        </b-dropdown-item-button>
      </b-dropdown>

      <div class="head-console__item head-console__settings">
        <img
          src="~assets/imgs/icons/gear.svg"
          alt="settings"
        >
      </div>
      <div class="head-console__item head-console__info">
        <tippy
          animation="shift-toward"
          placement="bottom"
          theme="light"
          arrow
        >
          <template v-slot:trigger>
            <img
              src="~assets/imgs/icons/info.svg"
              alt="info"
            >
          </template>

          <div>
            йцуйу
          </div>
        </tippy>
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
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
};
</script>
<style lang="scss">
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
      display: flex;
      align-items: center;
    }
    &__burger {
      display: none;
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
    .dd-user {
      &__body {
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

      .dropdown-toggle, .dropdown-item {
        display: flex;
        align-items: center;
        border-radius: 22px;
        height: 40px;
        padding: 0 5px 0 14px;
        cursor: pointer;
        background: $grey-bg;
        &:after {
          display: none;
        }
      }
      &__add .dropdown-item {
        background: transparent;
        padding-right: 14px;
        justify-content: space-between;
      }
      &__plus {
        transform: rotate(45deg);
      }
      .dropdown-toggle, .dd-user__active .dropdown-item {
        background: $yellow;
      }
      .dropdown-menu {
        margin: 14px 0 0;
        padding: 16px 18px;
        border: none;
        box-shadow: 0px 6px 10px rgba(27, 26, 25, 0.1);
        border-radius: 18px;
        li {
          &:not(:last-child) {
            margin: 0 0 15px;
          }
        }
      }
    }
    @media (max-width: 1599px) {}
    @media (max-width: 1199px) {
      position: fixed;
      background: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      z-index: 200;
      left: 0;
      right: 0;
      padding: 0 25px;
      height: 74px;
      &__title {
        font-size: 20px;
      }
      &__burger {
        display: flex;
        margin: 0 25px 0 0;
      }
    }
    @media (max-width: 991px) {}
    @media (max-width: 767px) {}
    @media (max-width: 575px) {}
    @media (max-width: 479px) {}
    @media (max-width: 399px) {}
  }
</style>
