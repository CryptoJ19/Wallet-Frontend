import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import ModalSendBalance from './components/ModalSendBalance';
import ModalRecieve from './components/ModalRecieve';
import ModalSuccessSend from './components/ModalSuccessSend';
import Loader from '../../ui/Loader';

export default {
  components: {
    Loader,
    DatePicker,
    ModalSendBalance,
    ModalRecieve,
    ModalSuccessSend,
  },
  data: () => ({
    page: 1,
    totalPages: 40,
    modalSendCurrency: '',
    time1: null,
    time2: null,
    time3: null,
    transactionsInterval: null,
    loadingTransactions: false,
  }),
  computed: {
    ...mapGetters([
      'getWallets',
      'getTransactionList',
    ]),
  },
  watch: {
    page(i, iOld) {
      if (i !== iOld) {
        if (i > this.totalPages) {
          this.setMaxPage();
        }
        this.loadingTransactions = true;
        setTimeout(() => {
          this.loadingTransactions = false;
        }, 1000);
      }
    },
  },
  created() {
    this.transactionsInterval = setInterval(
      () => {
        this.getTransactions();
      }, 30000,
    );
    return this.getTransactions();
  },
  beforeDestroy() {
    clearInterval(this.transactionsInterval);
  },
  methods: {
    ...mapActions([
      'fetchGetTransactions',
    ]),
    prevPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page = this.page + 1;
      }
    },
    setMaxPage() {
      this.page = this.totalPages;
    },
    validatePage() {
      if (this.page < 1) {
        this.page = 1;
      }
    },
    copy(str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    cutString(value) {
      const centerIndex = Math.ceil(value.length / 2);
      const lengthPoints = value.length - 20;
      return `${value.substr(0, centerIndex - (lengthPoints / 2))}${'.'.repeat(10)}${value.substr(centerIndex + (lengthPoints / 2), value.length)}`;
    },
    async getTransactions() {
      const resTrans = await this.fetchGetTransactions();
      console.log('fetchGetTransactions', resTrans);
    },
    getWalletItem(symbol) {
      if (this.getWallets.length !== 0) {
        const res = this.getWallets.filter((item) => item.currency.symbol === symbol)[0];
        if (res) {
          return res;
        }
        return 0;
      }
      return 0;
    },
    getBalance(symbol) {
      return this.getWalletItem(symbol).balance || 0;
    },
    convertToUSD(symbol) {
      const walletItem = this.getWalletItem(symbol);
      if (walletItem) {
        return walletItem.balance * walletItem.currency.currentRate;
      }
      return 0;
    },
    mathCut(i) {
      return Math.floor(i * 100) / 100;
    },
    formatDate(value) {
      const date = new Date(value);
      return [moment(String(date)).format('DD/MM/YYYY'), moment(String(date)).format('HH:mm')];
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
