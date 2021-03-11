<template>
  <div :id="$t('land.menu.items[3].anchor')" class="paper land__anchor">
    <div class="paper__l">
      <img class="paper__img" src="~assets/imgs/Landing/paper_1.svg" alt="img" />
      <img class="paper__img" src="~assets/imgs/Landing/paper_2.svg" alt="img" />
    </div>
    <div class="land__container">
      <div class="paper__r">
        <div class="paper__preface land__preface">
          {{ $t('land.paper.sub') }}
        </div>
        <div class="paper__title land__title" v-html="$t('land.paper.title')" />
        <div class="paper__text land__text">
          {{ $t('land.paper.text') }}
        </div>
        <div class="paper__sub land__sub">
          {{ $t('land.paper.sub') }}
        </div>
        <div class="flag">
          <div v-for="(item, i) in mainFlags" :key="`flag__item_${i}`" class="flag__item">
            <div class="flag__cover">
              <img :src="imagePath(item.image)" alt="img" />
            </div>
            <div class="flag__desc">
              <div class="flag__title">
                {{ item.title }}
              </div>
              <a
                :href="item.link ? paperLink(item.link) : `#${$t('land.menu.items[3].anchor')}`"
                :class="item.link ? 'flag__load' : 'flag__load--disabled'"
                target="_blank"
              >
                <img src="~assets/imgs/Landing/down.svg" alt="img" />
              </a>
            </div>
          </div>
        </div>
        <div class="sub-flag">
          <div class="sub-flag__title land__text">{{ $t('land.paper.otherLanguagesTitle') }}</div>
          <div class="sub-flag__container">
            <div class="dropdown sub-flag__dropdown">
              <div class="dropdown__button" @click="() => {showLanguages = !showLanguages}">
                <span class="dropdown__label" v-if="!selectedLanguage">
                  {{$t('land.paper.selectTheCountry')}}
                </span>
                <span class="dropdown__button-value" v-else>
                  <img class="dropdown__country-circle" :src="selectedLanguage ? imagePath(selectedLanguage.image) : ''" alt="Image" />
                  <span>{{ selectedLanguage ? selectedLanguage.title : $t('land.paper.selectTheCountry') }}</span>
                </span>
                <span class="dropdown__button-arrow">
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20711 0.792893C8.59763 1.18342 8.59763 1.81658 8.20711 2.20711L4.5 5.91421L0.792893 2.20711C0.402368 1.81658 0.402369 1.18342 0.792893 0.792893C1.18342 0.402369 1.81658 0.402369 2.20711 0.792893L4.5 3.08579L6.79289 0.792893C7.18342 0.402369 7.81658 0.402369 8.20711 0.792893Z"
                          fill="#000"
                    />
                  </svg>
                </span>
              </div>
              <ul
                v-show="showLanguages"
                class="menu"

              >
                <li
                  v-for="(item, index) in otherFlags"
                  :key="index"
                  class="menu__item dropdown__button-container"
                  @click="selectLanguage(item)"
                >
                  <img class="dropdown__country-circle" :src="item.image ? imagePath(item.image) : ''" :alt="item.title" />{{item.title}}
                </li>
              </ul>
            </div>
<!--            <div class="vdd sub-flag__dropdown">-->
<!--              <button class="vdd__btn" @click="showLanguages = !showLanguages">-->
<!--                <div class="vdd__title vdd__button-container">-->
<!--                  <img class="vdd__country-circle" :src="selectedLanguage ? imagePath(selectedLanguage.image) : ''" alt="Image" />-->
<!--                  <span>{{ selectedLanguage ? selectedLanguage.title : $t('land.paper.selectTheCountry') }}</span>-->
<!--                </div>-->
<!--                <div class="vdd__icon">-->
<!--                  <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />-->
<!--                </div>-->
<!--              </button>-->
<!--              <div v-if="showLanguages" class="vdd__items">-->
<!--                <button-->
<!--                  v-for="(language, index) in otherFlags"-->
<!--                  :key="`dd__item_country_${index}`"-->
<!--                  class="vdd__item vdd__button-container"-->
<!--                  @click="selectLanguage(language)"-->
<!--                >-->
<!--                  <img class="vdd__country-circle" :src="language.image ? imagePath(language.image) : ''" :alt="language.title" />{{ language.title }}-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
            <a :href="selectedLanguage ? paperLink(selectedLanguage.link) : '#'" class="sub-flag__download" target="_blank">
              {{ $t('land.paper.download') }}
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
    mainFlags: [],
    otherFlags: [],
    showLanguages: false,
    selectedLanguage: undefined,
  }),
  mounted() {
    this.mainFlags = this.$t('land.paper.items').slice(0, 3);
    this.otherFlags = this.$t('land.paper.items').slice(3);
    this.selectedLanguage = this.otherFlags[0];
    console.log(this.otherFlags);
  },
  methods: {
    imagePath(image) {
      return require(`assets/imgs/paper-flags/${image}.svg`);
    },
    paperLink(link) {
      return `/docs/${link}`;
    },
    selectLanguage(language){
      this.selectedLanguage = language;
      this.showLanguages = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  width: 100%;
  &__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFF;
    width: 100%;
    border-radius: 15px;
    font-weight: 500;
    padding: 0 20px;
    height: 44px;
    border: 1px solid #F5F3F3;
    font-size: 14px;
  }
  &__label{
    flex: 4;
    text-align: left;
    color: rgba(84, 89, 95, 0.5);
    font-size: 16px;
  }
  &__button-arrow{
    flex: 1;
    text-align: right;
    margin: 0 0 0 8px;
  }
  &__button-value{
    flex: 4;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__btn{
    cursor: pointer;
  }
  &__button-container{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__country-circle{
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }
}
.menu {
  z-index: 50;
  border-radius: 13px;
  position: absolute;
  top: calc(100% + 4px);
  background: #fff;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 15px -5px rgba(0, 0, 0, 0.15);
  padding: 7px 0;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  &__item {
    margin: 7px 20px !important;
  }
}
.land .paper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 350px;
  &__img {
    &:last-child {
      display: none;
    }
  }
  .flag {
    display: flex;
    &__item {
      &:not(:last-child) {
        margin: 0 60px 0 0;
      }
    }
    &__cover img {
      border-radius: 10px;
      width: 127px;
      height: 63px;
    }
    &__load {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      @include btn-yellow;
      padding: 0;
      width: 25px;
      height: 25px;
      margin: 0 0 0 20px;
      &--disabled {
        @include btn-disabled;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        padding: 0;
        width: 25px;
        height: 25px;
        margin: 0 0 0 20px;
        cursor: default;
      }
    }
    &__title {
      font-weight: 600;
      font-size: 18px;
      color: $grey;
    }
    &__desc {
      margin: 17px 0 0;
      display: flex;
      align-items: center;
    }
  }
  .sub-flag {
    margin-top: 30px;
    &__container{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__dropdown{
      margin-right: 30px;
    }
    &__title {
      margin: 20px 0;
    }
    &__image-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &__download {
      text-decoration: none;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      border-radius: 20px;
      font-weight: bold;
      font-size: 18px;
      color: #000;
      background: #fee802;
      padding: 8px 26px;
      transition: 0.3s;
    }
    &__country-circle{
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    &__button-container{
      display: flex;
      align-items: center;
    }
  }
  &__preface {
    margin: 0 0 30px;
  }
  &__title {
    margin: 0 0 40px;
  }
  &__text {
    margin: 0 0 20px;
    max-width: 714px;
  }
  &__sub {
    margin: 0 0 32px;
    max-width: 659px;
  }
  &__r {
    width: 45%;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 0 auto;
  }
  &__l {
    position: absolute;
    left: 0;
    top: 10px;
  }
  @media (max-width: 1700px) {
    &__l {
      left: -400px;
    }
    &__r {
      width: 60%;
    }
  }
  @media (max-width: 1199px) {
    margin-bottom: 100px;
    &__preface,
    &__title,
    &__text,
    &__sub {
      text-align: center;
    }
    &__r {
      align-items: center;
      width: 100%;
    }
    &__l {
      left: initial;
      display: flex;
      justify-content: center;
      margin-bottom: 130px;
      position: relative;
      top: initial;
      width: 100%;
      height: 202px;
      background: $grey-bg;
    }
    &__img {
      &:first-child {
        display: none;
      }
      &:last-child {
        padding: 40px 0 0 30px;
        position: absolute;
        display: flex;
        max-height: 300px;
      }
    }
  }
  @media (max-width: 575px) {
    margin-bottom: 70px;
    .flag {
      &__desc {
        flex-direction: column;
        align-items: center;
      }
      &__load {
        margin: 10px 0 0;
      }
      &__item {
        &:not(:last-child) {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>
