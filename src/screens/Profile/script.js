import { mapActions } from 'vuex';
import ModalChangePass from './components/ModalChangePass';

export default {
  components: {
    ModalChangePass,
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
  },
};
