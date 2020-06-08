<template>
  <div class="what">
    <div class="what__r">
      <img
        class="what__img"
        src="~assets/imgs/Landing/what_1.svg"
        alt="img"
      >
      <img
        class="what__img"
        src="~assets/imgs/Landing/what_2.svg"
        alt="img"
      >
    </div>
    <div class="land__container">
      <div class="what__l">
        <div class="what__preface land__preface">
          The first blockchain with e-commerce
        </div>
        <div
          class="what__title land__title"
          v-html="'What\'s\nCash Flash'"
        />
        <div class="what__item">
          <div class="what__sub land__sub">
            We are creating the first project with its real Certified and Guaranteed Marketplace.
          </div>
          <div class="what__text land__text">
            The Cash Flash project was born with the intent
            to create a series of systems for both the customer
            and companies, incorporated in the first marketplace
            where it will be possible to buy everything in
            cryptocurrency. All stores will be able to use it
            as a means of payment with a dedicated POS. Furthermore,
            through Cash Flash Technology it will be possible
            to trace the products and counteract their counterfeiting.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .land .what {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 194px;
    &__l {
      width: 50%;
      position: relative;
    }
    &__r {
      position: absolute;
      right: 0;
      top: 110px;
    }
    &__preface {
      margin: 0 0 36px;
    }
    &__item {
      max-width: 525px;
    }
    &__title {
      margin: 0 0 120px;
      max-width: 700px;
    }
    &__sub {
      margin: 0 0 35px;
    }
    &__img {
      &:last-child {
        display: none;
      }
    }
    &__text {
    }
    @media (max-width: 1700px) {
      &__r {
        right: -300px;
      }
    }
    @media (max-width: 1199px) {
      &__img {
        &:first-child {
          display: none;
        }
        &:last-child {
          padding: 40px 0 0 60px;
          position: absolute;
          display: flex;
        }
      }
      &__preface {
        text-align: center;
      }
      &__item {
        margin: 0 auto;
        text-align: center;
      }
      &__title {
        margin: 0 auto 40px;
        text-align: center;
      }
      &__l {
        width: initial;
      }
      &__r {
        display: flex;
        justify-content: center;
        margin: 0 0 90px;
        position: relative;
        top: initial;
        right: initial;
        width: 100%;
        height: 202px;
        background: $grey-bg;
        img {
          display: none;
        }
      }
    }
    @media (max-width: 767px) {
      margin-bottom: 80px;
      &__preface {
        margin: 0 auto 8px;
      }
      &__item {
        margin: 0 auto;
        text-align: center;
      }
      &__title {
        margin: 0 auto 20px;
      }
    }
  }
</style>
