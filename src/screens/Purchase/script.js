import { mapActions, mapGetters } from 'vuex';
import baseUrl from '../../../config';
import Loader from '../../ui/Loader';

export default {
  components: {
    Loader,
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
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
    payTab: 0,
  }),
  methods: {
    // fetchSendInvite
    ...mapActions([
      'fetchSendInvite',
      'getReferalData',
    ]),
    copy(str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    setPayTab(i) {
      this.payTab = i;
    },
  },
};
