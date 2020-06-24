<template>
  <b-modal
    id="modal-pay-confirm"
    centered
    hide-header
    hide-footer
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          Check and confirm
        </div>
      </div>
      <div class="pay">
        <div class="pay__subtitle">
          Total amount
        </div>
        <div class="pay__sum">
          1.000 €
        </div>
        <div class="pay__items">
          <div class="pay__item">
            <div class="pay__text">
              Some data
            </div>
            <div class="pay__value">
              1.000 €
            </div>
          </div>
          <div class="pay__item">
            <div class="pay__text">
              Some data
            </div>
            <div class="pay__value">
              1.000 €
            </div>
          </div>
          <div class="pay__item">
            <div class="pay__text">
              Some data
            </div>
            <div class="pay__value">
              1.000 €
            </div>
          </div>
        </div>
        <div class="war">
          <div class="war__icon">
            <img
              src="~assets/imgs/icons/warning.svg"
              alt="icon"
            >
          </div>
          <div
            class="war__text"
            v-html="'Send your EOS coins to the CashFlash EOS account name below.\nCaution! ' +
              'Type your personal CashFlash account name into' +
              ' the Memo field when sending EOS coins in order to allow us to track your payment.'"
          />
        </div>
        <div class="address">
          <div class="address__value">
            cashflasheos
          </div>
          <button
            class="address__copy"
            @click="copy('cashflasheos')"
          >
            <img
              src="~assets/imgs/icons/copy.svg"
              alt="close"
            >
          </button>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="showPaySuccessModal()"
        >
          {{ $t('profile.modalChangePass.closeSuccess') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>

export default {
  methods: {
    showPaySuccessModal() {
      this.close();
      this.$emit('showPaySuccessModal');
    },
    close() {
      this.$bvModal.hide('modal-pay-confirm');
    },
    copy(str) {
      const contentBody = document.querySelector('.modal .modal-body');
      const el = document.createElement('textarea');
      el.value = str;
      contentBody.appendChild(el);
      el.select();
      document.execCommand('copy');
      contentBody.removeChild(el);
    },
  },
};
</script>

<style lang="scss">
  #modal-pay-confirm {
    .pay {
      font-family: Roboto;
      &__subtitle {
        font-size: 16px;
        line-height: 143.4%;
        color: rgba(#54595F, 0.4);
        margin: 0 0 11px;
      }
      &__sum {
        font-style: normal;
        font-weight: 500;
        font-size: 50px;
        line-height: 143.4%;
        color: #2F80ED;
        padding: 0 0 15px;
        margin: 0 0 20px;
        border-bottom: 1px solid rgba(#54595F, 0.05);
      }
      &__text {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(#54595F, 0.4);
      }
      &__item {
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {
          margin: 0 0 15px;
        }
      }
      &__value {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: #000000;
      }
      &__items {
        margin: 0 0 35px;
      }
    }
    .war {
      display: flex;
      margin: 0 0 20px;
      &__icon {
        min-width: 20px;
        margin: 5px 0 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }
      &__text {
        white-space: pre-line;
        margin: 0 0 0 15px;
        font-family: Raleway;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 143.4%;
        color: #EB5757;
      }
    }
    .address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F2F2F2;
      /*border: 1px solid #EBEBEB;*/
      border-radius: 15px;
      padding: 0 18px;
      margin: 0 0 37px;
      height: 102px;
      &__value {
        word-break: break-word;
        font-family: Raleway;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        letter-spacing: 0.22em;
        color: #000000;
        margin: 0 20px 0 0;
      }
      &__copy {
        @include btn;
        padding: 8px;
        border-radius: 8px;
        transition: .5s;
        min-width: 30px;
        &:active {
          transition: 0s;
          background: $yellow;
        }
      }
    }
    .mod__btn {
      width: 100%;
    }
  }
</style>
