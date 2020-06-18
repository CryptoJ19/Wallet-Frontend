import { mapActions, mapGetters } from 'vuex';
import ModalChangePass from './components/ModalChangePass';
import ModalEnableGA from './components/ModalEnableGA';
import ModalSuccessEnableGA from './components/ModalSuccessEnableGA';
import ModalSuccessDisableGA from './components/ModalSuccessDisableGA';
import ModalSuccessChangePass from './components/ModalSuccessChangePass';
import ModalChangeAva from './components/ModalChangeAva';
import Loader from '~/src/ui/Loader';
import ModalDisableGA from './components/ModalDisableGA';

export default {
  data: () => ({
    userEditMode: 0,
    localProfile: {},
    userLoader: false,

    erUser: [],
    erUserMsg: '',

    userFieldsPoints: [
      'cfname',
      'firstname',
      'lastname',
      'birth',
      'placeBirth',
      'docIdent',

      'docNum',
      'releaseDate',
      'expireDate',
      'docIdentCopy',
      'docIdentCopyFile',

      'state',
      'street',
      'city',
      'cap',
      'phone',
    ],
    userFields: {
      cfname: {
        value: 'nickname',
        er: '',
        const: true,
      },
      firstname: {
        value: 'firstName',
        er: '',
        required: true,
      },
      lastname: {
        value: 'lastName',
        er: '',
        required: true,
      },
      birth: {
        value: 'empty',
        er: '',
      },
      placeBirth: {
        value: 'empty',
        er: '',
      },
      docIdent: {
        value: 'empty',
        er: '',
      },

      docNum: {
        value: 'empty',
        er: '',
      },
      releaseDate: {
        value: 'empty',
        er: '',
      },
      expireDate: {
        value: 'empty',
        er: '',
      },
      docIdentCopy: {
        value: 'empty',
        er: '',
      },
      docIdentCopyFile: {
        value: 'empty',
        er: '',
      },

      state: {
        value: 'empty',
        er: '',
      },
      street: {
        value: 'empty',
        er: '',
      },
      city: {
        value: 'empty',
        er: '',
      },
      cap: {
        value: 'empty',
        er: '',
      },
      phone: {
        value: 'phone',
        er: '',
      },
    },
  }),
  mounted() {
    // this.localProfile = { ...this.getProfile };
    this.setDefaultProfile();
  },
  components: {
    Loader,
    ModalChangePass,
    ModalEnableGA,
    ModalSuccessEnableGA,
    ModalDisableGA,
    ModalSuccessDisableGA,
    ModalSuccessChangePass,
    ModalChangeAva,
  },
  computed: {
    ...mapGetters([
      'getProfile',
      'getGAEnabled',
    ]),
    avatarBg() {
      if (this.getProfile.avatar === 'https://test.cashflash.io/api/profile/avatar/null') {
        return `background-image: url(${this.imagePath()})`;
      }
      return `background-image: url(${this.getProfile.avatar})`;
    },
    // `background-image: url(${imagePath()})`
    // profile: ({ getProfile }) => ({ ...getProfile }),
    userBoxClass: ({ userEditMode }) => ({ user_disable: userEditMode === 0 }),
  },
  methods: {
    ...mapActions([
      'logout',
      'fetchEditProfile',
      'fetchGetProfile',
    ]),
    setDefaultProfile() {
      this.localProfile = {
        cfname: this.getProfile.nickname,
        firstname: this.getProfile.firstName,
        lastname: this.getProfile.lastName,
        birth: 'birthValue',
        placeBirth: 'placeBirthValue',
        docIdent: 'docIdentValue',

        docNum: 'docNumValue',
        releaseDate: 'releaseDateValue',
        expireDate: 'expireDateValue',
        docIdentCopy: 'docIdentCopyValue',
        docIdentCopyFile: 'docIdentCopyFileValue',

        state: 'stateValue',
        street: 'streetValue',
        city: 'cityValue',
        cap: 'capValue',
        phone: this.getProfile.phone,
      };
    },
    checkEr() {
      this.userFieldsPoints.forEach((item) => {
        if (this.userFields[item].required && this.localProfile[item] === '') {
          this.userFields[item].er = 'Обязательное поле';
        }
      });
      return this.userFieldsPoints
        .map((item) => this.userFields[item].er !== '')
        .indexOf(true) !== -1;
    },
    async saveUser() {
      console.log(!this.checkEr());
      if (!this.checkEr()) {
        this.userLoader = true;
        const data = {
          firstName: this.localProfile.firstname,
          lastName: this.localProfile.lastname,
        };
        if (this.localProfile.phone !== '' && this.localProfile.phone !== null) {
          data.phone = this.localProfile.phone;
        }
        const res = await this.fetchEditProfile(data);
        console.log(res);
        await this.fetchGetProfile();
        this.userLoader = false;
        this.setDefaultProfile();
        this.setUserEditMode(0);
      }
    },
    changePassSuccess() {
      this.$bvModal.hide('modal-change-pass');
      this.$bvModal.show('modal-success-change-pass');
    },
    GASubmiteSuccess() {
      this.$bvModal.hide('modal-enable-ga');
      this.$bvModal.show('modal-success-enable-ga');
    },
    GADisableSuccess() {
      console.log('GADisableSuccess() {');
      this.$bvModal.hide('modal-disable-ga');
      this.$bvModal.show('modal-success-disable-ga');
    },
    // async saveUser() {
    //   if (this.checkUserValidation()) {
    //     this.userLoader = true;
    //     const res = await this.fetchEditProfile({
    //       firstName: this.localProfile.firstName,
    //       lastName: this.localProfile.lastName,
    //     });
    //     console.log(res);
    //     await this.fetchGetProfile();
    //     this.userLoader = false;
    //     this.setUserEditMode(0);
    //   }
    // },
    getUserEr(i) {
      return this.erUser.indexOf(i) !== -1;
    },
    editUser() {
      this.setUserEditMode(1);
    },
    cancelEditUser() {
      this.erUser = [];
      this.setUserEditMode(0);

      this.setDefaultProfile();
      this.userFieldsPoints.forEach((item) => {
        this.userFields[item].er = '';
      });
    },
    setUserEditMode(i) {
      this.userEditMode = i;
    },
    imagePath() {
      return require('assets/imgs/icons/ava.svg');
    },
    showChangePass() {
      this.$bvModal.show('modal-change-pass');
    },
    showEnableGA() {
      this.$bvModal.show('modal-enable-ga');
    },
    showDisableGA() {
      this.$bvModal.show('modal-disable-ga');
    },
    showChangeAva() {
      this.$bvModal.show('modal-change-ava');
    },
    checkUserValidation() {
      this.erUser = [];
      if (this.localProfile.firstName === '') {
        this.erUser.push(0);
      }
      if (this.localProfile.lastName === '') {
        this.erUser.push(1);
      }
      return this.erUser.length === 0;
    },
  },
};
