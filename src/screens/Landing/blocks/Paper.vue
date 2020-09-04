<template>
  <div
    :id="$t('land.menu.items[3].anchor')"
    class="paper land__anchor"
  >
    <div class="paper__l">
      <img
        class="paper__img"
        src="~assets/imgs/Landing/paper_1.png"
        alt="img"
      >
      <img
        class="paper__img"
        src="~assets/imgs/Landing/paper_2.svg"
        alt="img"
      >
    </div>
    <div class="land__container">
      <div class="paper__r">
        <div class="paper__preface land__preface">
          {{ $t('land.paper.sub') }}
        </div>
        <div
          class="paper__title land__title"
          v-html="$t('land.paper.title')"
        />
        <div class="paper__text land__text">
          {{ $t('land.paper.text') }}
        </div>
        <div class="paper__sub land__sub">
          {{ $t('land.paper.sub') }}
        </div>
        <div class="flag">
          <div
            v-for="(item, i) in flags"
            :key="`flag__item_${i}`"
            class="flag__item"
          >
            <div class="flag__cover">
              <img
                :src="imagePath(i)"
                alt="img"
              >
            </div>
            <div class="flag__desc">
              <div class="flag__title">
                {{ item.title }}
              </div>
              <a
                :href="paperLink(item)"
                class="flag__load"
              >
                <img
                  src="~assets/imgs/Landing/down.svg"
                  alt="img"
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    flags: [],
  }),
  mounted() {
    this.flags = this.$t('land.paper.items');
  },
  methods: {
    imagePath(i) {
      return require(`assets/imgs/Landing/flag_${i + 1}.svg`);
    },
    paperLink(item) {
      return `/${item.link}`;
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
      &__preface, &__title, &__text, &__sub {
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
