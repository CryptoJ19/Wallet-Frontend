<template>
  <b-modal
    id="modal-recieve"
    centered
    hide-header
    hide-footer
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
                wdqw2q1212d3dq23d1
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
                :value="123123"
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
                234532
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
                :value="124"
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
  </b-modal>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    qrcode: VueQrcode,
  },
  methods: {
    closeRecieve() {
      this.$bvModal.hide('modal-recieve');
    },
  },
};
</script>
