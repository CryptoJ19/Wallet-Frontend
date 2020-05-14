<template>
  <b-modal
    id="modal-enable-ga"
    centered
    hide-header
    hide-footer
    @hidden="resetModal()"
  >
    <div class="mod ega">
      <div class="ega__top">
        <div class="mod__head">
          <div class="mod__title">
            Enable 2FA
          </div>
          <button
            class="mod__closs"
            @click="closeCheckEmail()"
          >
            <img
              src="~assets/imgs/icons/cross.svg"
              alt="close"
            >
          </button>
        </div>
        <div class="steps">
          <div class="steps__line steps__line_active" />
          <div
            class="steps__line"
            :class="{'steps__line_active': step >= 2}"
          />
          <div
            class="steps__line"
            :class="{'steps__line_active': step >= 3}"
          />
          <button
            class="steps__item steps__item_active"
            @click="setStep(1)"
          >
            <div class="steps__num">
              1
            </div>
            <div class="steps__text">
              Install mobile app
            </div>
          </button>
          <button
            class="steps__item"
            :class="stepItemClass(2)"
            @click="setStep(2)"
          >
            <div class="steps__num">
              2
            </div>
            <div class="steps__text">
              Scan QR code
            </div>
          </button>
          <button
            class="steps__item"
            :class="stepItemClass(3)"
            @click="setStep(3)"
          >
            <div class="steps__num">
              3
            </div>
            <div class="steps__text">
              Backup key
            </div>
          </button>
          <button
            class="steps__item"
            :class="stepItemClass(4)"
            @click="setStep(4)"
          >
            <div class="steps__num">
              4
            </div>
            <div class="steps__text">
              Enable Google Authenticator
            </div>
          </button>
        </div>
      </div>
      <div class="ega__body">
        <div
          class="ega__content"
          :class="stepContentClass(1)"
        >
          <div class="ega__title">
            Step 1
          </div>
          <div class="ega__text">
            Install the Google Authenticator mobile app
          </div>
          <div class="download">
            <a
              class="download__item"
              target="_blank"
              href="https://play.google.com/store"
            >
              <img
                src="~assets/imgs/ga-download_ios.svg"
                alt="appstore"
              >
            </a>
            <a
              target="_blank"
              href="https://www.apple.com/ru/ios/app-store/"
            >
              <img
                src="~assets/imgs/ga-download_android.svg"
                alt="appstore"
              >
            </a>
          </div>
        </div>
        <div
          class="ega__content"
          :class="stepContentClass(2)"
        >
          <div class="ega__title">
            Step 2
          </div>
          <div class="ega__text">
            Scan this QR code with the Google Authenticator or enter code manually into the app.
          </div>
          <div class="ega__qr">
            <!--            <qrcode-vue-->
            <!--              :value="getGAToken"-->
            <!--              :size="120"-->
            <!--            />-->
            <!--            <vue-qrcode-->
            <!--              :size="120"-->
            <!--              value="qweqew"-->
            <!--            />-->
            <qrcode
              :value="getQrCodeData()"
              :options="{ width: 150 }"
            />
          </div>
          <div class="ega__code">
            {{ getGAToken }}
          </div>
        </div>
        <div
          class="ega__content"
          :class="stepContentClass(3)"
        >
          <div class="ega__title">
            Step 3
          </div>
          <div class="ega__text">
            Please save this Key on paper. This Key will allow you to
            recover your Google Authenticator in case of phone loss.
          </div>
          <div class="ega__code">
            {{ getGAToken }}
          </div>
        </div>
        <div
          class="ega__content"
          :class="stepContentClass(4)"
        >
          <div class="ega__title">
            Step 4
          </div>
          <div class="ega__text">
            Enable Google Authenticator
          </div>
          <div class="ega__form">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="password"
                maxlength="40"
                placeholder="Password"
                :type="passwordType"
              >
              <button
                class="password-hide"
                @click="togglePasswordType()"
              >
                <img
                  v-if="passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                >
                <img
                  v-else
                  src="~assets/imgs/icons/eye__close.svg"
                  alt="eye"
                >
              </button>
            </div>
            <div class="ga-code">
              <div class="ga-code__title">
                Google Authenticator Coder
              </div>
              <input
                v-model="GACode"
                type="text"
              >
              <div class="ga-code__items">
                <input
                  type="text"
                  class="ga-code__item"
                ><input
                  type="text"
                  class="ga-code__item"
                ><input
                  type="text"
                  class="ga-code__item"
                ><input
                  type="text"
                  class="ga-code__item"
                ><input
                  type="text"
                  class="ga-code__item"
                ><input
                  type="text"
                  class="ga-code__item"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ega__bottom">
        <button
          v-if="step !== 1"
          class="btn"
          @click="prevStep()"
        >
          Back
        </button>
        <div v-else />
        <button
          v-if="step === 4"
          class="btn"
          @click="preludeSubmite()"
        >
          Sudmite
        </button>
        <button
          v-else-if="step !== 4"
          class="btn"
          @click="nextStep()"
        >
          Next
        </button>
        <div v-else />
      </div>
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loading}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import Loader from '../../../ui/Loader';

export default {
  components: {
    qrcode: VueQrcode,
    Loader,
  },
  data: () => ({
    step: 1,
    passwordType: 'password',
    password: 'qweQWE@',
    loading: false,
    GACode: '',
  }),
  computed: {
    ...mapGetters([
      'getGAToken',
      'getProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchTempGAToken',
      'fetchСonfirmationGA',
    ]),
    getQrCodeData() {
      return `otpauth://totp/${this.getProfile.email}?secret=${this.getGAToken}&issuer=CashFlash`;
    },
    async resetModal() {
      this.loading = false;
      this.step = 1;
      await this.fetchTempGAToken();
      // const test =
      // console.log('fetchTempGAToken', test);
    },
    async preludeSubmite() {
      this.closeCheckEmail();

      const res = await this.fetchСonfirmationGA({
        totp: this.GACode,
        password: this.password,
      });

      console.log('fetchСonfirmationGA', res);

      // this.loading = true;
      //
      //
      //
      // setTimeout(() => {
      //   this.$emit('GASubmiteSuccess');
      // }, 600);
    },
    togglePasswordType() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    stepContentClass(i) {
      return { ega__content_active: this.step === i };
    },
    stepItemClass(i) {
      return { steps__item_active: this.step >= i };
    },
    setStep(i) {
      this.step = i;
    },
    nextStep() {
      this.step += 1;
    },
    prevStep() {
      this.step -= 1;
    },
    closeCheckEmail() {
      this.$bvModal.hide('modal-change-pass');
    },
  },
};
</script>
<style lang="scss">
  #modal-enable-ga {
    .modal-dialog {
      max-width: 895px;
    }
    .modal-content {
      margin-right: 15px;
    }

    .ega {
      padding: 30px;
      margin: 0;
      height: 600px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__code {
        letter-spacing: 0.16em;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        background: $stroke;
        border-radius: 10px;
        height: 35px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin: 20px 0 0;
      }
      &__title {
        color: #000000;
        font-weight: 600;
        font-size: 20px;
        margin: 0 0 20px;
      }
      &__text {
        font-size: 16px;
        color: #000000;
        opacity: 0.4;
        margin: 0 0 30px;
        max-width: 388px;
        text-align: center;
      }
      &__form {
        width: 396px;
      }
      .ga-code {
        margin: 30px 0 0;
        &__title {
          font-size: 16px;
          opacity: 0.5;
          color: $grey;
          margin: 0 0 15px 20px;
        }
        &__items {
          display: flex;
          justify-content: space-between;
        }
        &__item {
          padding: 0;
          text-align: center;
          &:not(:last-child) {
            margin: 0 10px 0 0;
          }
        }
      }
      &__content {
        display: none;
        align-items: center;
        /*justify-content: center;*/
        flex-direction: column;

        &_active {
          display: flex;
        }
        &:nth-child(1) {
          .download {
            display: flex;
            &__item {
              &:first-child {
                margin: 0 20px 0 0;
              }
            }
          }
        }
      }
      .steps {
        align-items: center;
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        &__line {
          position: absolute;
          height: 1px;
          background: $stroke;
          &_active {
            background: $yellow;
          }
          &:nth-child(1) {
            left: 0;
            right: 66%;
          }
          &:nth-child(2) {
            left: 33%;
            right: 36%;
          }
          &:nth-child(3) {
            left: 63%;
            right: 0;
          }
        }
        &__num {
          width: 24px;
          height: 24px;
          border-radius: 100px;
          background: #fff;
          display: flex;
          font-weight: bold;
          align-items: center;
          margin: 0 10px 0 0;
          justify-content: center;
        }
        &__text {
          color: #000000;
          font-size: 14px;
          opacity: 0.4;
        }
        &__item {
          position: relative;
          background: linear-gradient(99.4deg, #ffffff 0.73%, #ffffff 100%);
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border: 1px solid $stroke;
          border-radius: 13px;
          &.steps__item_active {
            background: $yellow-gradient;
            border: none;
            padding: 1px 19px;
            .steps__num {
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .steps__text {
              opacity: 1;
            }
          }
        }
      }
      &__bottom {
        display: flex;
        justify-content: space-between;
        .btn:first-child {
          @include btn_out;
        }
        .btn:last-child {
          @include btn-yellow;
        }
      }
    }
    @media (max-width: 991px) {
      .ega {
        .steps {
          &__num {
            margin: 0 7px 0 0;
          }
          &__item {
            padding: 0 8px;
            height: 38px;
            &.steps__item_active {
              padding: 1px 9px;
            }
          }
        }
      }
    }
    @media (max-width: 767px) {
      .ega {
        .steps {
          &__num {
            margin: 0;
          }
          &__text {
            display: none;
          }
          &__item {
            padding: 0;
            width: 44px;
            height: 44px;
            &.steps__item_active {
              padding: 0;
            }
          }
        }
      }
    }
    @media (max-width: 575px) {
      .ega {
        &__form {
          width: initial;
        }
        &__content:nth-child(1) {
          .download {
            flex-direction: column;
            align-items: center;
            &__item {
              &:first-child {
                margin: 0 0 10px;
              }
            }
          }
        }
        &__bottom {
          display: flex;
          .btn:first-child {
            display: none;
          }
          .btn:last-child {
            width: 100%;
            @include btn-yellow;
          }
        }
      }
    }
  }
</style>
