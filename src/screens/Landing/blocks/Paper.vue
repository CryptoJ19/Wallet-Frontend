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
          <div v-if="showOtherCountries" class="sub-flag__image-container">
            <div v-for="(item, i) in otherFlags" :key="`sub-flag__item_${i}`" class="sub-flag__item">
              <div class="sub-flag__cover">
                <a :href="paperLink(item.link)" target="_blank">
                  <img :src="imagePath(item.image)" :alt="item.title" />
                </a>
              </div>
            </div>
          </div>
          <div
            v-else
            class="sub-flag__show-all"
            @click="showOtherCountries = true"
          >
            {{ $t('land.paper.showAll') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    mainFlags: [],
    otherFlags: [],
    showOtherCountries: false,
  }),
  mounted() {
    this.mainFlags = this.$t('land.paper.items').slice(0, 3);
    this.otherFlags = this.$t('land.paper.items').slice(3);
    console.log(this.otherFlags);
  },
  methods: {
    imagePath(image) {
      return require(`assets/imgs/paper-flags/${image}.svg`);
    },
    paperLink(link) {
      return `/docs/${link}`;
    },
  },
};
</script>
<style lang="scss" scoped>
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
    &__cover img{
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
  .sub-flag{
    margin-top: 30px;
    &__title{
      margin: 20px 0;
    }
    &__image-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &__show-all{
      display: inline-block;
      text-align: center;
      cursor: pointer;
      border-radius: 20px;
      font-weight: bold;
      font-size: 18px;
      color: #000;
      background: #fee802;
      padding: 8px 26px;
      transition: .3s;
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
