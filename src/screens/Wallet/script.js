import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters } from 'vuex';
import moment from 'moment';
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
  data: () => ({
    modalSendCurrency: '',
    time1: null,
    time2: null,
    time3: null,
  }),
  computed: {
    ...mapGetters([
      'getWallets',
      'getTransactionList',
    ]),
  },
  methods: {
    convertEOSUSD(walletIndex) {
      return (this.getWallets[walletIndex].balance
        * this.getWallets[walletIndex].currency.currentRate);
    },
    mathCut(i) {
      return Math.floor(i * 100) / 100;
    },
    formatDate(value) {
      const date = new Date(value);
      return `${moment(String(date)).format('DD/MM/YYYY')} at ${moment(String(date)).format('HH:mm')}`;
    },
    sendSuccess() {
      this.$bvModal.hide('modal-send-balance');
      this.$bvModal.show('modal-success-send');
    },
    showSendBalance(currency) {
      this.modalSendCurrency = currency;
      this.$bvModal.show('modal-send-balance');
    },
    showRecieve() {
      this.$bvModal.show('modal-recieve');
    },
  },
};
