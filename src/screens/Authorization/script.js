import { mapActions } from 'vuex';
import ModalCheckEmail from './ModalCheckEmail';
import Loader from '../../ui/Loader';
import { getAccessToken } from '~/helpers/customFetch';
import baseUrl from '../../../config';

export default {
  components: {
    ModalCheckEmail,
    Loader,
  },
  data: () => ({
    mode: 0,
    test: false,
    loader: false,

    er: [],
    erMes: '',
    erCheckEmail: '',
    loaderModal: false,

    // signin: {
    //   email: '',
    //   password: '',
    //   passwordType: 'password',
    //   remember: false,
    // },
    signup: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordType: 'password',
    },

    signin: {
      email: 'testtest123@2go-mail.com', // test54@2go-mail.com
      password: 'qweQWE@',
      passwordType: 'password',
      remember: false,
    },
    // signup: {
    //   firstName: 'T',
    //   lastName: 'T',
    //   email: 'test45313@2go-mail.com', // testtest123@2go-mail.com
    //   password: 'qweQWE@',
    //   passwordType: 'text',
    // },

    forgot: {
      email: '',
      code: '',
    },
  }),
  computed: {
    authBtnClass: ({ mode }) => ([
      { menu__item_active: (mode === 0) },
      { menu__item_active: (mode === 1) },
      { forgot_active: (mode === 2) || (mode === 3) },
    ]),
    authFormClass: ({ mode }) => ([
      { form_active: (mode === 0) },
      { form_active: (mode === 1) },
      { form_active: (mode === 2) },
      { form_active: (mode === 3) },
    ]),
  },
  mounted() {
    if (getAccessToken() !== false) {
      // this.$router.replace({ path: 'wallet' });
      document.location.replace(`${baseUrl}/wallet`);
    }
  },
  methods: {
    ...mapActions([
      'fetchSignup',
      'fetchValidateEmail',
      'fetchSignin',
      'fetchForgotSend',
    ]),
    togglePasswordType() {
      if (this.mode === 0) {
        if (this.signin.passwordType === 'password') {
          this.signin.passwordType = 'text';
        } else {
          this.signin.passwordType = 'password';
        }
      } else if (this.mode === 1) {
        if (this.signup.passwordType === 'password') {
          this.signup.passwordType = 'text';
        } else {
          this.signup.passwordType = 'password';
        }
      }
    },
    setMode(i) {
      this.signup = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordType: 'password',
      };
      this.signin = {
        email: '',
        password: '',
        passwordType: 'password',
      };
      this.forgot = {
        email: '',
        code: '',
        password: '',
      };
      this.er = [];
      this.erMes = '';
      this.mode = i;
    },
    showCheckEmail() {
      this.$bvModal.show('check-email');
    },
    getEr(i) {
      return this.er.indexOf(i) !== -1;
    },
    trimSignup() {
      const {
        firstName,
        lastName,
        email,
      } = this.signup;
      const firstNameLocal = firstName.trim();
      const lastNameLocal = lastName.trim();
      const emailLocal = email.trim();
      this.signup = {
        ...this.signup,
        firstName: firstNameLocal,
        lastName: lastNameLocal,
        email: emailLocal,
      };
    },
    trimSignin() {
      const {
        email,
      } = this.signin;
      const emailLocal = email.trim();
      this.signin = {
        ...this.signin,
        email: emailLocal,
      };
    },
    checkForgotSend() {
      this.er = [];
      if (this.forgot.email === '') {
        this.er.push(0);
      }
      if (this.er.length !== 0) {
        return false;
      }
      return true;
    },
    checkSignin() {
      this.er = [];
      const emailRegex = /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
      const {
        email,
        password,
      } = this.signin;
      if (email === '') {
        this.er.push(0);
      } else if (
        email.match(emailRegex) === null
      ) {
        this.er.push(1);
      }
      if (password === '') {
        this.er.push(2);
      }
      if (this.er.length !== 0) {
        return false;
      }
      return true;
    },
    checkSignup() {
      this.er = [];
      const emailRegex = /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
      const passRegexSpecial = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
      const passRegexUpper = /[A-Z]+/;
      const passRegexLower = /[a-z]+/;
      const passRegexSpaces = /\s+/g;
      const {
        firstName,
        lastName,
        email,
        password,
      } = this.signup;
      if (firstName === '') {
        this.er.push(0);
      }
      if (lastName === '') {
        this.er.push(1);
      }
      if (email === '') {
        this.er.push(2);
      } else if (
        email.match(emailRegex) === null
      ) {
        this.er.push(4);
      }
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

    async preludeSignup() {
      this.erMes = '';
      this.trimSignup();
      if (this.checkSignup()) {
        const {
          firstName,
          lastName,
          email,
          password,
        } = this.signup;

        this.loader = true;
        const res = await this.fetchSignup({
          firstName,
          lastName,
          email,
          password,
        });
        this.loader = false;
        console.log('res', res);
        if (res.ok) {
          this.showCheckEmail();
        } else {
          this.erMes = res.msg;
        }
      }
    },
    async preludeSignin() {
      this.erMes = '';
      this.trimSignin();
      if (this.checkSignin()) {
        const {
          email,
          password,
          remember,
        } = this.signin;
        this.loader = true;
        const res = await this.fetchSignin({
          data: {
            email,
            password,
          },
          remember,
        });
        this.loader = false;
        console.log('fetchSignin', res);
        if (res.ok) {
          // console.log('data.data.email', data, data.data.email);
          this.$store.commit('updateEmail', email);
          this.$store.commit('updateIsAuthorized', true);
          if (remember) {
            this.$store.commit('updateAccess', res.result.access);
            this.$store.commit('updateRefresh', res.result.refresh);
          } else {
            this.$store.commit('temporaryAccess', res.result.access);
            this.$store.commit('temporaryRefresh', res.result.refresh);
          }
          // this.$router.replace({ path: 'wallet' });
          document.location.replace(`${baseUrl}/wallet`);
        } else if (res.code === 401000) {
          this.erMes = res.msg;
        }
      }
    },
    async preludeForgotSend() {
      this.erMes = '';
      this.forgot.email = this.forgot.email.trim();
      if (this.checkForgotSend()) {
        this.loader = true;
        const res = await this.fetchForgotSend({
          email: this.forgot.email,
        });
        this.loader = false;
        console.log('fetchForgotSend', res);
        if (res.ok) {
          this.mode = 3;
        } else {
          this.erMes = res.msg;
        }
      }
    },
    preludeForgotChange() {
      console.log('nice');
    },
    async preludeValidateEmail(code) {
      this.erCheckEmail = '';

      if (code === '') {
        this.erCheckEmail = 'Введите код';
      } else {
        this.loaderModal = true;
        const res = await this.fetchValidateEmail({
          code,
        });
        this.loaderModal = false;
        console.log('fetchValidateEmail', res);

        if (res.ok) {
          // this.$router.replace({ path: 'wallet' });
          document.location.replace(`${baseUrl}/wallet`);
        } else {
          this.erCheckEmail = 'Неверный код подтверждения';
        }
      }
    },
  },
};
