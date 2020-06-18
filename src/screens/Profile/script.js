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
      'qwe',
      'qwe',
    ],
    userFields: [
      {
        title: 'asd',
      },
    ],
  }),
  mounted() {
    this.localProfile = { ...this.getProfile };
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

    disableGABtn() {

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
    async saveUser() {
      if (this.checkUserValidation()) {
        this.userLoader = true;
        const res = await this.fetchEditProfile({
          firstName: this.localProfile.firstName,
          lastName: this.localProfile.lastName,
        });
        console.log(res);
        await this.fetchGetProfile();
        this.userLoader = false;
        this.setUserEditMode(0);
      }
    },
    getUserEr(i) {
      return this.erUser.indexOf(i) !== -1;
    },
    editUser() {
      this.setUserEditMode(1);
    },
    cancelEditUser() {
      this.erUser = [];
      this.localProfile = { ...this.getProfile };
      this.setUserEditMode(0);
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
