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
    promoItems: [],
    amountEOS: '',
    amountCFT: '',
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
    payTab: 0,

    rateEOS: 3,
    rateCFT: 2,

    monthPool: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ],

    schema: [
      {
        from: 1000,
        to: 10000,
        bonus: 0.2,
      },
      {
        from: 10000,
        to: 50000,
        bonus: 0.25,
      },
      {
        from: 50000,
        to: 200000,
        bonus: 0.30,
      },
      {
        from: 200000,
        to: 500000,
        bonus: 0.40,
      },
      {
        from: 500000,
        to: 5000000,
        bonus: 0.50,
      },
      {
        from: 5000000,
        to: 150000000,
        bonus: 0.50,
      },
    ],
  }),
  mounted() {
    this.promoItems = this.$t('purchase.promo.items');
  },
  computed: {
    ...mapGetters([
      'getReferal',
    ]),
    checkValidPay() {
      return (this.amountCFT !== '' && this.amountCFT !== 0);
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
      const { schema } = this;
      schema.forEach((item, i) => {
        if (this.totalSum > schema[i].from && this.totalSum <= schema[i].to) {
          bonus = this.amountCFT * schema[0].bonus;
        }
      });
      return this.formatSum(bonus);
    },
  },
  watch: {
    amountEOS(value) {
      const convert = value / this.EtC;
      if (value === '') {
        this.amountCFT = '';
      } else if (this.amountCFT !== convert) {
        this.amountCFT = convert;
      }
    },
    amountCFT(value) {
      const convert = value * this.EtC;
      if (value === '') {
        this.amountEOS = '';
      } else if (this.amountEOS !== convert) {
        this.amountEOS = convert;
      }
    },
  },
  methods: {
    // fetchSendInvite
    ...mapActions([
      'fetchSendInvite',
      'getReferalData',
    ]),
    getDeliveryDate() {
      const datePlus = new Date(Date.now() + 3600 * 24 * 1000 * 31 * 3);
      return `${datePlus.getDate()} ${this.monthPool[datePlus.getMonth()]} ${datePlus.getFullYear()}`;
    },
    formatSum(value) {
      let res;
      if (value === '') {
        res = 0;
      } else {
        res = +value;
      }
      return (Math.ceil(res * 100) / 100);
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
