<template>
  <b-modal
    id="modal-recieve"
    centered
    hide-header
    hide-footer
    @shown="shownModal()"
    @hide="hideModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('wallet.modalRecieve.title') }}
        </div>
        <button class="mod__closs" @click="closeRecieve()">
          <img src="~assets/imgs/icons/cross.svg" alt="close" />
        </button>
      </div>
      <div class="recieve">
        <div class="recieve__qr">
          <div class="qr__item">
            <div class="qr__title">
              {{ $t('wallet.modalRecieve.cashFlash') }}
            </div>
            <div class="qr__address">
              <div class="address__value">
                {{ addressCF }}
              </div>
              <button class="address__btn" @click="copy(addressCF)">
                <img src="~assets/imgs/icons/copy.svg" alt="close" />
              </button>
            </div>
            <div class="qr__code">
              <qrcode
                v-if="showQrOne && addressCF !== ''"
                :value="addressCF"
                :options="{ width: 230 }"
              />
              <div v-else-if="addressCF === ''" />
              <div v-else class="qr__hide-text">QR code hiden</div>
              <button class="qr__eye" :class="{ qr__eye_show: showQrOne }" @click="toggleShowQrOne">
                <img v-if="showQrOne" src="~assets/imgs/icons/eye_b__open.svg" alt="eye" />
                <img v-else src="~assets/imgs/icons/eye_b__close.svg" alt="eye" />
              </button>
            </div>
          </div>
          <div class="qr__item">
            <div class="qr__title">
              {{ $t('wallet.eos') }}
            </div>
            <div class="qr__address">
              <div class="address__value">
                {{ addressEOS }}
              </div>
              <button class="address__btn" @click="copy(addressEOS)">
                <img src="~assets/imgs/icons/copy.svg" alt="close" />
              </button>
            </div>
            <div class="qr__code">
              <qrcode
                v-if="showQrTwo && addressEOS !== ''"
                :value="addressEOS"
                :options="{ width: 230 }"
              />
              <div v-else-if="addressEOS === ''" />
              <div v-else class="qr__hide-text">QR code hiden</div>
              <button class="qr__eye" :class="{ qr__eye_show: showQrTwo }" @click="toggleShowQrTwo">
                <img v-if="showQrTwo" src="~assets/imgs/icons/eye_b__open.svg" alt="eye" />
                <img v-else src="~assets/imgs/icons/eye_b__close.svg" alt="eye" />
              </button>
            </div>
          </div>
        </div>
        <div class="recieve__epitaph">
          {{ $t('wallet.modalRecieve.subtext') }}
        </div>
      </div>
      <div class="mod__btns">
        <button class="mod__btn" @click="closeRecieve()">
          {{ $t('wallet.modalRecieve.close') }}
        </button>
      </div>
    </div>
    <div class="loader__body" :class="{ loader__body_show: loading }">
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { mapActions } from 'vuex';
import Loader from '../../../ui/Loader';

export default {
  components: {
    qrcode: VueQrcode,
    Loader,
  },
  data: () => ({
    loading: true,
    addressCF: '',
    addressEOS: '',
    showQrOne: false,
    showQrTwo: false,
  }),
  methods: {
    ...mapActions(['fetchGetDeposit']),
    toggleShowQrOne() {
      this.showQrOne = !this.showQrOne;
    },
    toggleShowQrTwo() {
      this.showQrTwo = !this.showQrTwo;
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
    closeRecieve() {
      this.$bvModal.hide('modal-recieve');
    },
    hideModal() {
      setTimeout(() => {
        this.resetModal();
      }, 200);
    },
    shownModal() {
      this.getDeposit();
    },
    resetModal() {
      this.loading = true;
      this.addressCF = '';
      this.addressEOS = '';
    },
    async getDeposit() {
      const resEOS = this.fetchGetDeposit('EOS');
      const resCF = this.fetchGetDeposit('CFT');

      const promiseAll = await Promise.all([resEOS, resCF]);
      this.loading = false;

      console.log(promiseAll);

      this.addressEOS = promiseAll[0].result.address;
      this.addressCF = promiseAll[1].result.memo;
    },
  },
};
</script>
