<template>
  <div class="footer">
    <div class="land__container footer__main">
      <div class="footer__l">
        <div class="footer__logo">
          <img src="~assets/imgs/logo.svg" alt="CashFlash" />
        </div>
<!--        <div class="footer__column">-->
<!--          -->
<!--        </div>-->
        <div class="address">
          <div class="address__title">{{$t('land.footer.contacts')}}</div>
          <div class="address__item">
            <div class="address__icon">
              <img src="~assets/imgs/Landing/address.svg" alt="img" />
            </div>
            <div class="address__text" v-html="$t('land.footer.address')" />
          </div>
          <div class="address__item">
            <div class="address__icon">
              <img src="~assets/imgs/Landing/mail.svg" alt="img" />
            </div>
            <div class="address__text" v-html="$t('land.footer.mail')" />
          </div>
        </div>
        <div class="address">
          <div class="address__title">{{$t('land.footer.usefulLinksTitle')}}</div>
          <div v-for="(item,i) in $t('land.footer.usefulLinks')" :key="i" class="address__item--no-bottom">
            <div class="address__icon">
              <img src="~assets/imgs/Landing/internet.svg" alt="img" />
            </div>
            <a :href="item.link" target="_blank" class="address__text address__text--link">{{item.label}}</a>
          </div>
        </div>
      </div>
      <div class="footer__r">
        <div class="under__links">
          <a target="_blank" :href="$t('land.adv.links.facebook')" class="under__link">
            <img src="~assets/imgs/Landing/under_1.svg" alt="img" />
          </a>
          <a target="_blank" :href="$t('land.adv.links.instagram')" class="under__link">
            <img src="~assets/imgs/Landing/under_2.svg" alt="img" />
          </a>
          <a :href="$t('land.adv.links.in')" target="_blank" class="under__link">
            <img src="~assets/imgs/Landing/advan__links_in_2.svg" alt="img" />
          </a>
          <!--        <a-->
          <!--          target="_blank"-->
          <!--          :href="$t('land.adv.links.youtube')"-->
          <!--          class="under__link"-->
          <!--        >-->
          <!--          <img-->
          <!--            src="~assets/imgs/Landing/under_3.svg"-->
          <!--            alt="img"-->
          <!--          >-->
          <!--        </a>-->
          <!--        <a-->
          <!--          target="_blank"-->
          <!--          :href="$t('land.adv.links.twitter')"-->
          <!--          class="under__link"-->
          <!--        >-->
          <!--          <img-->
          <!--            src="~assets/imgs/Landing/under_4.svg"-->
          <!--            alt="img"-->
          <!--          >-->
          <!--        </a>-->
          <!--        <a-->
          <!--          target="_blank"-->
          <!--          :href="$t('land.adv.links.telegram')"-->
          <!--          class="under__link"-->
          <!--        >-->
          <!--          <img-->
          <!--            src="~assets/imgs/Landing/under_5.svg"-->
          <!--            alt="img"-->
          <!--          >-->
          <!--        </a>-->
        </div>
      </div>
    </div>
    <div class="footer__second">
      <div class="land__container">
        <div class="footer__copyright">
          <div class="footer__copyright-icon">
            <img src="~assets/imgs/Landing/copyright.svg" alt="img" />
          </div>
          <div class="footer__copyright-text" v-html="$t('land.footer.copyright')" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.land {
  .under {
    width: 100%;
    background: $grey-bg;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    &__links {
      display: flex;
    }
    &__link {
      width: 24px;
      height: 24px;
      &:not(:last-child) {
        margin: 0 24px 0 0;
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 0;
    border-top: 2px solid $grey-bg;
    .land__container {
      display: flex;
      align-items: center;
      margin: 0 0 50px;
    }
    &__l {
      flex: 3;
      display: flex;
      justify-content: space-between;
      padding: 0 100px 0 0;
    }
    &__r {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    &__header {
      margin: 0 30px 0 0;
    }
    &__title {
      font-weight: 900;
      font-size: 35px;
      line-height: 143.4%;
      color: #000000;
    }
    &__sub {
      font-size: 16px;
      line-height: 143.4%;
      color: $grey;
      white-space: nowrap;
    }
    .form {
      width: 100%;
      position: relative;
      &__body {
        display: flex;
        position: relative;
        align-items: center;
      }
      &__input {
        height: 56px;
        border-width: 2px;
        border-radius: 20px;
        padding-right: 180px;
      }
      &__btn {
        position: absolute;
        /*left: 0;*/
        right: 0;
        @include btn-yellow;
        height: 100%;
        padding: 0 40px;
        border-radius: 17px;
        border: 3px solid #54595f;
      }
      &__msg {
        position: absolute;
        top: 58px;
        font-size: 12px;
      }
    }
    .address {
      display: flex;
      flex-direction: column;
      &__title{
        font-size: 18px;
        color: #54595F;
        font-weight: 600;
        margin-bottom: 15px;
      }
      &__icon {
        margin: 4px 13px 0 0;
        width: 10px;
        height: 14px;
        img {
          width: 100%;
        }
      }
      &__item {
        margin: 5px 0;
        display: flex;
        &--no-bottom{
          margin: 0;
          display: flex;
          align-items: center;
        }
        &:not(:last-child) {
          margin: 0 40px 0 0;
        }
      }
      &__text {
        white-space: pre-line;
        max-width: 180px;
        font-size: 16px;
        line-height: 143.4%;
        color: $grey;
        text-decoration: none;
        &--link:hover{
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    @media (max-width: 1700px) {
      &__logo {
        // display: none;
      }
      &__l {
        width: 70%;
        padding: 0 30px 0 0;
      }
      &__r {
        width: 30%;
      }
    }
    @media (max-width: 1400px) {
      /*.land__container {*/
      /*  display: flex;*/
      /*  align-items: center;*/
      /*  flex-direction: column;*/
      /*}*/
      &__l {
        /*width: 30%;*/
        padding: 0 30px 0 0;
        flex: 5;
      }
      &__r {
        /*width: 70%;*/
        /*align-items: flex-start;*/
        /*flex-direction: column;*/
      }
      &__header {
        margin: 0 0 28px;
      }
      .address {
        flex-direction: column;
        &__item {
          display: flex;
          &:not(:last-child) {
            margin: 0 0 40px 0;
          }
        }
      }
    }
    @media (max-width: 991px) {
      .address {
        margin-right: 15px;
      }
      &__main {
        width: 100%;
        max-width: unset;
      }
      &__l {
        margin: 0 0 26px;
        padding: 0;
        width: 78%;
      }
      &__r {
        /*align-items: center;*/
        justify-content: center;
      }
      &__header {
        text-align: center;
      }
      .land__container {
        flex-direction: column;
      }
      &__logo {
        margin-right: 15px;
      }
      .form {
        &__input {
          padding-right: 140px;
        }
        &__btn {
          padding: 0 20px;
        }
      }
    }
    @media (max-width: 767px) {
      &__l {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      &__logo {
        grid-column: 1/3;
        margin-bottom: 30px;
      }
      &__r {
        width: 100%;
      }
      .form {
        &__msg {
          text-align: center;
          width: 100%;
        }
        &__body {
          flex-direction: column;
        }
        &__input {
          text-align: center;
          padding-right: 20px;
        }
        &__btn {
          margin: 30px 0 0;
          position: relative;
          right: initial;
          padding: 0 20px;
          height: 56px;
        }
      }
    }
    @media (max-width: 605px) {
      &__l {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        margin: 0 auto;
        width: 100%;
      }
      &__logo {
        grid-column: 1/1;
        margin: 10px auto;
      }
      .address {
        width: 300px;
        margin: 10px auto;
      }
      &__main {
        display: block !important;
      }

    }
    &__second {
      border-top: 2px solid #f2f2f2;
      width: 100%;
      padding: 17px 0 0;

      .land__container {
        margin: 0 auto 50px auto;
      }
    }
    &__copyright {
      display: flex;
    }
    &__copyright-icon {
      margin-right: 10px;
    }
    &__copyright-text {
      white-space: pre-line;
      font-size: 16px;
      line-height: 143.4%;
      color: $grey;
    }
  }
}
</style>
