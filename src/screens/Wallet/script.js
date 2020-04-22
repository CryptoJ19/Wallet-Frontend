import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import ModalSendBalance from './ModalSendBalance';
import ModalRecieve from './ModalRecieve';

export default {
  components: {
    DatePicker,
    ModalSendBalance,
    ModalRecieve,
  },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
    };
  },
  methods: {
    showSendBalance() {
      this.$bvModal.show('modal-send-balance');
    },
    showRecieve() {
      this.$bvModal.show('modal-recieve');
    },
  },
};
