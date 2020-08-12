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

    verStep: 0,

    tab: 0,
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
      'phone',

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
    userFieldsPointsTabs: [
      [
        'nickname',
        'firstName',
        'lastName',
        'birthDate',
        'birthPlace',
      ],
      [
        'phone',
      ],
      [
        'state',
        'city',
        'streetName',
        'buildingNum',
        'unitNumber',
        'zip',
      ],
      [
        'identityDocumentCountry',
        'identityDocument',
        'identityDocumentNumber',
        'identityDocumentRelDate',
        'identityDocumentExpDate',
        'docIdentCopyFile',
      ],
    ],
    userFieldsPointsSend: [
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
      'phone',
      'identityDocumentCountry',
    ],
    userFieldsRules: {
      nickname: {
        const: true,
      },
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      birthDate: {
        type: 'date',
      },
      birthPlace: {},
      identityDocument: {
        type: 'idDoc',
        show: false,
      },
      identityDocumentNumber: {},
      identityDocumentRelDate: {},
      identityDocumentExpDate: {
        type: 'date',
      },
      docIdentCopyFile: {
        type: 'filePicker',
      },
      state: {},
      address: {},
      // streetType: {
      //
      // },
      streetName: {
        type: 'streetName',
      },
      buildingNum: {},
      unitNumber: {},
      city: {},
      zip: {},
      phone: {
        type: 'num',
      },
      identityDocumentCountry: {
        type: 'country',
        show: false,
      },
    },
    fieldsDropDown: {
      gender: '',
      genderShow: '',
    },
    fieldsDatePickerValue: {
      birthDate: '',
    },
    localFieldsValue: {},
    localPersonValue: {},
    fieldsEr: {},
    fieldsRendered: false,
  }),
  mounted() {
    // this.localProfile = { ...this.getProfile };

    this.refrashFieldEr();

    this.setDefaultProfile();

    this.fieldsRendered = true;

    this.userFieldsRules.nickname.title = this.$t('profile.filed.nickname');
    this.userFieldsRules.firstName.title = this.$t('profile.filed.firstName');
    this.userFieldsRules.lastName.title = this.$t('profile.filed.lastName');
    this.userFieldsRules.birthDate.title = this.$t('profile.filed.birthDate');
    this.userFieldsRules.birthPlace.title = this.$t('profile.filed.birthPlace');
    this.userFieldsRules.identityDocument.title = this.$t('profile.filed.identityDocument');
    this.userFieldsRules.identityDocumentNumber.title = this.$t('profile.filed.identityDocumentNumber');
    this.userFieldsRules.identityDocumentRelDate.title = this.$t('profile.filed.identityDocumentRelDate');
    this.userFieldsRules.identityDocumentExpDate.title = this.$t('profile.filed.identityDocumentExpDate');
    this.userFieldsRules.docIdentCopyFile.title = this.$t('profile.filed.docIdentCopyFile');
    this.userFieldsRules.state.title = this.$t('profile.filed.state');
    // this.userFieldsRules.streetType.title = 'Street type';
    this.userFieldsRules.streetName.title = this.$t('profile.filed.streetName');
    this.userFieldsRules.buildingNum.title = this.$t('profile.filed.buildingNum');
    this.userFieldsRules.unitNumber.title = this.$t('profile.filed.unitNumber');
    this.userFieldsRules.city.title = this.$t('profile.filed.city');
    this.userFieldsRules.zip.title = this.$t('profile.filed.zip');
    this.userFieldsRules.phone.title = this.$t('profile.filed.telephone');
    this.userFieldsRules.identityDocumentCountry.title = this.$t('profile.filed.identityDocumentCountry');
  },
  watch: {
    fieldsDropDown: {
      deep: true,
      handler(value) {
        this.localFieldsValue.person.gender = value.gender;
      },
    },
    fieldsDatePickerValue: {
      deep: true,
      handler(value) {
        console.log(value);
        this.localFieldsValue.person.birthDate = new Date(this.fieldsDatePickerValue.birthDate)
          .toISOString();
      },
    },
  },
  computed: {
    ...mapGetters([
      'getProfile',
      'getAvatar',
      'getGAEnabled',
      'getDocFile',
      'getCountris',
    ]),

    fieldsKeys() {
      const values = {};
      const { profileForm } = this.getProfile;
      Object.keys(profileForm).forEach((itemForm) => {
        values[itemForm] = Object.keys(profileForm[itemForm]);
      });
      return values;
    },
    fieldsTabsKey() {
      const { profileForm } = this.getProfile;
      return Object.keys(profileForm);
    },
    getProfileChanges() {
      const changesFields = [];
      this.userFieldsPointsSend.forEach((item) => {
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
      'fetchEditFormPerson',
    ]),
    getFieldsChanges(i) {
      const { profileForm } = this.getProfile;
      const changesFields = [];
      const formKey = Object.keys(profileForm)[i];
      Object.keys(profileForm[formKey]).forEach((item) => {
        if (this.localFieldsValue[formKey][item]
          !== this.getProfile.profileForm[formKey][item]) {
          changesFields.push(item);
        }
      });
      console.log(changesFields);
      return changesFields;
    },
    refrashFieldEr() {
      const { profileForm } = this.getProfile;
      Object.keys(profileForm).forEach((itemForm) => {
        this.fieldsEr[itemForm] = {};
        Object.keys(profileForm[itemForm]).forEach((item) => {
          this.fieldsEr[itemForm][item] = '';
        });
      });
    },
    nextVerStep() {
      if (this.verStep < 4) {
        this.verStep += 1;
      }
    },
    prevVerStep() {
      if (this.verStep > 1) {
        this.verStep -= 1;
      }
    },
    changeTab(i) {
      this.setDefaultProfile();
      this.setUserEditMode(0);
      this.tab = i;
    },
    sendVerified() {
      this.userLoader = true;
      setTimeout(() => {
        this.userLoader = false;
        this.$bvModal.show('profile-verification-send-modal');
      }, 1500);
    },
    selectDDStreetType(value) {
      this.localProfile.streetType = value;
    },
    selectIdDoc(value) {
      this.localProfile.identityDocument = value;
    },
    toggleIdDoc() {
      if (this.userEditMode === 1) {
        this.userFieldsRules.identityDocument.show = !this.userFieldsRules
          .identityDocument.show;
      }
    },
    hideIdDoc() {
      this.userFieldsRules.identityDocument.show = false;
    },
    selectCountry(value) {
      this.localProfile.identityDocumentCountry = value;
    },
    toggleCountry() {
      if (this.userEditMode === 1) {
        this.userFieldsRules.identityDocumentCountry.show = !this.userFieldsRules
          .identityDocumentCountry.show;
      }
    },
    hideCountry() {
      this.userFieldsRules.identityDocumentCountry.show = false;
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
      this.userFieldsRules.docIdentCopyFile.er = '';
      this.userLoader = true;
      const res = await this.fetchDelDocFiles(i);
      if (res.ok) {
        await this.fetchGetDocFiles();
      }
      this.userLoader = false;
    },
    async handleImageDoc(e) {
      this.userFieldsRules.docIdentCopyFile.er = '';
      console.log(e.target.files[0]);
      const fileObj = e.target.files[0];
      if (e.currentTarget !== null) {
        if (fileObj.type !== 'image/png' && fileObj.type !== 'image/jpeg' && fileObj.type !== 'application/pdf') {
          this.userFieldsRules.docIdentCopyFile.er = 'Можно загружать только .jpg, .png, .pdf файлы';
          return null;
        }
        if ((fileObj.size / 1024 / 1024) > 2) {
          this.userFieldsRules.docIdentCopyFile.er = this.$t('profile.filed.tooLarge');
          return null;
        }
        if (this.getDocFile.length === 2) {
          this.userFieldsRules.docIdentCopyFile.er = this.$t('profile.filed.onlyTwo');
          return null;
        }
        if (this.userFieldsRules.docIdentCopyFile.er === '') {
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
      Object.keys(this.getProfile.profileForm).forEach((item) => {
        this.localFieldsValue[item] = { ...this.getProfile.profileForm[item] };
      });
      this.fieldsDatePickerValue.birthDate = new Date(Date
        .parse(this.localFieldsValue.person.birthDate));
      this.fieldsDropDown.gender = this.localFieldsValue.person.gender;
    },
    checkEr() {
      this.userFieldsPoints.forEach((item) => {
        if (this.userFieldsRules[item].required && this.localProfile[item] === '') {
          this.userFieldsRules[item].er = this.$t('profile.filed.req');
        }
        if (item === 'identityDocumentExpDate' && this.localProfile[item]) {
          const now = this.now.split('/');
          const expDate = this.localProfile[item].split('/');
          if ((+expDate[2] < +now[2]
            || (+expDate[2] === +now[2] && +expDate[1] < +now[1])
            || (+expDate[2] === +now[2] && +expDate[1] === +now[1] && +expDate[0] < +now[0]))) {
            this.userFieldsRules[item].er = this.$t('profile.filed.expiryExpired');
          }
        }
      });
      return this.userFieldsPoints
        .map((item) => this.userFieldsRules[item].er !== '')
        .indexOf(true) !== -1;
    },
    async saveUser() {
      this.refrashFieldEr();
      if (true) {
        const changes = this.getFieldsChanges(this.tab);
        console.log('changes', changes);
        if (changes.length !== 0) {
          const tabKey = this.fieldsTabsKey[this.tab];
          const data = {};
          // changes.forEach((item) => {
          //   data[item] = this.localFieldsValue[tabKey][item];
          // });
          Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
            data[item] = this.localFieldsValue[tabKey][item];
          });
          console.log('data', data);
          this.userLoader = true;
          const res = await this.fetchEditFormPerson(data);
          this.userLoader = false;
          console.log(res);

          // if (!res.ok) {
          //   res.data.forEach((item) => {
          //     this.userFieldsRules[item.field].er = 'Validation error';
          //   });
          // }
          if (res.ok) {
            this.setUserEditMode(0);
            await this.fetchGetProfile();
            this.setDefaultProfile();
          }
        } else {
          this.setDefaultProfile();
          this.setUserEditMode(0);
        }
      }
    },
    toggleGender() {
      this.fieldsDropDown.genderShow = !this.fieldsDropDown.genderShow;
    },
    hideGender() {
      this.fieldsDropDown.genderShow = false;
    },
    selectGender(value) {
      this.fieldsDropDown.gender = value;
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
        this.userFieldsRules[item].er = '';
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
};
