import { mapGetters, mapActions } from 'vuex';
import modalCheckEmail from './modalCheckEmail';
import Loader from '../../ui/Loader';

export default {
  components: {
    modalCheckEmail,
    Loader,
  },
  data: () => ({
    mode: 0,
    test: false,
    loader: false,

    er: [],

    signin: {
      email: '',
      password: '',
      passwordType: 'password',
      remember: false,
    },
    signup: {
      firstName: 'T',
      lastName: 'T',
      email: '',
      password: 'qweQWE@',
      passwordType: 'text',
    },

    forgotEmail: '',
  }),
  computed: {
    ...mapGetters(['accessToken', 'refreshToken']),
    authBtnClass: ({ mode }) => ([
      { menu__item_active: (mode === 0) },
      { menu__item_active: (mode === 1) },
      { forgot_active: (mode === 2) },
    ]),
    authFormClass: ({ mode }) => ([
      { form_active: (mode === 0) },
      { form_active: (mode === 1) },
      { form_active: (mode === 2) },
    ]),
  },
  methods: {
    ...mapActions([
      'fetchSignup',
      'fetchValidateEmail',
      'fetchSignin',
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

      this.forgotEmail = '';
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
    errorSignin(res) {
      console.log('er', res);
    },
    async preludeSignin() {
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
          errorSignin: this.errorSignin,
        });
        this.loader = false;
        console.log('res', res);
      }
    },

    async preludeValidateEmail(code) {
      console.log('Validate', code);

      await this.fetchValidateEmail({
        code,
      });
    },
  },
};
