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
        <button
          class="mod__closs"
          @click="closeRecieve()"
        >
          <img
            src="~assets/imgs/icons/cross.svg"
            alt="close"
          >
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
              <button class="address__btn">
                <img
                  src="~assets/imgs/icons/copy.svg"
                  alt="close"
                >
              </button>
            </div>
            <div class="qr__code">
              <qrcode
                v-if="addressCF !== ''"
                :value="addressCF"
                :options="{ width: 230 }"
              />
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
              <button class="address__btn">
                <img
                  src="~assets/imgs/icons/copy.svg"
                  alt="close"
                >
              </button>
            </div>
            <div class="qr__code">
              <qrcode
                v-if="addressEOS !== ''"
                :value="addressEOS"
                :options="{ width: 230 }"
              />
            </div>
          </div>
        </div>
        <div class="recieve__epitaph">
          {{ $t('wallet.modalRecieve.subtext') }}
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="closeRecieve()"
        >
          {{ $t('wallet.modalRecieve.close') }}
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
  }),
  methods: {
    ...mapActions([
      'fetchGetDeposit',
    ]),

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
      const resCF = this.fetchGetDeposit('TNT');

      const promiseAll = await Promise.all([resEOS, resCF]);
      this.loading = false;

      console.log(promiseAll);

      this.addressEOS = promiseAll[0].result.address;
      this.addressCF = promiseAll[1].result.address;
    },
  },
};
</script>
