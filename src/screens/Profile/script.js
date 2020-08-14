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
    fieldsTitles: {
      person: {
        title: '',
        birthDate: '',
        birthPlace: '',
        firstName: '',
        gender: '',
        lastName: '',
        middleName: '',
      },
      document: {
        title: '',
        expireDate: '',
        issueDate: '',
        number: '',
        serie: '',
        type: '',
        filePicker: '',
      },
      communication: {
        title: '',
        cellphone: '',
        telephone: '',
        email: '',
        ipAddress: '',
      },
      location: {
        title: '',
        buildingNum: '',
        city: '',
        houseExtension: '',
        province: '',
        state: '',
        streetName: '',
        streetType: '',
        unitNumber: '',
        zipCode: '',
      },
    },
    localFieldsValueCopy: {
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

    // this.fieldsTitles.person.nickname.title = this.$t('profile.filed.nickname');
    this.fieldsTitles.person.title = this.$t('profile.person.title');
    this.fieldsTitles.person.firstName = this.$t('profile.person.firstName');
    this.fieldsTitles.person.lastName = this.$t('profile.person.lastName');
    this.fieldsTitles.person.middleName = this.$t('profile.person.middleName');
    this.fieldsTitles.person.birthDate = this.$t('profile.person.birthDate');
    this.fieldsTitles.person.gender = this.$t('profile.person.gender');
    this.fieldsTitles.person.birthPlace = this.$t('profile.person.birthPlace');

    this.fieldsTitles.document.title = this.$t('profile.document.title');
    this.fieldsTitles.document.expireDate = this.$t('profile.document.expireDate');
    this.fieldsTitles.document.issueDate = this.$t('profile.document.issueDate');
    this.fieldsTitles.document.number = this.$t('profile.document.number');
    this.fieldsTitles.document.serie = this.$t('profile.document.serie');
    this.fieldsTitles.document.type = this.$t('profile.document.type');
    this.fieldsTitles.document.filePicker = this.$t('profile.document.filePicker');

    this.fieldsTitles.location.title = this.$t('profile.location.title');
    this.fieldsTitles.location.state = this.$t('profile.location.state');
    this.fieldsTitles.location.streetType = this.$t('profile.location.streetType');
    this.fieldsTitles.location.streetName = this.$t('profile.location.streetName');
    this.fieldsTitles.location.buildingNum = this.$t('profile.location.buildingNum');
    this.fieldsTitles.location.unitNumber = this.$t('profile.location.unitNumber');
    this.fieldsTitles.location.city = this.$t('profile.location.city');
    this.fieldsTitles.location.zipCode = this.$t('profile.location.zipCode');
    this.fieldsTitles.location.province = this.$t('profile.location.province');
    this.fieldsTitles.location.houseExtension = this.$t('profile.location.houseExtension');

    this.fieldsTitles.communication.title = this.$t('profile.location.title');
    this.fieldsTitles.communication.telephone = this.$t('profile.communication.telephone');
    this.fieldsTitles.communication.cellphone = this.$t('profile.communication.cellphone');
    this.fieldsTitles.communication.email = this.$t('profile.communication.email');
    this.fieldsTitles.communication.ipAddress = this.$t('profile.communication.ipAddress');
  },
  watch: {
    fieldsDropDown: {
      deep: true,
      handler(value) {
        this.localFieldsValue.person.gender = value.gender;
        this.localFieldsValue.document.type = value.type;
        this.localFieldsValue.location.streetType = value.streetType;
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
      Object.keys(countryFields).forEach((itemTab) => {
        rules[itemTab] = {};
        Object.keys(countryFields[itemTab].fields).forEach((item) => {
          rules[itemTab][item] = {
            type: countryFields[itemTab].fields[item],
            required: countryFields[itemTab].required.indexOf(item) !== -1,
          };
        });
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
      if (this.getAvatar === 'https://test.cashflash.io/api/profile/avatar/null') {
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
    async nextVerStep() {
      this.refrashFieldEr();
      const tab = this.verStep;
      if (this.checkEr(tab)) {
        const changes = this.getFieldsChanges(tab);
        if (changes.length !== 0) {
          const tabKey = this.fieldsTabsKey[tab];
          const data = {};
          Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
            if (this.localFieldsValue[tabKey][item] !== '') {
              data[item] = this.localFieldsValue[tabKey][item];
            }
          });
          this.userLoader = true;
          const res = await this.fetchEditFormPerson({ data, tab: tabKey });
          this.userLoader = false;
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
            await this.fetchGetProfile();
            this.setDefaultProfile();
            if (this.verStep < 3) {
              this.verStep += 1;
            } else {
              this.sendVerifRequest();
            }
          }
        } else {
          this.setDefaultProfile();
          if (this.verStep < 3) {
            this.verStep += 1;
          } else {
            this.sendVerifRequest();
          }
        }
      }
    },
    async sendVerifRequest() {
      await this.fetchVerifyProfile();
      await this.fetchGetProfile();
    },
    prevVerStep() {
      if (this.verStep > 0) {
        this.setDefaultProfile();
        this.verStep -= 1;
      }
    },
    changeTab(i) {
      this.setDefaultProfile();
      this.setUserEditMode(0);
      this.tab = i;
    },
    async sendVerified() {
      this.userLoader = true;
      const res = await this.fetchVerifyProfile();
      this.userLoader = false;
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
      const fileObj = e.target.files[0];
      if (document.getElementsByClassName('doc-file-input')[0]) document.getElementsByClassName('doc-file-input')[0].value = null;
      if (document.getElementsByClassName('doc-file-input')[1]) document.getElementsByClassName('doc-file-input')[1].value = null;
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
          this.userLoader = true;
          const res = await this.fetchPostDocFiles(formData);
          if (res.ok) {
            await this.fetchGetDocFiles();
          }
          this.userLoader = false;
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
      this.localFieldsValue = this.resetLocalFieldsValue();
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
    resetLocalFieldsValue() {
      return {
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
      };
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
        if (this.fieldsRules[tabKey] && this.fieldsRules[tabKey][item]) {
          if (this.fieldsRules[tabKey][item].required && this.localFieldsValue[tabKey][item] === '') {
            console.log(this.localFieldsValue[tabKey][item], tabKey, item, 'req');
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
        .map((item) => this.fieldsEr[tabKey][item] !== '').indexOf(true) === -1
      );
      return isEr;
    },
    async saveUser(tab) {
      this.refrashFieldEr();
      if (this.checkEr(tab)) {
        const changes = this.getFieldsChanges(tab);
        if (changes.length !== 0) {
          const tabKey = this.fieldsTabsKey[tab];
          const data = {};
          Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
            if (this.localFieldsValue[tabKey][item] !== '') {
              data[item] = this.localFieldsValue[tabKey][item];
            }
          });
          this.userLoader = true;
          const res = await this.fetchEditFormPerson({ data, tab: tabKey });
          this.userLoader = false;
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
    // async saveUserFirst(tab) {
    //
    // },
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
      this.refrashFieldEr();

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
