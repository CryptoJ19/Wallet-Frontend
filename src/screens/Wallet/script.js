import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import ModalSendBalance from './components/ModalSendBalance';
import ModalRecieve from './components/ModalRecieve';
import ModalSuccessSend from './components/ModalSuccessSend';
import Loader from '../../ui/Loader';
import { config } from '../../../config';

export default {
  components: {
    Loader,
    DatePicker,
    ModalSendBalance,
    ModalRecieve,
    ModalSuccessSend,
  },
  data: () => ({
    rewardPage: 0,
    page: 1,
    modalSendCurrency: '',
    loadingWallet: true,
    transactionsInterval: null,
    loadingTransactions: false,
    limit: config.transactionsItemsLength,
    // test: [
    //   {
    //     currencyId: 'cft',
    //     paymentDate: '2020-11-25T00:00:00.000Z',
    //     reward: '0.48',
    //   },
    // ],
  }),
  computed: {
    ...mapGetters([
      'getWallets',
      'getTransactionList',
      'getTransactionCount',
      'getMyBonuses',
    ]),
    totalPages() {
      return Math.ceil(this.getTransactionCount / this.limit);
    },
    getDeliveryDate() {
      if (this.getMyBonuses.length !== 0) {
        const datePlus = new Date(this.getMyBonuses[this.rewardPage].paymentDate);
        return [`${this.monthPool[datePlus.getMonth()]} ${datePlus.getDate()}`, `${datePlus.getFullYear()}`];
      }
      return false;
    },
  },
  watch: {
    page(i, iOld) {
      if (i !== iOld && i !== '') {
        if (i > this.totalPages) {
          this.setMaxPage();
        }
        if (i <= this.totalPages && iOld <= this.totalPages && (i !== 0 && iOld !== '')) {
          // console.log(i, iOld);
          this.loadingTransactions = true;
          this.getTransactions();
        }
      }
    },
  },
  created() {
    this.monthPool = this.$t('main.monthPool');
  },
  mounted() {
    this.transactionsInterval = setInterval(
      () => {
        this.getTransactions();
        this.fetchGetProfile();
        this.fetchGetMyBonuses();
      }, 20000,
    );
    this.initWallet();
    console.log(this.EosUrl);
  },
  beforeDestroy() {
    clearInterval(this.transactionsInterval);
  },
  methods: {
    ...mapActions([
      'fetchGetTransactions',
      'fetchGetProfile',
      'fetchGetMyBonuses',
    ]),
    goTo(value) {
      window.open(value, '_blank');
    },
    async initWallet() {
      const resBonuses = this.fetchGetMyBonuses();
      const resTrans = this.getTransactions();
      const resProfile = this.fetchGetProfile();

      await Promise.all([resBonuses, resProfile, resTrans]);
      this.loadingWallet = false;
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page += 1;
      }
    },
    prevRewardPage() {
      if (this.rewardPage > 0) {
        this.rewardPage -= 1;
      }
    },
    nextRewardPage() {
      if (this.rewardPage < this.getMyBonuses.length - 1) {
        this.rewardPage += 1;
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
      const data = { limit: this.limit, page: this.page };
      if (data.page <= 0) {
        data.page = 1;
      }
      await this.fetchGetTransactions(data);
      this.loadingTransactions = false;
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
    refrashTransactions() {
      this.getTransactions();
      this.fetchGetProfile();
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
