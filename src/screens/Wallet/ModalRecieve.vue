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
          Send
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
      <div class="mod__body">
        <div class="mod__text">
          Balance
        </div>
        <div class="mod__balance">
          EOS 3.44
        </div>
        <div class="mod__items">
          <div class="mod__item">
            <div class="dd">
              <b-dropdown
                text="Send to EOS address"
                block
                variant="primary"
                class=""
                menu-class="w-100"
              >
                <b-dropdown-item-button>
                  Action
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  Another action
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  Something else here
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  Something else here
                </b-dropdown-item-button>
              </b-dropdown>
            </div>
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="btn-max__p ui-input__body">
              <input
                type="text"
                placeholder="Code"
              >
              <tippy
                animation="shift-toward"
                placement="bottom"
                theme="light"
                arrow
                class="info"
              >
                <template v-slot:trigger>
                  <img
                    src="~assets/imgs/icons/info-input.svg"
                    alt="info"
                  >
                </template>
                <div>
                  info
                </div>
              </tippy>
            </div>
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="btn-max__p ui-input__body">
              <input
                type="text"
                placeholder="Memo"
              >
              <div class="qr">
                <img
                  src="~assets/imgs/icons/qr-input.svg"
                  alt="info"
                >
              </div>
            </div>
            <div class="form__er" />
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <div class="mod__btn">
          Recieve
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  methods: {
    closeRecieve() {
      this.$bvModal.hide('modal-recieve');
    },
  },
};
</script>
