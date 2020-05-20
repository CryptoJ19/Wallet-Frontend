<template>
  <b-modal
    id="modal-change-pass"
    centered
    hide-header
    hide-footer
    @hidden="resetModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('profile.modalChangePass.title') }}
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
              <div v-if="getEr(0)">
                {{ $t('auth.er.enterPass') }}
              </div>
            </div>
          </div>
          <div class="mod__item mod__input">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="newPassword"
                maxlength="40"
                :placeholder="$t('profile.modalChangePass.newPass')"
                :type="newPasswordType"
              >
              <button
                class="password-hide"
                @click="toggleNewPasswordType()"
              >
                <img
                  v-if="newPasswordType === 'password'"
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
              <div v-if="getEr(3)">
                {{ $t('auth.er.enterPass') }}
              </div>
              <div v-if="getEr(5)">
                {{ $t('auth.er.enterPassSpecial') }}
              </div>
              <div v-if="getEr(6)">
                {{ $t('auth.er.enterPassUp') }}
              </div>
              <div v-if="getEr(7)">
                {{ $t('auth.er.enterPassDown') }}
              </div>
              <div v-if="getEr(8)">
                {{ $t('auth.er.enterPassSpace') }}
              </div>
              {{ erMes }}
            </div>
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="preludeChangePass()"
        >
          {{ $t('profile.modalChangePass.saveBtn') }}
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
    er: [],
    loading: false,
    password: '',
    passwordType: 'password',
    newPassword: '',
    newPasswordType: 'password',
    erMes: '',
  }),
  methods: {
    ...mapActions([
      'fetchEditProfilePassword',
    ]),
    check() {
      const passRegexSpecial = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
      const passRegexUpper = /[A-Z]+/;
      const passRegexLower = /[a-z]+/;
      const passRegexSpaces = /\s+/g;
      const { password, newPassword } = this;
      if (password === '') {
        this.er.push(0);
      }
      if (newPassword === '') {
        this.er.push(3);
      } else if (
        newPassword.match(passRegexSpecial) === null
      ) {
        this.er.push(5);
      } else if (
        newPassword.match(passRegexUpper) === null
      ) {
        this.er.push(6);
      } else if (
        newPassword.match(passRegexLower) === null
      ) {
        this.er.push(7);
      } else if (
        newPassword.match(passRegexSpaces) !== null
      ) {
        this.er.push(8);
      }
      return (this.er.length === 0);
    },
    async preludeChangePass() {
      this.er = [];
      if (this.check()) {
        const data = {
          oldPassword: this.password,
          newPassword: this.newPassword,
        };
        this.loading = true;
        const res = await this.fetchEditProfilePassword(data);
        this.loading = false;
        if (!res.ok && res.data.field === 'old_password') {
          this.erMes = 'Неверный старый пароль';
        }
        if (res.ok) {
          this.$emit('changePassSuccess');
        }
      }
    },
    closeCheckEmail() {
      this.$bvModal.hide('modal-change-pass');
    },
    async resetModal() {
      this.er = [];
      this.erMes = '';
      this.loading = false;
      this.password = '';
      this.passwordType = 'password';
      this.newPassword = '';
      this.newPasswordType = 'password';
    },
    getEr(i) {
      return this.er.indexOf(i) !== -1;
    },
    togglePasswordType() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    toggleNewPasswordType() {
      if (this.newPasswordType === 'password') {
        this.newPasswordType = 'text';
      } else {
        this.newPasswordType = 'password';
      }
    },
  },
};
</script>
