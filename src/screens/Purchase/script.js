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
    d: '00',
    h: '00',
    m: '00',
    s: '00',
    promoItems: [],
    amountEOS: '',
    amountCFT: '',
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
    payTab: 0,
    convertFlag: false,
    currencies: [],
  }),
  mounted() {
    // this.promoItems = this.$t('purchase.promo.items');
    this.monthPool = this.$t('main.monthPool');

    const icoTime = new Date(1638637200000); // Dec 5
    const timer = setInterval(() => {
      const now = new Date();
      const difference = icoTime - now;
      if (difference < 0){
        this.d = '00';
        this.h = '00';
        this.m = '00';
        this.s = '00'
        clearInterval(timer);
      }
      const calculated = this.calculateTime(icoTime, now);
      this.d = this.minTwoDigits(calculated.days);
      this.h = this.minTwoDigits(calculated.hours);
      this.m = this.minTwoDigits(calculated.minutes);
      this.s = this.minTwoDigits(calculated.seconds);
    }, 1000);

    this.getBonusesListAsync();
    this.processCurrencies();
  },
  computed: {
    ...mapGetters(['getReferal', 'getCurrencies', 'getBonuses', 'getCurrencyByName']),
    rateCFT() {
      return (
        this.getCurrencyByName('CFT') &&
        this.getCurrencyByName('CFT').currentRate / this.getCurrencyByName('EUR').currentRate
      );
    },
    rateEUR() {
      return this.getCurrencyByName('EUR') && this.getCurrencyByName('EUR').currentRate / 1000000;
    },
    rateEOS() {
      return (
        this.getCurrencyByName('EOS') &&
        this.getCurrencyByName('EOS').currentRate / this.getCurrencyByName('EUR').currentRate
      );
    },
    checkValidPay() {
      return (
        this.amountCFT === '' ||
        this.amountCFT === 0 ||
        this.getBonuses[5].minAmount <= this.totalSum ||
        this.totalSum > this.getBonuses[4].maxAmount
      );
    },
    getReferalLink() {
      return `${window.location.host}/?ref=${this.getReferal.refLink}`;
    },
    EtC() {
      return this.rateEOS / this.rateCFT;
    },
    totalSum() {
      return this.amountCFT * this.rateCFT
      // return this.formatSum(this.amountCFT * this.rateCFT);
    },
    bonus() {
      let bonus = '';
      const { getBonuses } = this;
      getBonuses.forEach((item, i) => {
        if (
          this.totalSum >= getBonuses[i].minAmount &&
          this.totalSum <= getBonuses[i].maxAmount &&
          getBonuses[i].reward !== 0
        ) {
          bonus = this.amountCFT * (getBonuses[i].reward / 100);
        }
      });
      return this.formatSum(bonus);
    },
  },
  watch: {
    amountEOS(value) {
      const convert =
        Math.ceil(
          ((value * this.getCurrencyByName('EOS').currentRate) /
            this.getCurrencyByName('CFT').currentRate) *
            10000,
        ) / 10000;
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
      const convert =
        Math.ceil(
          ((value * this.getCurrencyByName('CFT').currentRate) /
            this.getCurrencyByName('EOS').currentRate) *
            10000,
        ) / 10000;
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
    ...mapActions(['fetchSendInvite', 'fetchGetReferalData', 'fetchGetBonusesList']),
    async getBonusesListAsync() {
      try {
        const res = await this.fetchGetBonusesList();
        this.promoItems = [...res.result];
      } catch (error) {
        console.log(error);
      }
    },
    processCurrencies(){
      this.currencies = this.getCurrencies.map(el => ({name: el.symbol, price: el.currentRate, change: Math.ceil(el.change * 100) / 100}))
    },
    minTwoDigits(n) {
      return (n < 10 ? '0' : '') + n;
    },
    calculateTime(icoTime, now){
      const difference = icoTime - now;
      let seconds = Math.floor(( icoTime - (now) ) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      hours -= (days * 24);
      minutes = minutes - (days * 24 * 60) - (hours * 60);
      seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
      days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      return {days, hours, minutes, seconds}
    },
    onChangeField() {
      this.convertFlag = true;
    },
    getDeliveryDate() {
      const datePlus = new Date(Date.now() + 3600 * 24 * 1000 * 31 * 3);
      return `${
        this.monthPool[datePlus.getMonth()]
      } ${datePlus.getDate()}, ${datePlus.getFullYear()}`;
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
