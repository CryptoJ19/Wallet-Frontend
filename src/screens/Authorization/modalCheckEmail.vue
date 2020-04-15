<template>
  <b-modal
    id="check-email"
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
<style lang="scss" scoped>

  .modal-dialog {
    max-width: 430px;
  }

  .mod {
    &__head {
      margin: 0 0 40px;
    }
    &__input {
      margin: 0 0 12px;
    }
    &__text {
      font-size: 16px;
      opacity: 0.5;
      color: #000000;
      margin: 0 0 30px;
    }
  }

</style>
