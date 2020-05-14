import { mapActions, mapGetters } from 'vuex';
import ModalChangePass from './components/ModalChangePass';
import ModalEnableGA from './components/ModalEnableGA';
import ModalSuccessGA from './components/ModalSuccessGA';
import Loader from '~/src/ui/Loader';

export default {
  data: () => ({
    userEditMode: 0,
    localProfile: {},
    userLoader: false,

    erUser: [],
    erUserMsg: '',
  }),
  mounted() {
    this.localProfile = { ...this.getProfile };
  },
  components: {
    Loader,
    ModalChangePass,
    ModalEnableGA,
    ModalSuccessGA,
  },
  computed: {
    ...mapGetters([
      'getProfile',
      'getGAEnabled',
    ]),
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
    GASubmiteSuccess() {
      this.$bvModal.hide('modal-enable-ga');
      this.$bvModal.show('modal-success-ga');

      setTimeout(() => {
      }, 600);
    },
    async saveUser() {
      if (this.checkUserValidation()) {
        this.userLoader = true;

        const res = await this.fetchEditProfile({
          firstName: this.localProfile.firstName,
          lastName: this.localProfile.lastName,
          nickname: this.localProfile.nickname,
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
      this.localProfile = { ...this.getProfile };
      this.setUserEditMode(0);
    },
    setUserEditMode(i) {
      this.userEditMode = i;
    },
    imagePath() {
      return require('assets/imgs/ava.png');
    },
    showChangePass() {
      this.$bvModal.show('modal-change-pass');
    },
    showEnableGA() {
      this.$bvModal.show('modal-enable-ga');
    },
    checkUserValidation() {
      const {
        firstName,
        lastName,
        nickname,
      } = this.localProfile;
      const firstNameLocal = firstName.trim();
      const lastNameLocal = lastName.trim();
      const nicknameLocal = nickname.trim();
      this.localProfile = {
        ...this.localProfile,
        firstName: firstNameLocal,
        lastName: lastNameLocal,
        nickname: nicknameLocal,
      };

      this.erUser = [];
      // const nicknameRegex = /^[a-zA-Z0-9-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

      if (this.localProfile.firstName === '') {
        this.erUser.push(0);
      }
      if (this.localProfile.lastName === '') {
        this.erUser.push(1);
      }
      if (this.localProfile.nickname === '') {
        this.erUser.push(2);
      }
      return this.erUser.length === 0;
    },
  },
};
