<template>
  <div class="footer">
    <div class="land__container">
      <div class="footer__l">
        <div class="footer__logo">
          <img
            src="~assets/imgs/logo.svg"
            alt="CashFlash"
          >
        </div>
        <div class="address">
          <!--          <div class="address__item">-->
          <!--            <div class="address__icon">-->
          <!--              <img-->
          <!--                src="~assets/imgs/Landing/address.svg"-->
          <!--                alt="img"-->
          <!--              >-->
          <!--            </div>-->
          <!--            <div-->
          <!--              class="address__text"-->
          <!--              v-html="$t('land.footer.address')"-->
          <!--            />-->
          <!--          </div>-->
          <div class="address__item">
            <div class="address__icon">
              <img
                src="~assets/imgs/Landing/mail.svg"
                alt="img"
              >
            </div>
            <div
              class="address__text"
              v-html="$t('land.footer.mail')"
            />
          </div>
        </div>
      </div>
      <div class="footer__r">
        <div class="under__links">
          <a
            target="_blank"
            :href="$t('land.adv.links.facebook')"
            class="under__link"
          >
            <img
              src="~assets/imgs/Landing/under_1.svg"
              alt="img"
            >
          </a>
          <a
            target="_blank"
            :href="$t('land.adv.links.instagram')"
            class="under__link"
          >
            <img
              src="~assets/imgs/Landing/under_2.svg"
              alt="img"
            >
          </a>
          <a
            :href="$t('land.adv.links.in')"
            target="_blank"
            class="under__link"
          >
            <img
              src="~assets/imgs/Landing/advan__links_in_2.svg"
              alt="img"
            >
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
        width: 50%;
        display: flex;
        justify-content: space-between;
        padding: 0 100px 0 0;
      }
      &__r {
        width: 50%;
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
          border: 3px solid #54595F;
        }
        &__msg {
          position: absolute;
          top: 58px;
          font-size: 12px;
        }
      }
      .address {
        display: flex;
        &__icon {
          margin: 4px 13px 0 0;
        }
        &__item {
          display: flex;
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
        }
      }
      @media (max-width: 1700px) {
        &__logo {
          display: none;
        }
        &__l {
          width: 38%;
          padding: 0 30px 0 0;
        }
        &__r {
          width: 62%;
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
        &__l {
          width: initial;
          margin: 0 0 26px;
          padding: 0;
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
            margin: 30px 0 0 ;
            position: relative;
            right: initial;
            padding: 0 20px;
            height: 56px;
          }
        }
      }
    }
  }
</style>
