import { mapActions, mapGetters } from 'vuex';
import { baseUrl } from '../../../config';
import Loader from '../../ui/Loader';
import ModalResponse from '../../components/ModalResponse';
import ModalPayConfirm from './ModalPayConfirm';

export default {
  components: {
    Loader,
    ModalResponse,
    ModalPayConfirm,
  },
  computed: {
    ...mapGetters([
      'getReferal',
    ]),
    getReferalLink() {
      return `${baseUrl}/?ref=${this.getReferal.refLink}`;
    },
  },
  data: () => ({
    promoItems: [],
    amount: '',
    totalSum: '',
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
    payTab: 0,
  }),
  mounted() {
    this.promoItems = this.$t('purchase.promo.items');
  },
  methods: {
    // fetchSendInvite
    ...mapActions([
      'fetchSendInvite',
      'getReferalData',
    ]),
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
    showPaySuccessModal() {
      this.showModal('pay-success-modal');
    },
    showPayFailModal() {
      this.showModal('pay-fail-modal');
    },
    showModal(value) {
      this.$bvModal.show(value);
    },
    hideModal(value) {
      this.$bvModal.hide(value);
    },

  },
};
