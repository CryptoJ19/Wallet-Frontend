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

    signin: {
      email: '',
      password: '',
      passwordType: 'password',
      remember: false,
      GAEnabled: false,
      GACode: '',
      GACodeType: 'password',
    },

    // signin: {
    //   email: 'test54@2go-mail.com', // test54@2go-mail.com testtest123@2go-mail.com
    //   password: 'qweQWE@',
    //   passwordType: 'password',
    //   remember: false,
    //   GAEnabled: false,
    //   GACode: '',
    //   GACodeType: 'password',
    // },

    signup: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordType: 'password',
    },


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
  watch: {
    'signin.email': function () {
      this.signin.GAEnabled = false;
    },
    'signin.password': function () {
      this.signin.GAEnabled = false;
    },
    'signin.GAEnabled': function () {
      this.erMes = '';
    },
  },
  methods: {
    ...mapActions([
      'fetchSignup',
      'fetchValidateEmail',
      'fetchSignin',
      'fetchForgotSend',
    ]),
    toggleGACodeType() {
      if (this.signin.GACodeType === 'password') {
        this.signin.GACodeType = 'text';
      } else {
        this.signin.GACodeType = 'password';
      }
    },
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
        remember: false,
        GAEnabled: false,
        GACode: '',
        GACodeType: 'password',
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
        GAEnabled,
        GACode,
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
      if (GAEnabled && GACode === '') {
        this.er.push(3);
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
          this.erMes = this.$t('auth.er.emailExists'); // todo
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
          GACode,
          GAEnabled,
        } = this.signin;
        this.loader = true;
        let data;
        if (GAEnabled) {
          data = {
            data: {
              email,
              password,
              totp: GACode,
            },
            remember,
          };
        } else {
          data = {
            data: {
              email,
              password,
            },
            remember,
          };
        }

        const resSignin = await this.fetchSignin(data);
        this.loader = false;
        console.log('fetchSignin', resSignin);
        if (resSignin.ok) {
          // this.$router.replace({ path: 'wallet' });
          document.location.replace(`${baseUrl}/`);
        } else if (resSignin.code === 401000) {
          this.erMes = this.$t('auth.er.incorrectLog');
        } else if (resSignin.code === 400000 && GAEnabled === false) {
          this.signin.GAEnabled = true;
        } else if (resSignin.code === 400000) {
          this.erMes = this.$t('auth.er.incorrectTotp');
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
          this.erMes = this.$t('auth.er.incorrectEmailToReset');
        }
      }
    },
    async preludeValidateEmail(code) {
      this.erCheckEmail = '';

      if (code === '') {
        this.erCheckEmail = this.$t('auth.er.enterCode');
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
          this.erCheckEmail = this.$t('auth.er.incorrectCode');
        }
      }
    },
  },
};
