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

    docIdentCopyFileData: ['file.pdf'],

    userFieldsPoints: [
      'nickname',
      'firstName',
      'lastName',
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
      birth: {
        er: '',
      },
      placeBirth: {
        er: '',
      },
      docIdent: {
        er: '',
      },

      docNum: {
        er: '',
      },
      releaseDate: {
        er: '',
      },
      expireDate: {
        er: '',
      },
      docIdentCopy: {
        er: '',
      },
      docIdentCopyFile: {
        er: '',
        type: 'filePicker',
      },
      state: {
        er: '',
      },
      street: {
        er: '',
      },
      city: {
        er: '',
      },
      cap: {
        er: '',
      },
      phone: {
        er: '',
        type: 'phone',
      },
    },
  }),
  mounted() {
    // this.localProfile = { ...this.getProfile };
    this.setDefaultProfile();

    this.userFields.nickname.title = 'Сash Flash name';
    this.userFields.firstName.title = 'Name *';
    this.userFields.lastName.title = 'Surname *';
    this.userFields.birth.title = 'Date of birth *';
    this.userFields.placeBirth.title = 'Place of birth *';
    this.userFields.docIdent.title = 'Identity document *';

    this.userFields.docNum.title = 'Document # *';
    this.userFields.releaseDate.title = 'Release date *';
    this.userFields.expireDate.title = 'Expiry date *';
    this.userFields.docIdentCopy.title = 'Copy of identity document *';
    this.userFields.docIdentCopyFile.title = 'Choose file  *';

    this.userFields.state.title = 'State *';
    this.userFields.street.title = 'Street and number  *';
    this.userFields.city.title = 'City *';
    this.userFields.cap.title = 'C.A.P. *';
    this.userFields.phone.title = 'Telephone *';
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
      'fetchGetDocFiles',
      'fetchPostDocFiles',
      'fetchDelDocFiles',
    ]),
    cutString(value) {
      const centerIndex = Math.ceil(value.length / 2);
      if (value.length > 12) {
        const lengthPoints = value.length - 10;
        return `${value.substr(0, centerIndex - (lengthPoints / 2))}${'.'.repeat(3)}${value.substr(centerIndex + (lengthPoints / 2), value.length)}`;
      }
      return value;
    },
    removeDocFile(i) {
      this.userFields.docIdentCopyFile.er = '';
      this.userLoader = true;
      setTimeout(() => {
        this.docIdentCopyFileData.splice(i, 1);
        this.userLoader = false;
      }, 1500);
    },
    async handleImageDoc(e) {
      this.userFields.docIdentCopyFile.er = '';
      console.log(e.target.files[0]);
      const fileObj = e.target.files[0];
      if (e.currentTarget !== null) {
        if ((fileObj.size / 1024 / 1024) > 2) {
          this.userFields.docIdentCopyFile.er = 'Слишком большой файл';
        }
        if (this.docIdentCopyFileData.length === 2) {
          this.userFields.docIdentCopyFile.er = 'Можно загрузить только 2 файла';
        }
        if (this.userFields.docIdentCopyFile.er === '') {
          // const data = {
          //   file: fileObj,
          // };

          const formData = new FormData();
          formData.append('file', fileObj);
          console.log(formData, fileObj);
          this.userLoader = true;
          const res = await this.fetchPostDocFiles(formData);
          this.userLoader = false;
          this.docIdentCopyFileData.push(fileObj.name);

          console.log(res);
        }
      }
      // setTimeout(() => {
      // }, 1500);
      // this.er = [];
      // const fileObj = e.target.files[0];
      // console.log('fileObj', fileObj.size / 1024 / 1024);
      //
      //
      // if (e.currentTarget !== null) {
      //   if ((fileObj.size / 1024 / 1024) > 5) {
      //     this.er.push(1);
      //   }
      //   if (this.er.length === 0) {
      //     this.loading = true;
      //     this.createBase64Image(fileObj);
      //   }
      // }
    },
    setDefaultProfile() {
      this.localProfile = {
        ...this.getProfile,
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
          firstName: this.localProfile.firstName,
          lastName: this.localProfile.lastName,
        };
        // if (this.localProfile.phone !== '' && this.localProfile.phone !== null) {
        //   data.phone = this.localProfile.phone;
        // }
        this.userFieldsPoints.forEach((item) => {
          if (this.localProfile[item] !== '' && this.localProfile[item] !== null) {
            data[item] = this.localProfile[item];
          }
        });
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
