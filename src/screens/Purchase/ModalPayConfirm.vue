<template>
  <b-modal
    id="modal-pay-confirm"
    centered
    hide-header
    hide-footer
    :no-close-on-backdrop="loading"
    @show="refrashrModal"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('purchase.check.title') }}
        </div>
      </div>
      <div class="pay">
        <div class="pay__subtitle">
          {{ $t('purchase.check.total') }}
        </div>
        <div class="pay__sum">{{ Math.ceil(amountCFT * 10000) / 10000 }} CFT</div>
        <div class="pay__items">
          <div class="pay__item">
            <div class="pay__text">EOS amount</div>
            <div class="pay__value">{{ Math.ceil(amountEOS * 10000) / 10000 }} EOS</div>
          </div>
          <div class="pay__item">
            <div class="pay__text">Euro amount</div>
            <div class="pay__value">
              {{ Math.ceil(totalSum * 100) / 100 }} {{ $t('purchase.cur') }}
            </div>
          </div>
          <!--          <div class="pay__item">-->
          <!--            <div class="pay__text">-->
          <!--              My Cash Flash account name-->
          <!--            </div>-->
          <!--            <div class="pay__value">-->
          <!--              MyNickname-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="war">
          <div class="war__icon">
            <img src="~assets/imgs/icons/warning.svg" alt="icon" />
          </div>
          <div class="war__text" v-html="$t('purchase.check.warText')" />
        </div>
        <!--        <button-->
        <!--          class="switch"-->
        <!--          @click="toggleSwitch"-->
        <!--        >-->
        <!--          <div-->
        <!--            class="Switch"-->
        <!--            :class="{'Switch_toggled': this.switch}"-->
        <!--          >-->
        <!--            <div class="Switch__circle" />-->
        <!--          </div>-->
        <!--          <div class="switch__label">-->
        <!--            Ok, i got it and agree-->
        <!--          </div>-->
        <!--        </button>-->
        <!--        <div-->
        <!--          v-if="this.switch"-->
        <!--          class="address"-->
        <!--        >-->
        <!--          <div class="address__value">-->
        <!--            {{ CFAddress }}-->
        <!--          </div>-->
        <!--          <button-->
        <!--            class="address__copy"-->
        <!--            @click="copy(CFAddress)"-->
        <!--          >-->
        <!--            <img-->
        <!--              src="~assets/imgs/icons/copy.svg"-->
        <!--              alt="close"-->
        <!--            >-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
      <div class="mod__btns">
        <button class="mod__btn pay__btn" @click="preludeSendPay()">
          {{ $t('purchase.iPaid') }}
        </button>
      </div>
      <div class="loader__body" :class="{ loader__body_show: loading }">
        <Loader />
      </div>
    </div>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex';
import Loader from '../../ui/Loader';

const CFAddress = process.env.EOS_ACCOUNT;

export default {
  components: {
    Loader,
  },
  props: {
    mode: {
      type: Number,
      default: 0,
    },
    totalSum: {
      type: Number,
      default: 0,
    },
    amountCFT: {
      type: Number,
      default: 0,
    },
    amountEOS: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    CFAddress,
    switch: false,
    loading: false,
  }),
  methods: {
    ...mapActions(['fetchPostPurchaseBuycft', 'fetchGetProfile']),
    refrashrModal() {
      this.loading = false;
    },
    toggleSwitch() {
      this.switch = !this.switch;
    },
    async preludeSendPay() {
      // const data = {
      //   amount: this.amountCFT,
      // };
      const formData = new FormData();
      formData.append('amount', this.amountCFT);
      this.loading = true;
      const res = await this.fetchPostPurchaseBuycft(formData);
      console.log(res);
      if (res.ok) {
        await this.fetchGetProfile();
        this.close();
        this.showPaySuccessModal();
      }
      this.loading = false;
    },
    showPaySuccessModal() {
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
    /*font-family: Roboto;*/
    /*&__filds {*/
    /*  d*/
    /*}*/
    &__btn {
      &_dis {
        @include btn__dis;
      }
    }
    &__subtitle {
      font-size: 16px;
      line-height: 143.4%;
      color: rgba(#54595f, 0.4);
      margin: 0 0 11px;
      font-family: Roboto;
    }
    &__sum {
      font-style: normal;
      font-weight: bold;
      font-size: 50px;
      line-height: 143.4%;
      color: #2f80ed;
      padding: 0 0 15px;
      margin: 0 0 20px;
      border-bottom: 1px solid rgba(#54595f, 0.05);
    }
    &__text {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: rgba(#54595f, 0.4);
    }
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:last-child) {
        margin: 0 0 15px;
      }
    }
    &__value {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #000000;
    }
    &__items {
      margin: 0 0 20px;
    }
  }
  .war {
    display: flex;
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid $stroke;
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
      color: $red;
    }
  }
  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
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
      transition: 0.5s;
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
  .switch {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    &__label {
      font-weight: 600;
      font-size: 14px;
      color: #000000;
      margin-left: 8px;
      font-family: Raleway;
    }
  }
}
</style>
