<template>
  <b-modal
    id="modal-success-ga"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          Check your email
        </div>
        <button
          class="mod__closs"
          @click="close()"
        >
          <img
            src="~assets/imgs/icons/cross.svg"
            alt="close"
          >
        </button>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          Google Authenticator Successfully added.
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="close()"
        >
          Ok
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>

export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-success-ga');
    },
  },
};
</script>
<style lang="scss">
  #modal-success-ga {
    .modal-dialog {
      max-width: 376px;
    }
    .mod {
      &__text {
        margin: 0 0 40px;
      }
    }
  }
</style>
