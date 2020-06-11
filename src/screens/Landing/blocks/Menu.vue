<template>
  <div class="land__container">
    <div class="menu">
      <div class="desk">
        <div class="desk__l">
          <div class="desl__logo">
            <img
              src="~assets/imgs/logo.svg"
              alt="CashFlash"
            >
          </div>
        </div>
        <div class="desk__r">
          <div class="menu__items">
            <a
              href="#test"
              class="menu__item"
            >
              Home
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Roadmap
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Transactions
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Wallet
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Team
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Advisor
            </a>
          </div>
          <a
            :href="`/app`"
            class="menu__ac"
          >
            Account
          </a>
        </div>
      </div>
      <div
        class="mobile"
      >
        <div
          v-click-outside="hideMenu"
          class="mobile__top"
        >
          <div class="mobile__l">
            <button
              class="mobile__burger"
              @click="toggleMenu()"
            >
              <img
                src="~assets/imgs/Landing/burger.svg"
                alt="icon"
              >
            </button>
            <div class="mobile__logo">
              <img
                src="~assets/imgs/logo.svg"
                alt="CashFlash"
              >
            </div>
          </div>
          <div class="mobile__r">
            <a
              :href="`/app`"
              class="menu__ac"
            >
              Account
            </a>
          </div>
        </div>
        <div
          class="mobile__slider"
          :class="{'mobile__slider_show': show}"
        >
          <div class="menu__items">
            <a
              href="#test"
              class="menu__item"
            >
              Home
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Roadmap
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Transactions
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Wallet
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Team
            </a>
            <a
              href="#test"
              class="menu__item"
            >
              Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    hideMenu() {
      this.show = false;
    },
    showMenu() {
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.land {
  .menu {
    position: relative;
    z-index: 100;
    &__item {
      font-weight: normal;
      font-size: 16px;
      color: $grey;
      margin: 0 60px 0 0;
      text-decoration: none;
      &:hover, &:active {
        text-decoration: none;
      }
    }
    &__items {
      display: flex;
      align-items: center;
    }
    &__ac {
      border: 3px solid $grey;
      border-radius: 20px;
      width: 167px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      color: #000000;
      @include btn-yellow;
      &:hover, &:active {
        text-decoration: none;
      }
    }
    .mobile {
      display: none;
    }
    .desk {
      margin: 24px 0 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*position: relative;*/
      /*z-index: 101;*/
      &__l {

      }
      &__r {
        display: flex;
        align-items: center;
      }
    }


    @media (max-width: 1400px) {
        &__item {
          margin: 0 30px 0 0;
        }
    }

    @media (max-width: 1199px) {
      .desk {
        display: none;
      }
      .mobile {
        display: flex;
        .menu__items {
          flex-direction: column;
          align-items: flex-start;
        }
        .menu__item {
          padding: 25px 35px;
          font-weight: bold;
          margin: 0;
        }
        .menu__ac {
          width: 105px;
          height: 39px;
          font-size: 15px;
          border-radius: 7px;
        }
        &__slider {
          overflow: auto;
          position: fixed;
          top: 88px;
          left: -280px;
          bottom: 0;
          background: #FFF;
          width: 280px;
          transition: .2s;
          &_show {
            left: 0;
          }
        }
        &__logo {
          margin: 0 0 0 20px;
          img {
            max-height: 42px;
          }
        }
        &__burger {
          padding: 10px;
          margin: -10px;
        }
        &__top {
          justify-content: space-between;
          display: flex;
          position: fixed;
          align-items: center;
          top: 0;
          left: 0;
          right: 0;
          background: #FFF;
          height: 88px;
          padding: 0 14px;
        }
        &__l {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
