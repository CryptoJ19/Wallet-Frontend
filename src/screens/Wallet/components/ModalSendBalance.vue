<template>
  <b-modal
    id="modal-send-balance"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
    @shown="shownModal()"
    @hide="hideModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          Send
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
          {{ balance }}
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
                Max
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(0)">
                Введите сумму
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
                Введите адрес получателя
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
            <div class="form__er">
              <div v-if="getEr(2)">
                Введите мемо
              </div>
            </div>
          </div>
          <div
            v-if="mode === 1"
            class="mod__item mod__input"
          >
            <div class="vinput__title">
              Fee
            </div>
            <div class="vinput__fake">
              0.3
            </div>
            <div class="form__er" />
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
    currency: String,
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
    ]),
    balance: ({ currency, getWallets }) => {
      if (currency === 'EOS') {
        return ((getWallets[0] && getWallets[0].balance) || 0);
      }
      if (currency === 'TNT') {
        return ((getWallets[1] && getWallets[1].balance) || 0);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions([
      'fetchGetWithdraw',
      'fetchSendWithdraw',
      'fetchGetProfile',
    ]),
    setMaxAmount() {
      this.amount = this.balance;
    },
    setMode(value) {
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
      this.getWithdrawData();
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
        memo,
        recipient,
      } = this;

      if (amount === '') {
        this.er.push(0);
      }
      if (recipient === '') {
        this.er.push(1);
      }
      if (memo === '') {
        this.er.push(2);
      }
      return this.er.length === 0;
    },
    async preludeSend() {
      if (this.check()) {
        // const currency = 'EOS';
        // const res = await this.fetchGetWithdraw(currency);
        const {
          amount,
          recipient,
          memo,
        } = this;
        const data = {
          amount,
          address: recipient,
          memo,
          currency: 'EOS',
          internal: (this.mode === 0),
        };
        this.loading = true;
        const res = await this.fetchSendWithdraw(data);
        this.loading = false;
        console.log(res);
        this.fetchGetProfile();
        this.$emit('sendSuccess');
      }
    },
    closeSendBalance() {
      this.$bvModal.hide('modal-send-balance');
    },
  },
};
</script>
