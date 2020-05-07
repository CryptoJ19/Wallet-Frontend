<template>
  <b-modal
    id="modal-change-pass"
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
        <div class="mod__items">
          <div class="mod__item mod__input">
            <input
              maxlength="40"
              type="text"
              placeholder="New password"
            >
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="">
              <input
                maxlength="40"
                type="text"
                placeholder="Confirm password"
              >
            </div>
            <div class="form__er" />
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
        >
          Sign Up
        </button>
      </div>
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loader}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import Loader from '../../../ui/Loader';

export default {
  components: {
    Loader,
  },
  props: {
    loader: Boolean,
  },
  data: () => ({
    // code: '',
  }),
  methods: {
    closeCheckEmail() {
      this.$bvModal.hide('modal-change-pass');
    },
  },
};
</script>
<style lang="scss" scoped>

  #modal-change-pass {

  }

</style>
