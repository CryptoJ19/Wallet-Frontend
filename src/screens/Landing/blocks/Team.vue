<template>
  <div class="team">
    <div class="land__container">
      <div
        class="team__title land__title"
        v-html="'Team'"
      />
      <div class="team__text land__text">
        Cash Flash, unlike other projects in the sector,
        wants to give the opportunity to all the most competent
        people to be part of our team, with the aim of welcoming
        the project, excellences of all nations, to become a global
        project . Cash Flash was born from the entrepreneurial idea
        of Andrea Cerato, who shares the vision of a project focused
        on the opportunity to create a real ecosystem in the world
        of cryptocurrencies. Through the blockchain, new services
        are created both for the customer and for the company,
        creating a shorter and more performing supply chain.
      </div>
      <div class="team__items">
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
                :href="item.mail"
                class="person__link"
                target="_blank"
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
  </div>
</template>
<script>
export default {
  data: () => ({
    persons: [
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
      {
        title: 'Andrea Cerato',
        sub: 'FOUNDER',
        in: 'https://www.google.com/',
        mail: 'https://www.google.com/',
      },
    ],
  }),
  methods: {
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
        border-radius: 33px;
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

  }
</style>
