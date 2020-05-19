import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import ModalSendBalance from './components/ModalSendBalance';
import ModalRecieve from './components/ModalRecieve';
import ModalSuccessSend from './components/ModalSuccessSend';

export default {
  components: {
    DatePicker,
    ModalSendBalance,
    ModalRecieve,
    ModalSuccessSend,
  },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
    };
  },
  methods: {
    sendSuccess() {
      this.$bvModal.hide('modal-send-balance');
      this.$bvModal.show('modal-success-send');
    },
    showSendBalance() {
      this.$bvModal.show('modal-send-balance');
    },
    showRecieve() {
      this.$bvModal.show('modal-recieve');
    },
  },
};
