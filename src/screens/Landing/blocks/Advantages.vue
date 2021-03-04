<template>
  <div
    :id="$t('land.menu.items[0].anchor')"
    class="advan land__anchor"
  >
    <div class="land__container">
      <div class="advan__maintitle land__title">
        {{ $t('land.adv.title') }}
      </div>
    </div>
    <div class="advan__logo_mob">
      <img
        src="~assets/imgs/Landing/advan_logo_mob.svg"
        alt="img"
      >
    </div>
    <div class="land__container">
      <div class="advan__body">
        <div class="advan__logo advan__video">
          <div class="switcher">
            <div class="switcher__container">
              <div class="switcher__button">
                <div class="switcher__text">Italian</div>
                <img class="switcher__image" src="~assets/imgs/Landing/italian-video.svg" alt="" @click="switchVideo('ita')">
              </div>
              <div class="switcher__button">
                <div class="switcher__text">English</div>
                <img class="switcher__image" src="~assets/imgs/Landing/english-video.svg" alt="" @click="switchVideo('gbr')">
              </div>
            </div>
          </div>
          <client-only>
            <iframe
              class="advan__frame"
              :src="videoLink"
              allowfullscreen
            />
          </client-only>
        </div>
        <div class="advan__line" />
        <div class="advan__items">
          <div
            v-for="(item, i) in items"
            :key="`advan__item_${i}`"
            class="advan__item"
          >
            <div class="advan__border">
              <div class="advan__icon">
                <img
                  :src="imagePath(item)"
                  alt="img"
                >
              </div>
              <div class="advan__text">
                <div class="advan__title">
                  {{ item.title }}
                </div>
                <div class="advan__sub">
                  {{ item.sub }}
                </div>
              </div>
              <div class="advan__point" />
            </div>
            <div class="shape">
              <div class="shape__hor">
                <div class="shape__item" />
              </div>
<!--              <div class="shape__col">-->
<!--                <div class="shape__item" />-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="advan__links">
        <a
          :href="$t('land.adv.links.facebook')"
          target="_blank"
          class="advan__link"
        >
          <img
            src="~assets/imgs/Landing/advan__links_fb.svg"
            alt="img"
          >
        </a>
        <!--        <a-->
        <!--          :href="$t('land.adv.links.twitter')"-->
        <!--          target="_blank"-->
        <!--          class="advan__link"-->
        <!--        >-->
        <!--          <img-->
        <!--            src="~assets/imgs/Landing/advan__links_tw.svg"-->
        <!--            alt="img"-->
        <!--          >-->
        <!--        </a>-->
        <a
          :href="$t('land.adv.links.instagram')"
          target="_blank"
          class="advan__link"
        >
          <img
            src="~assets/imgs/Landing/link_instagram.svg"
            alt="img"
          >
        </a>
        <a
          :href="$t('land.adv.links.in')"
          target="_blank"
          class="advan__link"
        >
          <img
            src="~assets/imgs/Landing/advan__links_in.svg"
            alt="img"
          >
        </a>
        <!--        <a-->
        <!--          :href="$t('land.adv.links.telegram')"-->
        <!--          target="_blank"-->
        <!--          class="advan__link"-->
        <!--        >-->
        <!--          <img-->
        <!--            src="~assets/imgs/Landing/advan__links_tg.svg"-->
        <!--            alt="img"-->
        <!--          >-->
        <!--        </a>-->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      items: [],
      playerOptions: {},
      englishVideoLink: 'https://www.youtube.com/embed/iHsch1PVFn0',
      italianVideoLink: 'https://www.youtube.com/embed/cvKUOB58xoM',
      videoLink: 'https://www.youtube.com/embed/iHsch1PVFn0',
    }
  },
  created() {
    this.items = this.$t('land.adv.items');
  },
  methods: {
    imagePath(item) {
      return require(`assets/imgs/Landing/ecosystem-icons/${item.image}.svg`);
    },
    switchVideo(lang){
      if (lang === 'ita'){
        this.videoLink = this.italianVideoLink;
      } else if (lang === 'gbr'){
        this.videoLink = this.englishVideoLink;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
  .land .advan {
    position: relative;
    margin-bottom: 254px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__video {
      display: flex;
      iframe{
        z-index: 1;
      }
    }
    &__frame {
      $size: 520px;
      height: calc(#{$size} / 1.69);
      width: $size;
      border: none;
      border-radius: 10px;
      overflow: hidden;
    }
    &__maintitle {
      line-height: 58.4%;
      margin: 0 0 90px;
    }    &__header {
      display: none;
    }
    &__links {
      display: flex;
      justify-content: center;
    }
    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      border: 3px solid $grey;;
      border-radius: 100%;
      img {
        height: 34px;
      }
      &:nth-child(4) img {
        margin: 0 5px 0 0;
      }
      &:nth-child(2) img {
        margin: 3px 0 0 1px;
      }
      &:nth-child(1) img {
        margin: 1px 0 0 0;
      }
      &:not(:last-child) {
        margin: 0 20px 0 0;
      }
    }
    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 0 0 104px;
    }
    &__logo {
      position: absolute;
      z-index: 90;
    }
    &__logo_mob {
      display: none;
    }
    .switcher{
      position: absolute;
      bottom: -55px;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 0;
      &__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      &__button{
        display: flex;
        flex-direction: row;
        align-items: center;
        &:not(:last-child){
          margin-right: 30px;
        }
      }
      &__text{
        font-weight: normal;
        font-size: 18px;
        color: #54595F;
        margin-right: 15px;
      }
      &__image{
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
      }
    }
    .shape {
      width: 100%;
      display: flex;
      align-items: center;
      &__hor {
        width: 100%;
        position: relative;
        .shape__item {
          width: 100%;
          background: #EAEAEA;
          height: 3px;
        }
      }
      &__col {
        position: relative;
        /*height: 100px;*/
        .shape__item {
          position: absolute;
          top: 0;
          left: -3px;
          height: 110px;
          width: 3px;
          background: #EAEAEA;
        }
      }
    }
    &__item {
      &:nth-child(2), &:nth-child(4) {
        .shape {
          flex-direction: row-reverse;
          &__col {
            .shape__item {
              left: 0;
            }
          }
        }
      }
      &:nth-child(3), &:nth-child(4) {
        .shape {
          &__col {
            position: relative;
            /*height: 100px;*/
            .shape__item {
              top: initial;
              bottom: 0;
            }
          }
        }
      }
      //&:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
      //  .shape {
      //    &__col {
      //      display: none;
      //    }
      //  }
      //}
    }
    &__point {
      position: absolute;
      right: -8px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: $yellow;
    }
    &__items {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 350px;
      grid-row-gap: 30px;
    }
    &__text {
      margin: 0 0 0 20px;
    }
    &__title {
      font-weight: 900;
      font-size: 27px;
      color: #000000;
    }
    &__sub {
      font-weight: 600;
      font-size: 13px;
      color: #FFCB23;
    }
    &__icon {
      height: 100px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $yellow;
      border: 3px solid $grey;
      border-radius: 100%;
      /*position: absolute;*/
      /*left: 0;*/
    }
    &__border {
      display: flex;
      align-items: center;
      border: 3px solid #F4F4F4;
      border-radius: 70px;
      position: relative;
      min-width: 352px;
      height: 100px;
      background: #FFF;
    }
    &__item {
      display: flex;
      align-items: center;
      &:nth-child(2), &:nth-child(4), &:nth-child(6) {
        flex-direction: row-reverse;
        .advan__border {
          flex-direction: row-reverse;
        }
        .advan__text {
          text-align: right;
          margin: 0 20px 0 0;
        }
        .advan__point {
          left: -8px;
        }
      }
    }
    @media (max-width: 1700px) {
      &__logo {
        img {
          max-width: 500px;
        }
      }
    }
    @media (max-width: 1400px) {
      margin-bottom: 150px;
      .switcher {
        top: -40px;
      }
      &__logo {
        position: relative;
        margin: 0 0 25px;
        z-index: 90;
        img {
          max-width: 400px;
        }
      }
      &__items {
        position: relative;
        display: flex;
        flex-direction: column;
        grid-row-gap: 30px;
      }
      &__item {
        justify-content: center;
        &:not(:last-child) {
          margin: 0 0 25px;
        }
      }
      .shape {
        display: none;
      }
      &__body {
        position: relative;
        margin: 0 0 57px;
      }
      &__line {
        position: absolute;
        background: #F4F4F4;
        bottom: 0;
        top: 0px;
        width: 3px;
      }
    }
    @media (max-width: 1199px) {
      margin-bottom: 150px;
      &__title {
        font-size: 22px;
      }
      &__border {
        height: 80px;
        min-width: 300px;
      }
      &__text {
        margin: 0 0 0 16px;
      }
      &__icon {
        height: 80px;
        width: 80px;
        img {
          max-width: 42px;
        }
      }
    }
    @media (max-width: 991px) {
      margin-bottom: 150px;
      &__logo {
        //display: none;
      }
      &__logo_mob {
        //padding: 20px 0 10px;
        //width: 100%;
        //justify-content: center;
        //background: #F4F4F4;
        //position: relative;
        //z-index: 90;
        //display: flex;
        //margin: 0 0 25px;
      }
      &__link {
        width: 60px;
        height: 60px;
        img {
          max-width: 26px;
        }
      }
      &__item {
        justify-content: center;
        &:not(:last-child) {
          margin: 0 0 25px;
        }
      }
      &__body {
        position: relative;
        margin: 0 0 57px;
      }
      &__line {
        position: absolute;
        background: #F4F4F4;
        bottom: 0;
        top: 0px;
        width: 3px;
      }
      &__items {
        position: relative;
        display: flex;
        flex-direction: column;
        grid-row-gap: 30px;
      }
      &__logo {
        position: relative;
        margin: 0 0 25px;
        z-index: 90;
      }
      .shape {
        display: none;
      }
    }
    @media (max-width: 767px) {
      margin-bottom: 60px;
      .switcher {
        top: 30px;
        right: -270px;
        width: auto;
        &__container{
          flex-direction: column;
        }
        &__button{
          &:not(:last-child){
            margin-bottom: 7px;
            margin-right: 0;
          }
        }
        &__text{
          display: none;
        }
        &__image{
          width: 30px;
          height: 30px;
        }
      }
      &__maintitle {
        margin: 0 0 40px;
        text-align: center;
      }
      &__frame {
        $size: 220px;
        height: calc(#{$size} / 1.69);
        width: $size;
        border: none;
      }
    }
    @media (max-width: 480px) {
      &__logo_mob {
        img {
          max-width: 280px;
        }
      }
    }
  }
</style>
