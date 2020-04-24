<template>
  <b-modal
    id="modal-add-user"
    centered
    hide-header
    hide-footer
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          Добавить пользователя
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
        <div class="mod__items">
          <div class="mod__item mod__input">
            <div class="">
              <input
                type="text"
                placeholder="email"
              >
            </div>
            <div class="form__er" />
          </div>
          <div class="mod__item mod__input">
            <div class="">
              <input
                type="text"
                placeholder="password"
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
import { mapActions } from 'vuex';


export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions([
      'fetchSignin',
    ]),
    async preludeAddUser() {
      const {
        email,
        password,
      } = this;
      const res = await this.fetchSignin({
        data: {
          email,
          password,
        },
        remember: true,
      });
      console.log(res);
    },
    closeSendBalance() {
      this.$bvModal.hide('modal-add-user');
    },
  },
};
</script>
