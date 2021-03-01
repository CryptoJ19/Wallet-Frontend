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
            {{ $t('profile.modalEnableGA.title') }}
          </div>
          <button
            class="mod__closs"
            @click="close()"
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
              {{ $t('profile.modalEnableGA.step1Title') }}
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
              {{ $t('profile.modalEnableGA.step2Title') }}
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
              {{ $t('profile.modalEnableGA.step3Title') }}
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
              {{ $t('profile.modalEnableGA.step4Title') }}
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
            {{ $t('profile.modalEnableGA.step') }} 1
          </div>
          <div class="ega__text">
            {{ $t('profile.modalEnableGA.installApp') }}
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
            {{ $t('profile.modalEnableGA.step') }} 2
          </div>
          <div class="ega__text">
            {{ $t('profile.modalEnableGA.scanQr') }}
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
            {{ $t('profile.modalEnableGA.step') }} 3
          </div>
          <div class="ega__text">
            {{ $t('profile.modalEnableGA.savePaper') }}
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
            {{ $t('profile.modalEnableGA.step') }} 4
          </div>
          <div class="ega__text">
            {{ $t('profile.modalEnableGA.enableGA') }}
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
            <div class="form__er">
              <div v-if="getUserEr(0)">
                {{ $t('auth.er.enterPass') }}
              </div>
              <div v-if="getUserEr(2)">
                {{ $t('profile.modalEnableGA.incorrectPass') }}
              </div>
            </div>
            <div class="ga-code">
              <div class="ga-code__title">
                {{ $t('profile.modalEnableGA.GACodeTitle') }}
              </div>
              <div class="ga-code__items">
                <input
                  v-for="(item, i) in GACode"
                  :id="`ga-code__item_${i}`"
                  :key="`ga-code__item_${i}`"
                  v-model="GACode[i]"
                  maxlength="1"
                  type="text"
                  class="ga-code__item"
                  @keyup="onChangeCode"
                >
              </div>
              <div class="form__er">
                <div v-if="getUserEr(1)">
                  {{ $t('auth.er.enterTotp') }}
                </div>
                <div v-if="getUserEr(3)">
                  {{ $t('auth.er.incorrectTotp') }}
                </div>
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
          {{ $t('profile.modalEnableGA.back') }}
        </button>
        <div v-else />
        <button
          v-if="step === 4"
          class="btn"
          @click="preludeSubmite()"
        >
          {{ $t('profile.modalEnableGA.sendGA') }}
        </button>
        <button
          v-else-if="step !== 4"
          class="btn"
          @click="nextStep()"
        >
          {{ $t('profile.modalEnableGA.next') }}
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
    password: '',
    loading: false,
    GACode: ['', '', '', '', '', ''],
    er: [],
    erMes: '',
  }),
  computed: {
    ...mapGetters([
      'getGAToken',
      'getProfile',
      'getGAEnabled',
    ]),
  },
  watch: {
    GACode() {

    },
  },
  methods: {
    ...mapActions([
      'fetchTempGAToken',
      'fetchСonfirmationGA',
      'fetchCheckGA',
    ]),
    async onChangeCode(e) {
      const { id } = e.target;
      if (e.key === 'Backspace' && +id[id.length - 1] !== 0) {
        document.querySelector(`#ga-code__item_${+id[id.length - 1] - 1}`).focus();
      } else if (e.key !== 'Backspace' && +id[id.length - 1] !== 5) {
        document.querySelector(`#ga-code__item_${+id[id.length - 1] + 1}`).focus();
      }
    },
    getQrCodeData() {
      return `otpauth://totp/${this.getProfile.email}?secret=${this.getGAToken}&issuer=CashFlash`;
    },
    async resetModal() {
      this.loading = false;
      this.step = 1;
      this.passwordType = 'password';
      this.password = '';
      this.GACode = ['', '', '', '', '', ''];
      this.er = [];
      this.erMes = '';
      if (this.getGAEnabled === false) {
        await this.fetchTempGAToken();
      }
    },
    check() {
      if (this.GACode.join('') === '') {
        this.er.push(0);
      }
      if (this.password === '') {
        this.er.push(1);
      }
      return (this.er.length === 0);
    },
    async preludeSubmite() {
      this.er = [];
      this.erMes = '';
      const totp = this.GACode.join('');
      this.loading = true;
      const res = await this.fetchСonfirmationGA({
        totp,
        password: this.password,
      });
      this.loading = false;
      if (!res.ok && res.data.field === 'password') {
        this.er.push(2);
      }
      if (!res.ok && res.data.field === 'totp') {
        this.er.push(3);
      }
      if (res.ok) {
        this.$emit('GASubmiteSuccess');
      }
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
    close() {
      this.fetchCheckGA();
      this.$bvModal.hide('modal-enable-ga');
    },
    getUserEr(i) {
      return this.er.indexOf(i) !== -1;
    },
  },
};
</script>
