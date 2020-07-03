<template>
  <div
    :id="$t('land.menu.items[4].anchor')"
    class="team"
  >
    <div class="land__container">
      <div
        class="team__title land__title"
        v-html="$t('land.team.title')"
      />
      <div class="team__text land__text">
        {{ $t('land.team.text') }}
      </div>
      <div class="team__body">
        <div
          class="team__items"
          :class="[
            {'team__items_two': page === 1},
            {'team__items_three': page === 2}
          ]"
        >
          <div
            v-for="(item, i) in persons"
            :key="`person_${i}`"
            class="person"
          >
            <div class="person__ava">
              <img
                :src="imagePath(i)"
                alt="img"
              >
            </div>
            <div class="person__info">
              <div class="person__title">
                {{ item.title }}
              </div>
              <div class="person__sub">
                {{ item.sub }}
              </div>
              <div class="person__links">
                <a
                  v-if="item.in"
                  :href="item.in"
                  class="person__link"
                  target="_blank"
                >
                  <img
                    src="~assets/imgs/Landing/advan__links_in.svg"
                    alt="img"
                  >
                </a>
                <a
                  v-if="item.mail"
                  :href="`mailto:${item.mail}`"
                  class="person__link"
                >
                  <img
                    src="~assets/imgs/Landing/mail.svg"
                    alt="img"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="team__arrows">
        <button
          class="team__arrow"
          @click="setPrevPage"
        >
          <img
            src="~assets/imgs/Landing/arrow.svg"
            alt="img"
          >
        </button>
        <button
          class="team__arrow"
          @click="setNextPage"
        >
          <img
            src="~assets/imgs/Landing/arrow.svg"
            alt="img"
          >
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    persons: [],
    page: 0,
  }),
  mounted() {
    this.persons = this.$t('land.team.items');
  },
  methods: {
    setPrevPage() {
      if (this.page !== 0) {
        this.page -= 1;
      }
    },
    setNextPage() {
      if (this.page !== 2) {
        this.page += 1;
      }
    },
    imagePath(i) {
      return require(`assets/imgs/Landing/ava_${i + 1}.png`);
    },
  },
};
</script>
<style lang="scss" scoped>
  .land .team {
    margin: 0 0 130px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    .land__title {
      margin: 0 0 20px;
      text-align: center;
    }
    .land__text {
      text-align: center;
      max-width: 1220px;
      margin: 0 auto 50px;
    }
    &__items {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 60px;
      grid-column-gap: 80px;
    }
    &__arrows {
      display: none;
    }
    .person {
      background: $grey-bg;
      border-radius: 30px;
      display: flex;
      padding: 16px;
      align-items: center;
      &__title {
        font-weight: bold;
        font-size: 27px;
        color: #000000;
        margin: 0 0 5px;
      }
      &__sub {
        font-weight: 500;
        font-size: 18px;
        color: #C2C2C2;
        margin: 0 0 15px;
      }
      &__ava {
        border: 3px solid $grey;
        border-radius: 34px;
        overflow: hidden;
      }
      &__info {
        margin: 0 0 0 36px;
      }
      &__links {
        display: flex;
      }
      &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: $yellow;
        border-radius: 100%;
        &:not(:last-child) {
          margin: 0 10px 0 0;
        }
        img {
          height: 16px;
        }
      }
    }
    @media (max-width: 1700px) {
      .person {
        padding: 12px;
        &__title {
          font-size: 20px;
          margin: 0 0 1px;
        }
        &__sub {
          font-size: 15px;
          margin: 0 0 10px;
        }
        &__ava {
          width: 110px;
        }
        &__info {
          margin: 0 0 0 22px;
        }
        &__links {
        }
        &__link {
          width: 33px;
          height: 33px;
          &:not(:last-child) {
          }
          img {
          }
        }
      }
    }
    @media (max-width: 1199px) {
      overflow: hidden;
      &__arrows {
        display: flex;
        justify-content: center;
        margin: 35px 0 0;
        position: relative;
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
      .land__container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1px;
      }
      &__items {
        left: 735px;
        transition: .3s;
        &_two {
          left: 0;
        }
        &_three {
          left: -735px;
        }
        grid-row-gap: 22px;
        grid-column-gap: 420px;
        min-width: 1780px;
      }
    }

  }
</style>
