<template>
  <div class="auth">
    <div class="auth__main container">
      <div class="auth__box">
        <div class="auth__title">
          Change Password
        </div>
        <div
          class="form form_active"
        >
          <div class="form__item">
            <input
              v-model="password"
              placeholder="New password"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(3)">
                Введите пароль
              </div>
              <div v-if="getEr(5)">
                Пароль должен содержать спец символ
              </div>
              <div v-if="getEr(6)">
                Пароль должен содержать заглавную букву
              </div>
              <div v-if="getEr(7)">
                Пароль должен содержать строчную букву
              </div>
              <div v-if="getEr(8)">
                Пароль не должен содержать пробелы
              </div>
              {{ erMes }}
            </div>
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="preludeForgotChange()"
            >
              Change
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
import baseUrl from '../../../config';

export default {
  components: {
    modalCheckEmail,
    Loader,
  },
  props: {
    resetData: Object,
  },
  data: () => ({
    loader: false,
    password: '',
    er: [],
    erMes: '',
  }),
  methods: {
    ...mapActions([
      'fetchForgotChange',
    ]),
    getEr(i) {
      return this.er.indexOf(i) !== -1;
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
          document.location.replace(`${baseUrl}/wallet`);
        } else if (res.code === 404000) {
          this.erMes = res.msg;
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
