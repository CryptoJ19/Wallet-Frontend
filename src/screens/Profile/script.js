import { mapActions, mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import ModalChangePass from './components/ModalChangePass';
import ModalEnableGA from './components/ModalEnableGA';
import ModalSuccessEnableGA from './components/ModalSuccessEnableGA';
import ModalSuccessDisableGA from './components/ModalSuccessDisableGA';
import ModalSuccessChangePass from './components/ModalSuccessChangePass';
import ModalChangeAva from './components/ModalChangeAva';
import Loader from '~/src/ui/Loader';
import ModalDisableGA from './components/ModalDisableGA';
import ModalResponse from '../../components/ModalResponse';

export default {
  directives: {
    ClickOutside,
  },
  data: () => ({


    now: moment(String(new Date())).format('DD/MM/YYYY'),

    identityDocumentItems: [
      'Driver license',
      'National ID card',
      'Passport',
    ],

    userEditMode: 0,
    localProfile: {},
    userLoader: false,

    erUser: [],
    erUserMsg: '',

    DDStreetType: false,


    streetTypes: [
      'Str',
      'Avenue',
    ],

    userFieldsPoints: [
      'nickname',
      'firstName',
      'lastName',
      'birthDate',
      'birthPlace',
      'telephone',

      'state',
      'city',
      'streetName',
      'buildingNum',
      'unitNumber',
      'zip',
      'identityDocumentCountry',

      'identityDocument',

      'identityDocumentNumber',
      'identityDocumentRelDate',
      'identityDocumentExpDate',
      'docIdentCopyFile',
    ],
    userFieldsPointsInput: [
      'nickname',
      'firstName',
      'lastName',
      'birthDate',
      'birthPlace',
      'identityDocument',

      'identityDocumentNumber',
      'identityDocumentRelDate',
      'identityDocumentExpDate',

      'state',
      'streetType',
      'streetName',
      'buildingNum',
      'unitNumber',
      'city',
      'zip',
      'telephone',
      'identityDocumentCountry',
    ],
    userFields: {
      nickname: {
        er: '',
        const: true,
      },
      firstName: {
        er: '',
        required: true,
      },
      lastName: {
        er: '',
        required: true,
      },
      birthDate: {
        er: '',
        type: 'date',
      },
      birthPlace: {
        er: '',
      },
      identityDocument: {
        er: '',
        type: 'idDoc',
        show: false,
      },
      identityDocumentNumber: {
        er: '',
      },
      identityDocumentRelDate: {
        er: '',
      },
      identityDocumentExpDate: {
        er: '',
        type: 'date',
      },
      docIdentCopyFile: {
        er: '',
        type: 'filePicker',
      },
      state: {
        er: '',
      },
      address: {
        er: '',
      },
      // streetType: {
      //   er: '',
      // },
      streetName: {
        er: '',
        type: 'streetName',
      },
      buildingNum: {
        er: '',
      },
      unitNumber: {
        er: '',
      },
      city: {
        er: '',
      },
      zip: {
        er: '',
      },
      telephone: {
        er: '',
        type: 'num',
      },
      identityDocumentCountry: {
        er: '',
        type: 'country',
        show: false,
      },
    },
  }),
  mounted() {
    // this.localProfile = { ...this.getProfile };
    this.setDefaultProfile();

    this.userFields.nickname.title = this.$t('profile.filed.nickname');
    this.userFields.firstName.title = this.$t('profile.filed.firstName');
    this.userFields.lastName.title = this.$t('profile.filed.lastName');
    this.userFields.birthDate.title = this.$t('profile.filed.birthDate');
    this.userFields.birthPlace.title = this.$t('profile.filed.birthPlace');
    this.userFields.identityDocument.title = this.$t('profile.filed.identityDocument');

    this.userFields.identityDocumentNumber.title = this.$t('profile.filed.identityDocumentNumber');
    this.userFields.identityDocumentRelDate.title = this.$t('profile.filed.identityDocumentRelDate');
    this.userFields.identityDocumentExpDate.title = this.$t('profile.filed.identityDocumentExpDate');
    this.userFields.docIdentCopyFile.title = this.$t('profile.filed.docIdentCopyFile');

    this.userFields.state.title = this.$t('profile.filed.state');
    // this.userFields.streetType.title = 'Street type';
    this.userFields.streetName.title = this.$t('profile.filed.streetName');
    this.userFields.buildingNum.title = this.$t('profile.filed.buildingNum');
    this.userFields.unitNumber.title = this.$t('profile.filed.unitNumber');
    this.userFields.city.title = this.$t('profile.filed.city');
    this.userFields.zip.title = this.$t('profile.filed.zip');
    this.userFields.telephone.title = this.$t('profile.filed.telephone');
    this.userFields.identityDocumentCountry.title = this.$t('profile.filed.identityDocumentCountry');
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
    DatePicker,
    ModalResponse,
  },
  computed: {
    ...mapGetters([
      'getProfile',
      'getAvatar',
      'getGAEnabled',
      'getDocFile',
      'getCountris',
    ]),
    getProfileChanges() {
      const changesFields = [];
      this.userFieldsPointsInput.forEach((item) => {
        if (this.localProfile[item] !== this.getProfile[item]) {
          changesFields.push(item);
        }
      });
      return changesFields;
    },
    avatarBg() {
      if (this.getAvatar.avatar === 'https://test.cashflash.io/api/profile/avatar/null') {
        return `background-image: url(${this.imagePath()})`;
      }
      return `background-image: url(${this.getAvatar})`;
    },
  },
  methods: {
    ...mapActions([
      'logout',
      'fetchEditProfile',
      'fetchGetProfile',
      'fetchGetDocFiles',
      'fetchPostDocFiles',
      'fetchDelDocFiles',
    ]),
    sendVerified() {
      this.$bvModal.show('profile-verification-send-modal');
    },
    selectDDStreetType(value) {
      this.localProfile.streetType = value;
    },
    selectIdDoc(value) {
      this.localProfile.identityDocument = value;
    },
    toggleIdDoc() {
      if (this.userEditMode === 1) {
        this.userFields.identityDocument.show = !this.userFields
          .identityDocument.show;
      }
    },
    hideIdDoc() {
      this.userFields.identityDocument.show = false;
    },
    selectCountry(value) {
      this.localProfile.identityDocumentCountry = value;
    },
    toggleCountry() {
      if (this.userEditMode === 1) {
        this.userFields.identityDocumentCountry.show = !this.userFields
          .identityDocumentCountry.show;
      }
    },
    hideCountry() {
      this.userFields.identityDocumentCountry.show = false;
    },
    toggleDDStreetType() {
      if (this.userEditMode === 1) {
        this.DDStreetType = !this.DDStreetType;
      }
    },
    hideDDStreetType() {
      this.DDStreetType = false;
    },
    cutString(value) {
      const centerIndex = Math.ceil(value.length / 2);
      if (value.length > 12) {
        const lengthPoints = value.length - 10;
        return `${value.substr(0, centerIndex - (lengthPoints / 2))}${'.'.repeat(3)}${value.substr(centerIndex + (lengthPoints / 2), value.length)}`;
      }
      return value;
    },
    async removeDocFile(i) {
      this.userFields.docIdentCopyFile.er = '';
      this.userLoader = true;

      const res = await this.fetchDelDocFiles(i);
      if (res.ok) {
        await this.fetchGetDocFiles();
      }
      this.userLoader = false;
      console.log(res);
      // setTimeout(() => {
      //   this.docIdentCopyFileData.splice(i, 1);
      //
      // }, 1500);
    },
    async handleImageDoc(e) {
      this.userFields.docIdentCopyFile.er = '';
      console.log(e.target.files[0]);
      const fileObj = e.target.files[0];
      if (e.currentTarget !== null) {
        if (fileObj.type !== 'image/png' && fileObj.type !== 'image/jpeg' && fileObj.type !== 'application/pdf') {
          this.userFields.docIdentCopyFile.er = 'Можно загружать только .jpg, .png, .pdf файлы';
          return null;
        }
        if ((fileObj.size / 1024 / 1024) > 2) {
          this.userFields.docIdentCopyFile.er = this.$t('profile.filed.tooLarge');
          return null;
        }
        if (this.getDocFile.length === 2) {
          this.userFields.docIdentCopyFile.er = this.$t('profile.filed.onlyTwo');
          return null;
        }
        if (this.userFields.docIdentCopyFile.er === '') {
          const formData = new FormData();
          formData.append('file', fileObj);
          console.log(formData, fileObj);
          this.userLoader = true;
          const res = await this.fetchPostDocFiles(formData);
          if (res.ok) {
            await this.fetchGetDocFiles();
          }
          this.userLoader = false;
          console.log(res);
        }
      }
      return null;
    },
    setDefaultProfile() {
      this.localProfile = {
        ...this.getProfile,
      };
    },
    checkEr() {
      this.userFieldsPoints.forEach((item) => {
        if (this.userFields[item].required && this.localProfile[item] === '') {
          this.userFields[item].er = this.$t('profile.filed.req');
        }
        if (item === 'identityDocumentExpDate' && this.localProfile[item]) {
          const now = this.now.split('/');
          const expDate = this.localProfile[item].split('/');
          if ((+expDate[2] < +now[2]
            || (+expDate[2] === +now[2] && +expDate[1] < +now[1])
            || (+expDate[2] === +now[2] && +expDate[1] === +now[1] && +expDate[0] < +now[0]))) {
            this.userFields[item].er = this.$t('profile.filed.expiryExpired');
          }
        }
      });
      return this.userFieldsPoints
        .map((item) => this.userFields[item].er !== '')
        .indexOf(true) !== -1;
    },
    async saveUser() {
      this.clearEr();
      console.log(!this.checkEr());
      if (!this.checkEr()) {
        // const data = {
        //   firstName: this.localProfile.firstName,
        //   lastName: this.localProfile.lastName,
        //   birthDate: '',
        //   birthPlace: '',
        //   city: '',
        //   email: 'asd451451451@lexu4g.com',
        //   id: '300d7042-b0a3-4e88-9a0c-b43c1e715392',
        //   identityDocument: '',
        //   identityDocumentExpDate: '',
        //   identityDocumentNumber: '',
        //   identityDocumentRelDate: '',
        //   nickname: 'asd451451452',
        //   telephone: null,
        //   refLink: '6b8f832a47c6d466',
        //   state: '',
        //   teletelephone: '',
        // };


        // if (this.localProfile.telephone !== '' && this.localProfile.telephone !== null) {
        //   data.telephone = this.localProfile.telephone;
        // }
        // this.userFieldsPoints.forEach((item) => {
        //   if (this.localProfile[item] !== '' && this.localProfile[item] !== null) {
        //     data[item] = this.localProfile[item];
        //   }
        // });
        if (this.getProfileChanges.length !== 0) {
          const data = {};
          this.getProfileChanges.forEach((item) => {
            data[item] = this.localProfile[item];
          });
          this.userLoader = true;
          const res = await this.fetchEditProfile(data);
          this.userLoader = false;
          console.log(res);
          await this.fetchGetProfile();
        }
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
      this.clearEr();
    },
    clearEr() {
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
