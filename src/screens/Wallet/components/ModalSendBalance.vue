<template>
  <b-modal
    id="modal-send-balance"
    centered
    hide-header
    hide-footer
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
        <div class="mod__balance">
          {{ $t('wallet.eos') }}
          3.44
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
                maxlength="40"
                type="text"
                :placeholder="$t('wallet.modalSend.code')"
              >
              <button class="btn-max">
                Max
              </button>
            </div>
            <div class="form__er" />
          </div>
          <div
            v-if="mode === 1"
            class="mod__item mod__input"
          >
            <input
              maxlength="40"
              type="text"
              :placeholder="$t('wallet.modalSend.fee')"
            >
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="">
              <input
                maxlength="40"
                type="text"
                :placeholder="$t('wallet.modalSend.recipient')"
              >
            </div>
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <input
              maxlength="40"
              type="text"
              placeholder="Memo"
            >
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
  </b-modal>
</template>
<script>
export default {
  data: () => ({
    mode: 0,
  }),
  methods: {
    setMode(value) {
      this.mode = value;
    },
    preludeSend() {
      this.$emit('sendSuccess');
    },
    closeSendBalance() {
      this.$bvModal.hide('modal-send-balance');
    },
  },
};
</script>
