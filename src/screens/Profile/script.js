import { mapActions, mapGetters, mapMutations } from 'vuex';
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

const apiUrl = process.env.BASE_URL;

export default {
  directives: {
    ClickOutside,
  },
  data: () => ({
    verStep: 0,
    tab: 0,
    now: moment(String(new Date())).format('DD/MM/YYYY'),
    docTypes: [],
    genders: ['M', 'F'],
    gendersName: {},
    streetTypes: [],
    userEditMode: 0,
    localProfile: {},
    userLoader: false,
    erUser: [],
    erUserMsg: '',
    fieldsDropDown: {
      gender: '',
      genderShow: false,
      type: '',
      typeShow: false,
      streetType: '',
      streetTypeShow: false,
    },
    fieldsDatePickerValue: {
      birthDate: '',
    },
    localFieldsValue: {},
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
        number: '',
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
        country: '',
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
    localPersonValue: {},
    fieldsEr: {},
    fieldsRendered: false,
  }),
  mounted() {
    this.fetchTempGAToken();
    this.refrashFieldEr();
    this.setDefaultProfile();
    this.gendersName = this.$t('profile.gendersName');
    this.streetTypes = this.$t('profile.streetTypes');
    this.docTypes = this.$t('profile.docTypes');
    this.setFieldsTitles();
    this.fieldsRendered = true;
  },
  watch: {
    fieldsDropDown: {
      deep: true,
      handler(value) {
        this.localFieldsValue.person.gender = value.gender;
        this.localFieldsValue.location.streetType = value.streetType;
        if (value.countryDoc !== '') {
          this.localFieldsValue.document.country = value.countryDoc;
        }
      },
    },
    fieldsDatePickerValue: {
      deep: true,
      handler() {
        this.localFieldsValue.person.birthDate = this.createDate('birthDate');
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
      'verificationError',
      'verificationErrorReasons',
      'defaultVerificationError',
      'getCountryFields',
    ]),
    fieldsRules() {
      const { countryFields } = this.getProfile;
      const rules = {};
      Object.keys(countryFields).forEach((itemTab) => {
        rules[itemTab] = {};
        Object.keys(countryFields[itemTab].fields).forEach((item) => {
          // console.log(countryFields[itemTab]);
          rules[itemTab][item] = {
            type: countryFields[itemTab].fields[item],
            required:
              countryFields[itemTab].required &&
              countryFields[itemTab].required.indexOf(item) !== -1,
          };
        });
      });

      return rules;
    },
    fieldsKeys() {
      const keys = {};
      const fields = this.resetLocalFieldsValue();
      const countryFields = {};
      const self = this;
      Object.keys(self.getCountryFields).forEach((itemTab) => {
        countryFields[itemTab] = [];
        Object.keys(self.getCountryFields[itemTab].fields).forEach((item) => {
          countryFields[itemTab].push(item);
        });
      });
      Object.keys(fields).forEach((itemTab) => {
        const arr = [...Object.keys(fields[itemTab])];
        const countryArr = countryFields[itemTab] || [];
        keys[itemTab] = [...new Set([...arr, ...countryArr])];
      });

      keys.location.unshift('country');

      return keys;
    },
    // fieldsKeysOld() {
    //   const values = {};
    //   Object.keys(this.localFieldsValue).forEach((itemTab) => {
    //     values[itemTab] = Object.keys(this.localFieldsValue[itemTab]);
    //   });
    //   return values;
    // },
    fieldsTabsKey() {
      const { profileForm } = this.getProfile;
      return Object.keys(profileForm);
    },
    avatarBg() {
      if (this.getAvatar === `${apiUrl}/profile/avatar/null` || this.getAvatar === null) {
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
      'setErrorTextFromResponse',
      'fetchCheckGA',
      'fetchTempGAToken',
    ]),
    ...mapMutations(['setVerificationError', 'setDefaultVerificationError']),
    createDate(item) {
      let date;
      if (this.fieldsDatePickerValue[item] === null || this.fieldsDatePickerValue[item] === false) {
        date = '';
      } else {
        date = new Date(
          new Date(this.fieldsDatePickerValue[item]) -
          new Date(this.fieldsDatePickerValue[item]).getTimezoneOffset() * 60 * 1000,
        ).toISOString();
      }
      return date;
    },
    getFieldsChanges(i) {
      const { profileForm } = this.getProfile;
      const changesFields = [];
      const formKey = Object.keys(profileForm)[i];
      Object.keys(profileForm[formKey]).forEach((item) => {
        if (this.localFieldsValue[formKey][item] !== this.getProfile.profileForm[formKey][item]) {
          changesFields.push(item);
        }
      });
      console.log(changesFields);
      return changesFields;
    },
    refrashFieldEr() {
      Object.keys(this.fieldsKeys).forEach((itemForm) => {
        this.fieldsEr[itemForm] = {};
        this.fieldsKeys[itemForm].forEach((item) => {
          this.fieldsEr[itemForm][item] = '';
        });
      });
    },
    setFieldEr(itemForm, item, value) {
      const copy = this.fieldsEr[itemForm];
      this.fieldsEr[itemForm] = {};
      copy[item] = value;
      this.fieldsEr = {
        ...this.fieldsEr,
        [itemForm]: copy,
      };
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
              data[item] = `${this.localFieldsValue[tabKey][item]}`;
            }
          });
          this.userLoader = true;
          const res = await this.fetchEditFormPerson({ data, tab: tabKey });
          this.userLoader = false;
          if (!res.ok && res.code === 400000) {
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
      this.refrashFieldEr();
      this.tab = i;
    },
    async sendVerified() {
      this.userLoader = true;
      const res = await this.fetchVerifyProfile();
      this.userLoader = false;
      if (res.ok) {
        this.$bvModal.show('profile-verification-send-modal');
      } else {
        await this.setErrorTextFromResponse(res);
        this.showVerificationErrorModal();
      }
      await this.fetchGetProfile();
      // await this.getProfile();
    },
    cutString(value) {
      const centerIndex = Math.ceil(value.length / 2);
      if (value.length > 12) {
        const lengthPoints = value.length - 10;
        return `${value.substr(0, centerIndex - lengthPoints / 2)}${'.'.repeat(3)}${value.substr(
          centerIndex + lengthPoints / 2,
          value.length,
        )}`;
      }
      return value;
    },
    async removeDocFile(i) {
      // this.userFieldsRules.docIdentCopyFile.er = '';
      this.userLoader = true;
      const res = await this.fetchDelDocFiles(i);
      if (res.ok) {
        await this.fetchGetDocFiles();
      }
      this.userLoader = false;
    },
    async handleImageDoc(e) {
      this.refrashFieldEr();
      const fileObj = e.target.files[0];
      if (document.getElementsByClassName('doc-file-input')[0])
        document.getElementsByClassName('doc-file-input')[0].value = null;
      if (document.getElementsByClassName('doc-file-input')[1])
        document.getElementsByClassName('doc-file-input')[1].value = null;
      if (e.currentTarget !== null) {
        if (
          fileObj.type !== 'image/png' &&
          fileObj.type !== 'image/jpeg' &&
          fileObj.type !== 'application/pdf'
        ) {
          this.setFieldEr('document', 'filePicker', this.$t('profile.filed.types'));
          return null;
        }
        if (fileObj.size / 1024 / 1024 > 2) {
          this.setFieldEr('document', 'filePicker', this.$t('profile.filed.tooLarge'));
          return null;
        }
        if (this.getDocFile.length === 2) {
          this.setFieldEr('document', 'filePicker', this.$t('profile.filed.onlyTwo'));
          return null;
        }
        if (this.fieldsEr.document.filePicker === '') {
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
      this.setFields();
      this.setDatePickers();
      this.setDropDowns();
    },
    setFields() {
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
    },
    resetLocalFieldsValue() {
      return {
        person: {
          firstName: '',
          middleName: '',
          lastName: '',
          birthDate: '',
          birthPlace: '',
          gender: '',
        },
        document: {
          number: '',
        },
        communication: {
          telephone: '',
          cellphone: '',
        },
        location: {
          state: '',
          city: '',
          streetType: '',
          streetName: '',
          buildingNum: '',
          unitNumber: '',
          zipCode: '',
        },
      };
    },
    setDropDowns() {
      this.fieldsDropDown.gender = this.localFieldsValue.person.gender;
      this.fieldsDropDown.type = this.localFieldsValue.document.type;
      this.fieldsDropDown.streetType = this.localFieldsValue.location.streetType;
      this.fieldsDropDown.countryDoc = this.localFieldsValue.document.country || '';
    },
    setDatePickers() {
      this.fieldsDatePickerValue.birthDate =
        this.localFieldsValue.person.birthDate !== '' &&
        new Date(Date.parse(this.localFieldsValue.person.birthDate));
      this.fieldsDatePickerValue.expireDate =
        this.localFieldsValue.document.expireDate !== '' &&
        new Date(Date.parse(this.localFieldsValue.document.expireDate));
      this.fieldsDatePickerValue.issueDate =
        this.localFieldsValue.document.issueDate !== '' &&
        new Date(Date.parse(this.localFieldsValue.document.issueDate));
    },
    checkEr(tab) {
      const tabKey = this.fieldsTabsKey[tab];
      Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
        if (this.fieldsRules[tabKey] && this.fieldsRules[tabKey][item]) {
          if (
            this.fieldsRules[tabKey][item].required &&
            this.localFieldsValue[tabKey][item] === ''
          ) {
            // console.log(this.localFieldsValue[tabKey][item], tabKey, item, 'req');
            this.fieldsEr[tabKey][item] = this.$t('profile.req');
            const erCopy = {};
            Object.keys(this.fieldsEr).forEach((itemCopy) => {
              erCopy[itemCopy] = { ...this.fieldsEr[itemCopy] };
            });
            this.fieldsEr = { ...erCopy };
          }
          // if (tabKey === 'document' && item === 'expireDate') {
          //
          // }
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
      const isEr =
        Object.keys(this.fieldsEr[tabKey])
          .map((item) => this.fieldsEr[tabKey][item] !== '')
          .indexOf(true) === -1;
      return isEr;
    },
    async saveUser(tab) {
      this.refrashFieldEr();
      if (this.checkEr(tab)) {
        const tabKey = this.fieldsTabsKey[tab];
        const data = {};
        Object.keys(this.localFieldsValue[tabKey]).forEach((item) => {
          if (this.localFieldsValue[tabKey][item] !== '') {
            data[item] = `${this.localFieldsValue[tabKey][item]}`;
          }
        });
        this.userLoader = true;
        const res = await this.fetchEditFormPerson({ data, tab: tabKey });
        this.userLoader = false;
        if (!res.ok && res.code === 400000) {
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
    toggleCountryDoc() {
      this.fieldsDropDown.countryDocShow = !this.fieldsDropDown.countryDocShow;
    },
    hideCountryDoc() {
      this.fieldsDropDown.countryDocShow = false;
    },
    selectCountryDoc(value) {
      this.fieldsDropDown.countryDoc = value;
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
    },
    clearEr() { },
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
    setFieldsTitles() {
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
      this.fieldsTitles.document.country = this.$t('profile.document.country');

      this.fieldsTitles.location.title = this.$t('profile.location.title');
      this.fieldsTitles.location.country = this.$t('profile.location.country');
      this.fieldsTitles.location.state = this.$t('profile.location.state');
      this.fieldsTitles.location.streetType = this.$t('profile.location.streetType');
      this.fieldsTitles.location.streetName = this.$t('profile.location.streetName');
      this.fieldsTitles.location.buildingNum = this.$t('profile.location.buildingNum');
      this.fieldsTitles.location.unitNumber = this.$t('profile.location.unitNumber');
      this.fieldsTitles.location.city = this.$t('profile.location.city');
      this.fieldsTitles.location.zipCode = this.$t('profile.location.zipCode');
      this.fieldsTitles.location.province = this.$t('profile.location.province');
      this.fieldsTitles.location.houseExtension = this.$t('profile.location.houseExtension');

      this.fieldsTitles.communication.title = this.$t('profile.communication.title');
      this.fieldsTitles.communication.telephone = this.$t('profile.communication.telephone');
      this.fieldsTitles.communication.cellphone = this.$t('profile.communication.cellphone');
      this.fieldsTitles.communication.email = this.$t('profile.communication.email');
      this.fieldsTitles.communication.ipAddress = this.$t('profile.communication.ipAddress');
    },
    showVerificationErrorModal() {
      this.$bvModal.show('profile-verification-send-modal_fail');
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
