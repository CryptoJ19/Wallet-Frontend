<template>
  <b-modal
    id="modal-disable-ga"
    centered
    hide-header
    hide-footer
    @hidden="resetModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('profile.modalDisableGA.title') }}
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
      <div class="mod__body">
        <div class="mod__items">
          <div class="mod__item mod__input">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="password"
                maxlength="40"
                :placeholder="$t('auth.password')"
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
                {{ $t('profile.modalDisableGA.incorrectPass') }}
              </div>
            </div>
          </div>
          <div class="mod__item mod__input">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="code"
                maxlength="40"
                :placeholder="$t('profile.modalDisableGA.code')"
                :type="codeType"
              >
              <button
                class="password-hide"
                @click="toggleCodeType()"
              >
                <img
                  v-if="codeType === 'password'"
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
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="preludeSend"
        >
          {{ $t('profile.modalDisableGA.disableBtn') }}
        </button>
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
import { mapActions } from 'vuex';
import Loader from '../../../ui/Loader';

export default {
  components: {
    Loader,
  },
  data: () => ({
    password: '',
    passwordType: 'password',
    code: '',
    codeType: 'password',
    er: [],
    erMsg: '',
    loading: false,
  }),
  methods: {
    ...mapActions([
      'fetchDisableGA',
    ]),
    async resetModal() {
      this.loading = false;
      this.password = '';
      this.passwordType = 'password';
      this.code = '';
      this.codeType = 'password';
      this.er = [];
      this.erMsg = '';
    },
    check() {
      const { code, password } = this;
      if (code === '') {
        this.er.push(0);
      }
      if (password === '') {
        this.er.push(1);
      }
      return (this.er.length === 0);
    },
    async preludeSend() {
      this.erMes = '';
      this.er = [];
      if (this.check()) {
        const data = {
          totp: this.code,
          password: this.password,
        };
        this.loading = true;
        const res = await this.fetchDisableGA(data);
        this.loading = false;
        if (!res.ok && res.data.field === 'password') {
          this.er.push(2);
        }
        if (!res.ok && res.data.field === 'totp') {
          this.er.push(3);
        }
        if (res.ok) {
          this.$emit('GADisableSuccess');
        }
      }
    },
    close() {
      this.$bvModal.hide('modal-disable-ga');
    },
    togglePasswordType() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    toggleCodeType() {
      if (this.codeType === 'password') {
        this.codeType = 'text';
      } else {
        this.codeType = 'password';
      }
    },
    getUserEr(i) {
      return this.er.indexOf(i) !== -1;
    },
  },
};
</script>
