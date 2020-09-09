import { mapActions, mapGetters } from 'vuex';
import Loader from '../../ui/Loader';
import ModalResponse from '../../components/ModalResponse';
import ModalPayConfirm from './ModalPayConfirm';

export default {
  components: {
    Loader,
    ModalResponse,
    ModalPayConfirm,
  },
  data: () => ({
    promoItems: [
      {
        level: 1, currencyId: 'eur', minAmount: '1000', maxAmount: '10000', reward: '20',
      },
      {
        level: 2, currencyId: 'eur', minAmount: '10001', maxAmount: '50000', reward: '25',
      },
      {
        level: 3, currencyId: 'eur', minAmount: '50001', maxAmount: '200000', reward: '30',
      },
      {
        level: 4, currencyId: 'eur', minAmount: '200001', maxAmount: '1000000', reward: '40',
      },
      {
        level: 5, currencyId: 'eur', minAmount: '1000001', maxAmount: '5000000', reward: '50',
      },
      {
        level: 6, currencyId: 'eur', minAmount: '5000001', maxAmount: '0', reward: '0',
      },
    ],
    amountEOS: '',
    amountCFT: '',
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
    payTab: 0,
    convertFlag: false,
  }),
  mounted() {
    // this.promoItems = this.$t('purchase.promo.items');
    this.monthPool = this.$t('main.monthPool');

    this.fetchGetBonusesList();
    this.fetchGetCurrencies();
  },
  computed: {
    ...mapGetters([
      'getReferal',
      'getCurrencies',
      'getBonuses',
    ]),
    // getBonuses() {
    //   return this.promoItems;
    // },
    rateCFT() {
      return this.getCurrencyByName('CFT') && (this.getCurrencyByName('CFT').currentRate / this.getCurrencyByName('EUR').currentRate);
    },
    rateEUR() {
      return this.getCurrencyByName('EUR') && (this.getCurrencyByName('EUR').currentRate / 1000000);
    },
    rateEOS() {
      return this.getCurrencyByName('EOS') && (this.getCurrencyByName('EOS').currentRate / this.getCurrencyByName('EUR').currentRate);
    },
    checkValidPay() {
      return (this.amountCFT === '' || this.amountCFT === 0 || this.getBonuses[5].minAmount <= this.totalSum);
    },
    getReferalLink() {
      return `${window.location.host}/?ref=${this.getReferal.refLink}`;
    },
    EtC() {
      return this.rateEOS / this.rateCFT;
    },
    totalSum() {
      return this.formatSum(this.amountCFT * this.rateCFT);
    },
    bonus() {
      let bonus = '';
      const { getBonuses } = this;
      getBonuses.forEach((item, i) => {
        if (this.totalSum >= getBonuses[i].minAmount
          && this.totalSum <= getBonuses[i].maxAmount
          && getBonuses[i].reward !== 0) {
          bonus = this.amountCFT * (getBonuses[i].reward / 100);
        }
      });
      return this.formatSum(bonus);
    },
  },
  watch: {
    amountEOS(value) {
      const convert = Math.floor((value / this.EtC) * 10000) / 10000;
      if (this.convertFlag === true) {
        if (value === '') {
          this.amountCFT = '';
        } else if (this.amountCFT !== convert) {
          this.amountCFT = convert;
        }
        this.convertFlag = false;
      }
    },
    amountCFT(value) {
      const convert = Math.floor((value * this.EtC) * 10000) / 10000;
      if (this.convertFlag === true) {
        if (value === '') {
          this.amountEOS = '';
        } else if (this.amountEOS !== convert) {
          this.amountEOS = convert;
        }
        this.convertFlag = false;
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchSendInvite',
      'fetchGetReferalData',
      'fetchGetBonusesList',
      'fetchGetCurrencies',
    ]),
    getCurrencyByName(currency) {
      return this.getCurrencies.find((item) => {
        if (item.id.toUpperCase() === currency) {
          return item;
        }
        return false;
      });
    },
    onChangeField() {
      this.convertFlag = true;
    },
    getDeliveryDate() {
      const datePlus = new Date(Date.now() + 3600 * 24 * 1000 * 31 * 3);
      return `${this.monthPool[datePlus.getMonth()]} ${datePlus.getDate()}, ${datePlus.getFullYear()}`;
    },
    formatSum(value) {
      let res;
      if (value === '') {
        res = 0;
      } else {
        res = +value;
      }
      // return (Math.floor(res * 100) / 100);
      return Math.floor(res);
    },
    setPayTab(i) {
      this.payTab = i;
    },
    resrashPayForm() {
      this.payTab = 0;
      this.amountCFT = '';
    },
    showPaySuccessModal() {
      this.resrashPayForm();
      this.showModal('pay-success-modal');
    },
    showPayFailModal() {
      this.resrashPayForm();
      this.showModal('pay-fail-modal');
    },
    showPayConfirmModal() {
      this.showModal('modal-pay-confirm');
    },
    showModal(value) {
      this.$bvModal.show(value);
    },
    hideModal(value) {
      this.$bvModal.hide(value);
    },
  },
};
