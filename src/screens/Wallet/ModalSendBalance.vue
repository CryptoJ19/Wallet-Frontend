<template>
  <b-modal
    id="modal-send-balance"
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
          @click="closeSendBalance()"
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
          <div class="mod__item mod__input">
            <input
              type="text"
              placeholder="Code"
            >
            <div class="form__er" />
          </div>
          <div class="mod__item">
            <div class="dd">
              <b-dropdown
                text="Token"
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
              <button class="btn-max">
                Max
              </button>
            </div>
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="">
              <input
                type="text"
                placeholder="Memo"
              >
            </div>
            <div class="form__er" />
          </div>
        </div>
      </div>
      <div class="mod__btns">
        <div class="mod__btn">
          Send
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  methods: {
    closeSendBalance() {
      this.$bvModal.hide('modal-send-balance');
    },
  },
};
</script>
