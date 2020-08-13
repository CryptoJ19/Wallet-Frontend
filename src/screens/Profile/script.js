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

    docTypes: [
      'Driver license',
      'National ID card',
      'Passport',
    ],

    genders: ['M', 'F'],
    streetTypes: [
      'Str',
      'Avenue',
    ],

    userEditMode: 0,
    localProfile: {},
    userLoader: false,

    erUser: [],
    erUserMsg: '',

    DDStreetType: false,


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
      type: '',
      typeShow: '',
      streetType: '',
      streetTypeShow: '',
    },
    fieldsDatePickerValue: {
      birthDate: '',
      expireDate: '',
      issueDate: '',
    },
    localFieldsValue: {
      person: {
        birthDate: '',
        birthPlace: '',
        firstName: '',
        gender: '',
        lastName: '',
        middleName: '',
      },
      document: {
        expireDate: '',
        issueDate: '',
        number: '',
        serie: '',
        type: '',
        filePicker: '',
      },
      communication: {
        cellphone: '',
        telephone: '',
      },
      location: {
        buildingNum: '',
        city: '',
        state: '',
        streetName: '',
        streetType: '',
        unitNumber: '',
        zipCode: '',
      },
    },
    localPersonValue: {},
    fieldsEr: {},
    fieldsRendered: false,
  }),
  mounted() {
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
        this.localFieldsValue.document.type = value.type;
        this.localFieldsValue.document.streetType = value.streetType;
      },
    },
    fieldsDatePickerValue: {
      deep: true,
      handler() {
        this.localFieldsValue.person.birthDate = new Date(this.fieldsDatePickerValue.birthDate)
          .toISOString();
        this.localFieldsValue.document.expireDate = new Date(this.fieldsDatePickerValue.expireDate)
          .toISOString();
        this.localFieldsValue.document.issueDate = new Date(this.fieldsDatePickerValue.issueDate)
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
    fieldsRules() {
      const { countryFields } = this.getProfile;
      const rules = {};
      Object.keys(countryFields.person.fields).forEach((item) => {
        rules[item] = {
          type: countryFields.person.fields[item],
          required: countryFields.person.required.indexOf(item) !== -1,
        };
      });
      return rules;
    },
    fieldsKeys() {
      const values = {};
      Object.keys(this.localFieldsValue).forEach((itemTab) => {
        values[itemTab] = Object.keys(this.localFieldsValue[itemTab]);
      });
      return values;
    },
    fieldsTabsKey() {
      const { profileForm } = this.getProfile;
      return Object.keys(profileForm);
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
      'fetchVerifyProfile',
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

      const res = this.fetchVerifyProfile();
      this.userLoader = false;
      console.log(res);

      if (res.ok) {
        this.$bvModal.show('profile-verification-send-modal');
      }
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
      document.getElementById('doc-file-input').value = null;
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
      const countryFields = {};
      Object.keys(this.getProfile.countryFields).forEach((itemTab) => {
        Object.keys(this.getProfile.countryFields[itemTab].fields).forEach((item) => {
          countryFields[itemTab] = { ...countryFields[itemTab], [item]: '' };
        });
      });
      const { profileForm } = this.getProfile;
      Object.keys(profileForm).forEach((itemTab) => {
        Object.keys(profileForm[itemTab]).forEach((item) => {
          if (profileForm[itemTab][item] !== '') {
            this.localFieldsValue[itemTab] = {
              ...countryFields[itemTab],
              ...this.localFieldsValue[itemTab],
              [item]: profileForm[itemTab][item],
            };
          }
        });
      });
      this.setDatePickers();
      this.setDropDowns();
    },
    setDropDowns() {
      this.fieldsDropDown.gender = this.localFieldsValue.person.gender;
      this.fieldsDropDown.type = this.localFieldsValue.document.type;
    },
    setDatePickers() {
      this.fieldsDatePickerValue.birthDate = this.localFieldsValue.person.birthDate !== ''
        && new Date(Date
          .parse(this.localFieldsValue.person.birthDate));
      this.fieldsDatePickerValue.expireDate = this.localFieldsValue.document.expireDate !== ''
        && new Date(Date
          .parse(this.localFieldsValue.document.expireDate));
      this.fieldsDatePickerValue.issueDate = this.localFieldsValue.document.issueDate !== ''
        && new Date(Date
          .parse(this.localFieldsValue.document.issueDate));
    },
    checkEr(tab) {
      const tabKey = this.fieldsTabsKey[tab];
      Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
        if (this.fieldsRules[item]) {
          if (this.fieldsRules[item].required && this.localFieldsValue[tabKey][item] === '') {
            this.fieldsEr[tabKey][item] = this.$t('profile.filed.req');
            const erCopy = {};
            Object.keys(this.fieldsEr).forEach((itemCopy) => {
              erCopy[itemCopy] = { ...this.fieldsEr[itemCopy] };
            });
            this.fieldsEr = { ...erCopy };
          }
          // if (item === 'identityDocumentExpDate' && this.localProfile[item]) {
          //   const now = this.now.split('/');
          //   const expDate = this.localProfile[item].split('/');
          //   if ((+expDate[2] < +now[2]
          //     || (+expDate[2] === +now[2] && +expDate[1] < +now[1])
          // || (+expDate[2] === +now[2] && +expDate[1] === +now[1] && +expDate[0] < +now[0]))) {
          // this.userFieldsRules[item].er = this.$t('profile.filed.expiryExpired');
          //   }
          // }
        }
      });
      const isEr = (Object.keys(this.fieldsEr[tabKey])
        .map((item) => {
          console.log(this.fieldsEr[tabKey], this.fieldsEr[tabKey][item] !== '', item);
          return this.fieldsEr[tabKey][item] !== '';
        }).indexOf(true) === -1
      );
      console.log(this.fieldsEr, isEr);
      return isEr;
    },
    async saveUser() {
      this.refrashFieldEr();
      if (this.checkEr(this.tab)) {
        const changes = this.getFieldsChanges(this.tab);
        console.log('changes', changes);
        if (changes.length !== 0) {
          const tabKey = this.fieldsTabsKey[this.tab];
          const data = {};
          Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
            if (this.localFieldsValue[tabKey][item] !== '') {
              data[item] = this.localFieldsValue[tabKey][item];
            }
          });
          console.log('data', data);
          this.userLoader = true;
          const res = await this.fetchEditFormPerson({ data, tab: tabKey });
          this.userLoader = false;
          console.log(res);

          if (!res.ok) {
            res.data.forEach((itemRes) => {
              this.fieldsEr[tabKey][itemRes.field] = `Server error: ${itemRes.reason}`;
              const erCopy = {};
              Object.keys(this.fieldsEr).forEach((itemCopy) => {
                erCopy[itemCopy] = { ...this.fieldsEr[itemCopy] };
              });
              this.fieldsEr = { ...erCopy };
            });
          }
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
    toggleType() {
      this.fieldsDropDown.typeShow = !this.fieldsDropDown.typeShow;
    },
    hideType() {
      this.fieldsDropDown.typeShow = false;
    },
    selectType(value) {
      this.fieldsDropDown.type = value;
    },
    toggleStreetType() {
      this.fieldsDropDown.streetTypeShow = !this.fieldsDropDown.streetTypeShow;
    },
    hideStreetType() {
      this.fieldsDropDown.streetTypeShow = false;
    },
    selectStreetType(value) {
      this.fieldsDropDown.streetType = value;
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
