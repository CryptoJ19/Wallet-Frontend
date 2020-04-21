import { mapGetters, mapActions } from 'vuex';
import ModalCheckEmail from './ModalCheckEmail';
import Loader from '../../ui/Loader';

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
    //   passwordType: '',
    //   remember: false,
    // },
    signup: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordType: 'text',
    },

    signin: {
      email: 'testtest123@2go-mail.com',
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
      email: 'testtest123@2go-mail.com',
      code: '',
    },
  }),
  computed: {
    ...mapGetters(['accessToken', 'refreshToken']),
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
        if (res) {
          this.showCheckEmail();
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
          this.$router.push({ path: 'wallet' });
        } else if (res.code === 401000) {
          this.erMes = res.msg;
        }
      }
    },
    async preludeForgotSend() {
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
        }
      }
    },
    preludeForgotChange() {
      console.log('nice');
    },
    async preludeValidateEmail(code) {
      this.erCheckEmail = '';
      this.loaderModal = true;

      if (code === '') {
        this.erCheckEmail = 'Введите код';
      } else {
        const res = await this.fetchValidateEmail({
          code,
        });
        this.loaderModal = false;
        console.log('fetchValidateEmail', res);

        if (res.ok) {
          this.$router.push({ path: 'wallet' });
        } else {
          this.erCheckEmail = 'Неверный код подтверждения';
        }
      }
    },
  },
};
