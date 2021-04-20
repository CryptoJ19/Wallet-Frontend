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
          {{ $t('auth.modalCheckEmail.title') }}
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
          {{ $t('auth.modalCheckEmail.text') }}
        </div>
        <div class="mod__input">
          <input
            v-model="code"
            maxlength="40"
            type="text"
            :placeholder="$t('auth.modalCheckEmail.restoreCode')"
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
          {{ $t('auth.modalCheckEmail.signup_btn') }}
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
    erCheckEmail: {
      type: String,
      default: '',
    },
    loaderModal: {
      type: Boolean,
      default: false,
    },
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
<style lang="scss">
  #check-email {
    .modal-dialog {
      max-width: 430px;
    }
    .mod {
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
  }
</style>
