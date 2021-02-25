<template>
  <div class="main-menu" :class="{ 'main-menu_show': showMenu }">
    <ModalResponse
      :id="'page-not-available-modal'"
      :text="$t('main.pageNotAvailabelModalText')"
      :title="$t('main.pageNotAvailabelModalTitle')"
      :no-icon="true"
    />
    <div class="main-menu__top">
      <div class="main-menu__logo">
        <nuxt-link to="/">
          <img src="~assets/imgs/logo.svg" alt="CashFlash" />
        </nuxt-link>
      </div>
      <div class="main-menu__items">
        <nuxt-link
          v-for="item in menuItems"
          :key="`nav-${item.router}`"
          :to="!item.disable ? `/app/${item.router}` : ''"
          class="main-menu__item"
          :class="[navItemClass(item, title), { 'main-menu__item_disable': item.disable }]"
          @click.native="clickOnMenu(item)"
        >
          <div class="main-menu__title">
            {{ item.title }}
          </div>
          <div class="main-menu__icon">
            <img :src="imagePath(item.router)" alt="icon" />
            <img :src="imagePath(item.router, true)" alt="icon" />
          </div>
          <div class="main-menu__shape" />
        </nuxt-link>
      </div>
    </div>
    <div class="main-menu__bottom">
      <div>
        {{ $t('main.connectedTo') }}
      </div>
      <div class="main-menu__link">
        {{ $t('main.mainnetEOS') }}
      </div>
    </div>
  </div>
</template>
<script>
import ModalResponse from './ModalResponse';

export default {
  components: {
    ModalResponse,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    menuItems: [],
  }),
  computed: {},
  mounted() {
    this.menuItems = [
      { title: this.$t('main.menu.wallet'), router: 'wallet' },
      { title: this.$t('main.menu.profile'), router: 'profile' },
      { title: this.$t('main.menu.referal'), router: 'referral' },
      { title: this.$t('main.menu.purchase'), router: 'purchase' },
    ];
    // if (this.BaseUrl === 'https://cashflash.io/api') {
    //   this.menuItems[3].disable = true;
    // }
  },
  methods: {
    showModal(value) {
      this.$bvModal.show(value);
    },
    clickOnMenu(item) {
      if (item.disable) {
        this.showModal('page-not-available-modal');
      }
    },
    navItemClass: (item, title) => ({ 'main-menu__item_active': item.title === title }),
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
  background: #fff;
  width: 323px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 190;
  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 188px;
    cursor: pointer;
  }
  &__items {
    border-top: 1px solid rgba($grey, 0.1);
    padding: 30px 0 0;
  }
  &__shape {
    background: transparent;
    width: 10px;
    height: 48px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    position: absolute;
    right: 0;
  }
  &__icon {
    img:last-child {
      display: none;
    }
  }
  &__item {
    height: 78px;
    padding: 0 60px 0 50px;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &_disable {
      background: rgba($grey, 0.08);
      //pointer-events: none;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
    color: $grey;
    opacity: 0.3;
  }
  &__bottom {
    display: flex;
    justify-content: center;
    padding: 40px 0;
    color: $grey;
    font-weight: 500;
    font-size: 14px;
    .main-menu__link {
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
  @media (max-width: 1499px) {
    top: 74px;
    width: 280px;
    left: -280px;
    height: initial;
    bottom: 0;
    transition: 0.4s ease;
    &_show {
      left: 0;
    }
    &__items {
      padding: 0;
    }
  }
}
</style>
