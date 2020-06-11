<template>
  <b-modal
    id="modal-success-enable-ga"
    centered
    hide-header
    hide-footer
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('profile.modalEnableGA.titleSuccess') }}
        </div>
        <div class="mod__closs">
          <img
            src="~assets/imgs/icons/v_green.svg"
            alt="close"
          >
        </div>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          {{ $t('profile.modalEnableGA.textSuccess') }}
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="close()"
        >
          {{ $t('profile.modalEnableGA.closeSuccess') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>

export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-success-enable-ga');
    },
  },
};
</script>
