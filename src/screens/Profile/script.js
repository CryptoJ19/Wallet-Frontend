import { mapActions } from 'vuex';
import ModalChangePass from './components/ModalChangePass';
import ModalEnableGA from './components/ModalEnableGA';

export default {
  components: {
    ModalChangePass,
    ModalEnableGA,
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
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
