// import axios from 'axios';
import modalCheckEmail from './modalCheckEmail';


export default {
  components: {
    modalCheckEmail,
  },
  data: () => ({
    mode: 1,
    test: false,
  }),
  computed: {
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
    setMode(i) {
      this.mode = i;
    },
    showCheckEmail() {
      this.$bvModal.show('check-email');
    },
    preludeSignup() {
      console.log('nice');

      // const fd = new FormData();
      // fd.append('firstName', 'Test');
      // fd.append('lastName', 'Test');
      // fd.append('email', 'tesqwt@test.ru');
      // fd.append('password', 'Qwgjqwghrtj124123');
      //
      // axios({
      //   method: 'post',
      //   url: 'https://cashflash.hedpay.com/api/auth/register',
      //   data: fd,
      // });
    },
  },
};
