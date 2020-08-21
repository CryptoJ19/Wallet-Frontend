import { mapActions, mapGetters } from 'vuex';
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
      return `${window.location.host}/?ref=${this.getReferal.refLink}`;
    },
  },
  data: () => ({
    sendEmail: '',
    sendMsg: '',
    sendLoading: false,
    showSendSuccessMsg: false,
    er: [],
  }),
  methods: {
    // fetchSendInvite
    ...mapActions([
      'fetchSendInvite',
      'fetchGetReferalData',
    ]),
    copy(str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    getEr(i) {
      return this.er.indexOf(i) !== -1;
    },
    checkSendInvite() {
      const emailRegex = /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
      if (this.sendEmail === '') {
        this.er.push(0);
      } else if (
        this.sendEmail.match(emailRegex) === null
      ) {
        this.er.push(1);
      }
      if (this.sendMsg === '') {
        this.er.push(2);
      }
      return this.er.length === 0;
    },
    async preludeSendInvite() {
      this.er = [];
      if (this.checkSendInvite()) {
        const data = {
          email: this.sendEmail,
          text: this.sendMsg,
          refLink: this.getReferalLink,
        };
        this.sendLoading = true;
        const res = await this.fetchSendInvite(data);
        this.sendLoading = false;
        if (res.ok) {
          this.fetchGetReferalData();
          this.showSendSuccessMsg = true;
          this.sendEmail = '';
          this.sendMsg = '';
          setTimeout(() => {
            this.showSendSuccessMsg = false;
          }, 5000);
        } else if (!res.ok && res.data[0].field === 'email') {
          this.er.push(1);
        }
      }
    },
  },
};
