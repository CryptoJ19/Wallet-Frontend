<template>
  <b-modal
    id="check-email"
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
            v-model="code"
            type="text"
            placeholder="Code"
          >
          <div class="form__er">
            {{ erCheckEmail }}
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="preludeValidateEmail()"
        >
          Sign Up
        </button>
      </div>
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loaderModal}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import Loader from '../../ui/Loader';

export default {
  components: {
    Loader,
  },
  props: {
    erCheckEmail: String,
    loaderModal: Boolean,
  },
  data: () => ({
    code: '',
  }),
  methods: {
    closeCheckEmail() {
      this.$bvModal.hide('check-email');
    },
    preludeValidateEmail() {
      this.$emit('preludeValidateEmail', this.code);
    },
  },
};
</script>
<style lang="scss" scoped>

  .modal-dialog {
    max-width: 430px;
  }

  .loader__body {
    border-radius: 13px;
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
