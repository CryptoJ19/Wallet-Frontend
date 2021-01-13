<template>
  <b-modal :id="id" centered hide-header hide-footer>
    <div class="mod mod_response">
      <div class="mod__head">
        <div class="mod__title">
          {{ title }}
        </div>
        <div v-if="!noIcon" class="mod__closs">
          <img v-if="success" src="~assets/imgs/icons/v_green.svg" alt="icon" />
          <img
            v-else
            src="~assets/imgs/icons/cross-red.svg"
            alt="icon"
            @click="close()"
            class="mod__closs__cross-image"
          />
        </div>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          <span>{{ text }}</span>
        </div>
      </div>
      <div class="mod__btns">
        <button class="mod__btn" @click="close()">
          {{ $t('profile.modalChangePass.closeSuccess') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    noIcon: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$bvModal.hide(this.id);
    },
  },
};
</script>

<style lang="scss">
.mod_response .mod {
  &__text {
    margin: 0 0 20px;
    white-space: pre-line;
  }
  &__closs {
    &__cross-image {
      cursor: pointer;
    }
  }
}
</style>
