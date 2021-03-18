import { mapActions, mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';
import ModalCheckEmail from './ModalCheckEmail';
import Loader from '../../ui/Loader';
import Dropdown from '../../components/Dropdown';
import { getAccessToken } from '~/helpers/customFetch';

export default {
  directives: {
    ClickOutside,
  },
  components: {
    ModalCheckEmail,
    Loader,
    Dropdown
  },
  data: () => ({
    mode: 0,
    test: false,
    loader: true,

    er: [],
    erMes: '',
    erCheckEmail: '',
    loaderModal: false,

    refLink: '',

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
    //   email: 'wer451451451@provlst.com', // test54@2go-mail.com testtest123@2go-mail.com
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
      memo: '',
      password: '',
      passwordType: 'password',
      country: '',
    },

    forgot: {
      email: '',
      code: '',
    },

    ddShow: {
      countries: false,
    },
  }),
  computed: {
    ...mapGetters(['getCountriesReg', 'getCountriesRegSort']),
    authBtnClass: ({ mode }) => [
      { menu__item_active: mode === 0 },
      { menu__item_active: mode === 1 },
      { forgot_active: mode === 2 || mode === 3 },
    ],
    authFormClass: ({ mode }) => [
      { form_active: mode === 0 },
      { form_active: mode === 1 },
      { form_active: mode === 2 },
      { form_active: mode === 3 },
    ],
  },
  mounted() {
    if (getAccessToken() !== false) {
      document.location.replace(`http://${window.location.host}/app/wallet`);
    }

    // get countrys
    this.fetchGetCountries();

    if (typeof this.$route.query.ref !== 'undefined') {
      const { ref } = this.$route.query;
      this.refLink = ref;
      this.setMode(1);
    }

    this.loader = false;
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
      'fetchGetCountries',
    ]),
    toggleDD(key) {
      this.ddShow[key] = !this.ddShow[key];
    },
    hideDDCountries() {
      this.ddShow.countries = false;
    },
    selectDD(key, value) {
      this.signup[key] = value;
      this.hideDDCountries();
    },
    selectCountry(country){
      this.signup.country = country.short;
    },
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
        memo: '',
        country: '',
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
      const { firstName, lastName, email, memo } = this.signup;
      const firstNameLocal = firstName.trim();
      const lastNameLocal = lastName.trim();
      const emailLocal = email.trim();
      const memoLocal = memo.trim();
      this.signup = {
        ...this.signup,
        firstName: firstNameLocal,
        lastName: lastNameLocal,
        email: emailLocal,
        memo: memoLocal,
      };
    },
    trimSignin() {
      const { email } = this.signin;
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
      const { email, password, GAEnabled, GACode } = this.signin;
      if (email === '') {
        this.er.push(0);
      } else if (email.match(emailRegex) === null) {
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
      const memoRegex = /^[a-z1-5]{12}$/g;
      const { firstName, lastName, email, password, memo, country } = this.signup;
      if (firstName === '') {
        this.er.push(0);
      }
      if (lastName === '') {
        this.er.push(1);
      }
      if (email === '') {
        this.er.push(2);
      } else if (email.match(emailRegex) === null) {
        this.er.push(4);
      }
      if (password === '') {
        this.er.push(3);
      } else if (password.match(passRegexSpecial) === null) {
        this.er.push(5);
      } else if (password.match(passRegexUpper) === null) {
        this.er.push(6);
      } else if (password.match(passRegexLower) === null) {
        this.er.push(7);
      } else if (password.match(passRegexSpaces) !== null) {
        this.er.push(8);
      }
      if (memo === '') {
        this.er.push(9);
      } else if (memo.match(memoRegex) === null) {
        this.er.push(10);
      }
      if (country === '') {
        this.er.push(13);
      }
      return this.er.length === 0;
    },

    async preludeSignup() {
      this.erMes = '';
      this.trimSignup();
      if (this.checkSignup()) {
        const { firstName, lastName, email, password, memo, country } = this.signup;

        this.loader = true;
        const data = {
          firstName,
          lastName,
          email,
          password,
          nickname: memo,
          country,
        };
        if (this.refLink !== '') {
          data.ref = this.refLink;
        }

        const res = await this.fetchSignup(data);
        this.loader = false;
        console.log('res', res);
        if (res.ok) {
          this.showCheckEmail();
        } else if (!res.ok && res.data.field === 'email') {
          this.er.push(11);
        } else if (!res.ok && res.data.field === 'nickname') {
          this.er.push(12);
        }
      }
    },
    async preludeSignin() {
      this.erMes = '';
      this.trimSignin();
      if (this.checkSignin()) {
        const { email, password, remember, GACode, GAEnabled } = this.signin;
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
          document.location.replace(`http://${window.location.host}/app/wallet`);
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
          document.location.replace(`http://${window.location.host}/app/wallet`);
        } else {
          this.erCheckEmail = this.$t('auth.er.incorrectCode');
        }
      }
    },
  },
};
