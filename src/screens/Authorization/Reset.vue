<template>
  <div class="auth">
    <div class="auth__main container">
      <div class="auth__box">
        <div
          class="auth__title"
          v-html="$t('profile.changePass')"
        />
        <div
          class="form form_active"
        >
          <div class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="password"
                maxlength="40"
                placeholder="Password"
                :type="passwordType"
                autocomplete="off"
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
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="preludeForgotChange()"
            >
              {{ $t('auth.changePass') }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="auth__loader"
        :class="{'auth__loader_show': loader}"
      >
        <Loader />
      </div>
    </div>
    <div class="auth__bg">
      <img
        src="~assets/imgs/auth-coin.svg"
        alt="background"
      >
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import modalCheckEmail from './ModalCheckEmail';
import Loader from '../../ui/Loader';

export default {
  components: {
    modalCheckEmail,
    Loader,
  },
  props: {
    resetData: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    loader: false,
    password: '',
    er: [],
    erMes: '',
    passwordType: 'password',
  }),
  methods: {
    ...mapActions([
      'fetchForgotChange',
      'logout',
    ]),
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
    checkForgotChange() {
      this.er = [];
      const { password } = this;
      const passRegexSpecial = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
      const passRegexUpper = /[A-Z]+/;
      const passRegexLower = /[a-z]+/;
      const passRegexSpaces = /\s+/g;

      if (password === '') {
        this.er.push(3);
      } else if (
        password.match(passRegexSpecial) === null
      ) {
        this.er.push(5);
      } else if (
        password.match(passRegexUpper) === null
      ) {
        this.er.push(6);
      } else if (
        password.match(passRegexLower) === null
      ) {
        this.er.push(7);
      } else if (
        password.match(passRegexSpaces) !== null
      ) {
        this.er.push(8);
      }

      if (this.er.length !== 0) {
        return false;
      }
      return true;
    },
    async preludeForgotChange() {
      this.erMes = '';
      if (this.checkForgotChange()) {
        this.loader = true;
        const res = await this.fetchForgotChange({
          password: this.password,
          email: this.resetData.email,
          restoreCode: this.resetData.code,
        });
        this.loader = false;
        console.log('fetchForgotChange', res, res.code, res.code === 404000, res.msg);
        if (res.ok) {
          this.logout();
        } else if (res.code === 404000) {
          this.erMes = this.$t('default.serverEr'); // todo
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
<style lang="scss" scoped>
  .auth__box {
    height: initial;
  }
</style>
