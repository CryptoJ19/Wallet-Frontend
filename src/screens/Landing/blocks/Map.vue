<template>
  <div
    :id="$t('land.menu.items[1].anchor')"
    class="map land__anchor"
  >
    <div class="land__container">
      <div class="map__top">
        <div class="map__preface land__preface">
          {{ $t('land.map.pre') }}
        </div>
        <div class="map__title land__title">
          {{ $t('land.map.title') }}
        </div>
      </div>
    </div>
    <div class="map__body">
      <div
        class="map__center"
        :class="{'map__center_correct': isOddCardsLength}"
      >
        <div
          class="map__coordinate"
          :class="`map__coordinate_${page}`"
        >
          <div class="map__items">
            <div
              v-for="(item, i) in cards"
              :key="`map-card_${i}`"
              class="card"
              :class="mapItemClass(item, i)"
            >
              <div class="card__top">
                <div class="card__line" />
                <div class="card__circle" />
                <div class="card__line" />
              </div>
              <div class="card__main">
                <div
                  class="card__title"
                  v-html="item.date"
                />
                <div class="card__text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map__arrows">
      <button
        class="map__arrow"
        @click="setNextPage"
      >
        <img
          src="~assets/imgs/Landing/arrow.svg"
          alt="img"
        >
      </button>
      <button
        class="map__arrow"

        @click="setPrevPage"
      >
        <img
          src="~assets/imgs/Landing/arrow.svg"
          alt="img"
        >
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 0,
    cards: [],
  }),
  computed: {
    isOddCardsLength() {
      return this.cards.length % 2 === 0;
    },
    getCurrentCard() {
      return this.cards.findIndex((item, i) => this.getDataInPast(item.dateValue)
        && !this.getDataInPast(this.cards[i + 1].dateValue));
    },
  },
  mounted() {
    this.cards = this.$t('land.map.items');
    this.page -= this.getCurrentCard - Math.floor(this.cards.length / 2);
  },
  methods: {
    mapItemClass(item, i) {
      return [
        {
          card_current: this.getDataInPast(item.dateValue)
            && !this.getDataInPast(this.cards[i + 1].dateValue),
        },
        { card_enable: !this.getDataInPast(item.dateValue) },
        { card_first: i === 0 },
        { card_last: i === this.cards.length - 1 },
      ];
    },
    getDataInPast(arr) {
      const now = new Date();
      if (arr[2] !== now.getFullYear()) {
        return arr[2] <= now.getFullYear();
      } if (arr[1] !== now.getMonth() + 1) {
        return arr[1] <= now.getMonth();
      } if (arr[0] !== now.getDate()) {
        return arr[0] <= now.getDate();
      }
      return true;
    },
    setPrevPage() {
      if ((this.isOddCardsLength
        && (-Math.floor(this.cards.length / 2) !== this.page - 1))
        || (!this.isOddCardsLength
          && (-Math.floor(this.cards.length / 2) !== this.page))) this.page -= 1;
    },
    setNextPage() {
      if (Math.floor(this.cards.length / 2) !== this.page) this.page += 1;
    },
    imagePath(i) {
      return require(`assets/imgs/Landing/ava_${i + 1}.png`);
    },
  },
};
</script>
<style lang="scss" scoped>
  .land .map {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 0 150px;
    &__top {
      margin: 0 0 105px;
      text-align: right;
    }
    &__title {
      line-height: 58.4%;
    }
    &__arrows {
      width: 100%;
      padding: 40px 36px 0;
      display: flex;
      justify-content: space-between;
    }
    &__arrow {
      width: 59px;
      height: 59px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      border: 3px solid $grey;
      position: relative;
      transition: .3s;
      top: 0;
      &:first-child {
        margin: 0 28px 0 0;
      }
      &:last-child {
        img {
          transform: rotate(180deg);
        }
      }
    }
    &__body {
      width: 100%;
      /*background: #98b1b4;*/
      /*height: 500px;*/
      display: flex;
      justify-content: center;
    }
    &__center {
      width: 1px;
      display: flex;
      justify-content: center;
      position: relative;
      &_correct {
        right: 140px;
      }
    }
    &__coordinate {
      width: 1px;
      display: flex;
      justify-content: center;
      position: relative;
      left: 0;
      transition: .3s;
      @for $i from -10 through 10 {
        &_#{$i} {
          left: 280px*$i;
        }
      }

    }
    &__items {
      display: flex;
    }
    .card {
      width: 280px;
      &__top {
        display: flex;
        align-items: center;
      }
      &__line {
        height: 2px;
        width: 100%;
        background: $yellow;
      }
      &__circle {
        min-width: 35px;
        height: 35px;
        background: $yellow;
        border-radius: 100%;
      }
      &__main {
        height: 260px;
        margin: 50px 10px 0;
        border: 3px solid $yellow;
        border-radius: 20px;
        padding: 0 30px;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
      &__title {
        white-space: pre-line;
        font-weight: bold;
        font-size: 25px;
        line-height: 143.4%;
        color: #000000;
        margin: 0 0 17px;
      }
      &__text {
        font-size: 18px;
        line-height: 143.4%;
        color: #000000;
      }
      &_current {
        .card__top {
          .card__line:last-child {
            background: $grey-bg;
          }
        }
        .card__main {
          border-color: #000;
          background: $yellow;
        }
      }
      &_enable {
        .card__top {
          .card__line, .card__circle {
            background: $grey-bg;
          }
        }
        .card__main {
          border-color: $grey-bg;

        }
        .card__title, .card__text {
          color: #9F9F9F;
        }
      }
      &_first {
        .card__top {
          .card__line:first-child {
            background: transparent;
          }
        }
      }
      &_last {
        .card__top {
          .card__line:last-child {
            background: transparent;
          }
        }
      }
    }
    @media (max-width: 1199px) {
      margin: 0 0 80px;
      &__top {
        text-align: center;
        margin: 0 0 40px;
      }
    }
  }
</style>
