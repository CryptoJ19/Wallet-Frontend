import { mapActions, mapGetters } from 'vuex';
import ModalChangePass from './components/ModalChangePass';
import ModalEnableGA from './components/ModalEnableGA';
import Loader from '~/src/ui/Loader';

export default {
  data: () => ({
    userEditMode: 0,
    localProfile: {},
    userLoader: false,
  }),
  mounted() {
    this.localProfile = { ...this.getProfile };
  },
  components: {
    Loader,
    ModalChangePass,
    ModalEnableGA,
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
    // profile: ({ getProfile }) => ({ ...getProfile }),
    userBoxClass: ({ userEditMode }) => ({ user_disable: userEditMode === 0 }),
  },
  watch: {
    profile() {
      console.log('getProfile 2');
    },
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    saveUser() {
      this.userLoader = true;

      setTimeout(() => {
        this.userLoader = false;
        this.cancelEditUser();
      }, 400);
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
  },
};
