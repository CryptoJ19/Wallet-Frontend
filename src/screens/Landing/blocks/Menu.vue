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
          <div
            v-if="mode !== 'nav-off'"
            class="menu__items"
          >
            <a
              :href="`#${$t('land.menu.items[0].anchor')}`"
              class="menu__item"
            >
              {{ $t('land.menu.items[0].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[1].anchor')}`"

              class="menu__item"
            >
              {{ $t('land.menu.items[1].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[2].anchor')}`"
              class="menu__item"
            >
              {{ $t('land.menu.items[2].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[3].anchor')}`"
              class="menu__item"
            >
              {{ $t('land.menu.items[3].title') }}
            </a>
            <!--            <a-->
            <!--              :href="`#${$t('land.menu.items[4].anchor')}`"-->
            <!--              class="menu__item"-->
            <!--            >-->
            <!--              {{ $t('land.menu.items[4].title') }}-->
            <!--            </a>-->
          </div>
          <a
            :href="`/app`"
            class="menu__ac"
          >
            {{ $t('land.menu.ac') }}
          </a>
        </div>
      </div>
      <div
        v-click-outside="hideMenu"
        class="mobile"
      >
        <div
          class="mobile__top"
        >
          <div class="mobile__l">
            <button
              v-if="mode !== 'nav-off'"
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
              {{ $t('land.menu.ac') }}
            </a>
          </div>
        </div>
        <div
          class="mobile__slider"
          :class="{'mobile__slider_show': show}"
        >
          <div class="menu__items">
            <a
              :href="`#${$t('land.menu.items[0].anchor')}`"
              class="menu__item"
              @click="hideMenu"
            >
              {{ $t('land.menu.items[0].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[1].anchor')}`"
              class="menu__item"

              @click="hideMenu"
            >
              {{ $t('land.menu.items[1].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[2].anchor')}`"
              class="menu__item"
              @click="hideMenu"
            >
              {{ $t('land.menu.items[2].title') }}
            </a>
            <a
              :href="`#${$t('land.menu.items[3].anchor')}`"
              class="menu__item"
              @click="hideMenu"
            >
              {{ $t('land.menu.items[3].title') }}
            </a>
            <!--            <a-->
            <!--              :href="`#${$t('land.menu.items[4].anchor')}`"-->
            <!--              class="menu__item"-->
            <!--              @click="hideMenu"-->
            <!--            >-->
            <!--              {{ $t('land.menu.items[4].title') }}-->
            <!--            </a>-->
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
  props: {
    mode: {
      type: String,
      default: '',
    },
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
      text-decoration: none;
      &:hover, &:active {
        text-decoration: none;
      }
    }
    .mobile {
      display: none;
    }
    .desk {
      margin: 24px 0;
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
          width: 100%;
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
