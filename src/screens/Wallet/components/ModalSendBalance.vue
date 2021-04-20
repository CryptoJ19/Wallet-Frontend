<template>
  <b-modal
    id="modal-send-balance"
    centered
    hide-header
    hide-footer
    @shown="shownModal()"
    @hide="hideModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('wallet.modalSend.title') }}
        </div>
        <button
          class="mod__closs"
          @click="closeSendBalance()"
        >
          <img
            src="~assets/imgs/icons/cross.svg"
            alt="close"
          >
        </button>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          {{ $t('wallet.balance') }}
        </div>
        <div
          class="mod__balance"
        >
          {{ currency }}
          {{ getBalance() }}
        </div>
        <div class="mode-select">
          <button
            class="mode-select__item"
            :class="{'mode-select__item_active': mode === 0}"
            @click="setMode(0)"
          >
            <div class="circle">
              <div class="circle__small" />
            </div>
            <div class="mode-select__text">
              {{ $t('wallet.modalSend.sendCashFlash') }}
            </div>
          </button>
          <button
            class="mode-select__item"
            :class="{'mode-select__item_active': mode === 1}"
            @click="setMode(1)"
          >
            <div class="circle">
              <div class="circle__small" />
            </div>
            <div class="mode-select__text">
              {{ $t('wallet.modalSend.sendOutCashFlash') }}
            </div>
          </button>
        </div>
        <div class="mod__items">
          <div class="mod__item mod__input">
            <div class="btn-max__p ui-input__body">
              <input
                v-model.trim.number="amount"
                maxlength="70"
                type="number"
                :placeholder="$t('wallet.modalSend.amount')"
              >
              <button
                class="btn-max"
                @click="setMaxAmount()"
              >
                {{ $t('wallet.modalSend.max') }}
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(0)">
                {{ $t('wallet.modalSend.enterAmount') }}
              </div>
            </div>
          </div>
          <div class="mod__item mod__input">
            <input
              v-model.trim="recipient"
              maxlength="70"
              type="text"
              :placeholder="$t('wallet.modalSend.recipient')"
            >
            <div class="form__er">
              <div v-if="getEr(1)">
                {{ $t('wallet.modalSend.enterRecipient') }}
              </div>
            </div>
          </div>
          <div class="mod__item mod__input">
            <input
              v-model.trim="memo"
              maxlength="70"
              type="text"
              :placeholder="$t('wallet.modalSend.memo')"
            >
            <div class="form__er" />
          </div>
          <div
            v-if="mode === 1"
            class="mod__item mod__input"
          >
            <div class="vinput__title">
              {{ $t('wallet.modalSend.fee') }}
            </div>
            <div class="vinput__fake">
              {{ feeComp }}
            </div>
          </div>
          <div class="form__er">
            <div v-if="getEr(3)">
              {{ $t('wallet.modalSend.errorWalletNotFound') }}
            </div>
            <div v-if="getEr(4)">
              {{ $t('wallet.modalSend.insufficientFounds') }}
            </div>
            <div v-if="getEr(5)">
              {{ $t('wallet.modalSend.errorIdenticalAddress') }}
            </div>
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="preludeSend()"
        >
          {{ $t('wallet.modalSend.sendBtn') }}
        </button>
      </div>
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loading}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Loader from '../../../ui/Loader';

export default {
  components: {
    Loader,
  },
  props: {
    currency: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    loading: true,
    mode: 0,
    amount: '',
    recipient: '',
    memo: '',
    er: [],
    fee: '-',
  }),
  computed: {
    ...mapGetters([
      'getProfile',
      'getWallets',
      'getCurrencyByName',
    ]),
    feeComp() {
      return this.getCurrencyByName(this.currency).txLimits.withdrawCommissionFixed
        / (10 ** this.getCurrencyByName(this.currency).decimals);
    },
  },
  methods: {
    ...mapActions([
      'fetchGetWithdraw',
      'fetchSendWithdraw',
      'fetchGetProfile',
    ]),
    getBalance() {
      return this.getWalletItem(this.currency).balance;
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
    setMaxAmount() {
      this.amount = this.getBalance();
    },
    setMode(value) {
      this.amount = '';
      this.recipient = '';
      this.memo = '';
      this.er = [];

      this.mode = value;
    },
    getEr(i) {
      return this.er.indexOf(i) !== -1;
    },
    hideModal() {
      setTimeout(() => {
        this.resetModal();
      }, 200);
    },
    shownModal() {
      this.loading = false;
      // this.getWithdrawData();
    },
    async getWithdrawData() {
      const res = await this.fetchGetWithdraw(this.currency);
      this.loading = false;
      console.log(res);
      if (res.ok) {
        this.fee = res.result.fee;
      }
    },
    resetModal() {
      this.fee = '-';
      this.loading = true;
      this.mode = 0;
      this.amount = '';
      this.recipient = '';
      this.memo = '';
      this.er = [];
    },
    check() {
      this.er = [];
      const {
        amount,
        recipient,
      } = this;
      if (amount === '') {
        this.er.push(0);
      }
      if (recipient === '') {
        this.er.push(1);
      }
      // if (memo === '') {
      //   this.er.push(2);
      // }
      return this.er.length === 0;
    },
    async preludeSend() {
      if (this.check()) {
        // const currency = 'EOS';
        // const res = await this.fetchGetWithdraw(currency);
        const {
          amount,
          recipient,
          currency,
          memo,
        } = this;
        let data;
        if (memo !== '') {
          data = {
            amount,
            address: recipient,
            currency,
            memo,
            internal: (this.mode === 0),
          };
        } else {
          data = {
            amount,
            address: recipient,
            currency,
            internal: (this.mode === 0),
          };
        }

        this.loading = true;
        const res = await this.fetchSendWithdraw(data);
        this.loading = false;
        console.log(res);
        if (!res.ok) {
          if (res.data.reason === 'not found') {
            this.er.push(3);
          }
          if (res.data.reason === 'insufficient founds') {
            this.er.push(4);
          }
          if (res.data.reason === 'identical') {
            this.er.push(5);
          }
        }
        if (res.ok) {
          this.fetchGetProfile();
          this.$emit('sendSuccess');
          this.$emit('refrashTransactions');
        }
      }
    },
    closeSendBalance() {
      this.$bvModal.hide('modal-send-balance');
    },
  },
};
</script>
