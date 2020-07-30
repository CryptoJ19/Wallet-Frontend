<template>
  <b-modal
    :id="id"
    centered
    hide-header
    hide-footer
  >
    <div class="mod mod_response">
      <div class="mod__head">
        <div class="mod__title">
          {{ title }}
        </div>
        <div class="mod__closs">
          <img
            v-if="success"
            src="~assets/imgs/icons/v_green.svg"
            alt="icon"
          >
          <img
            v-else
            src="~assets/imgs/icons/cross-red.svg"
            alt="icon"
          >
        </div>
      </div>
      <div class="mod__body">
        <div class="mod__text">
          <span>{{ text }}</span>
        </div>
      </div>
      <div class="mod__btns">
        <button
          class="mod__btn"
          @click="close()"
        >
          {{ $t('profile.modalChangePass.closeSuccess') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>
<script>

export default {
  props: {
    id: String,
    title: String,
    text: String,
    success: Boolean,
  },
  methods: {
    close() {
      this.$bvModal.hide(this.id);
    },
  },
};
</script>

<style lang="scss">
  .mod_response {
    .mod__text {
      margin: 0 0 20px;
      white-space: pre-line;
    }
  }
</style>
