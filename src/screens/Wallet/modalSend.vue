<template>
  <b-modal
    id="modal-wallet-send"
    centered
    hide-header
    hide-footer
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          Check your email
        </div>
        <button
          class="mod__closs"
          @click="closeCheckEmail()"
        >
          <img
            src="~assets/imgs/icons/cross.svg"
            alt="close"
          >
        </button>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet
        </div>
        <div class="mod__input">
          <input
            type="text"
            placeholder="Code"
          >
          <div class="form__er" />
        </div>
      </div>
      <div class="mod__btns">
        <div class="mod__btn">
          Sign Un
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  methods: {
    closeCheckEmail() {
      this.$bvModal.hide('check-email');
    },
  },
};
</script>
<style lang="scss">

  .modal-dialog {
    max-width: 430px;
  }

</style>
