<template>
  <div class="main-menu">
    <div class="main-menu__top">
      <div class="main-menu__logo">
        <img
          src="~assets/imgs/logo.svg"
          alt="CashFlash"
        >
      </div>
      <div class="main-menu__items">
        <nuxt-link
          v-for="item in menuItems"
          :key="`nav-${item.router}`"
          :to="`/${item.router}`"
          class="main-menu__item "
          :class="{'main-menu__item_active': item.title === title}"
        >
          <div class="main-menu__title">
            {{ item.title }}
          </div>
          <div class="main-menu__icon">
            <img
              :src="imagePath(item.router)"
              alt="icon"
            >
            <img
              :src="imagePath(item.router, true)"
              alt="icon"
            >
          </div>
          <div class="main-menu__shape" />
        </nuxt-link>
      </div>
    </div>
    <div class="main-menu__bottom">
      <div>
        connected to
      </div>
      <a
        href="/"
        class="main-menu__link"
      >
        EOS MAINNET
      </a>
      <!--      <nuxt-link to="/authorization">-->
      <!--        authorization-->
      <!--      </nuxt-link>-->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
  data: () => ({
    menuItems: [
      { title: 'Wallet', router: 'wallet' },
      { title: 'Profile', router: 'profile' },
    ],
  }),
  methods: {
    imagePath(i, active = false) {
      if (active) {
        return require(`assets/imgs/icons/MainMenu/${i}_active.svg`);
      }
      return require(`assets/imgs/icons/MainMenu/${i}.svg`);
    },
  },
};
</script>
<style lang="scss" scoped>
  .main-menu {
    background: #FFF;
    width: 323px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 188px;
    }
    &__items {
      border-top: 1px solid rgba($grey, .1);
      padding: 30px 0 0;
    }
    &__shape {
      background: transparent;
      width: 10px;
      height: 48px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &__icon {
      img:last-child {
        display: none;
      }
    }
    &__item {
      height: 78px;
      padding: 0 0 0 50px;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      font-weight: bold;
      font-size: 18px;
      color: $grey;
      opacity: .3;
    }
    &__bottom {
      display: flex;
      justify-content: center;
      padding: 40px 0;
      color: $grey;
      font-weight: 500;
      font-size: 14px;
      a {
        margin: 0 0 0 5px;
        color: #000;
      }
    }
    &__item.main-menu__item_active {
      .main-menu {
        &__title {
          color: #000;
          opacity: 1;
        }
        &__shape {
          background: $yellow;
        }
        &__icon {
          img:last-child {
            display: block;
          }
          img:first-child {
            display: none;
          }
        }
      }
    }
  }
</style>
