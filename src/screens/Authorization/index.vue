<template>
  <div class="auth">
    <div class="auth__main">
      <div class="auth__form">
        <div class="auth__title">
          Welcome to
          <br>
          CashFlash
        </div>
        <div class="menu">
          <div class="menu__items">
            <button
              :class="{'menu__item_active': (mode === 0)}"
              class="menu__item menu__item_active"
              @click="setMode(0)"
            >
              Sing in
            </button>
            <button
              class="menu__item"
              @click="setMode(1)"
            >
              Sing Up123123
            </button>
          </div>
          <div class="menu__forgot">
            for {{ mode }}
          </div>
        </div>
      </div>
    </div>
    <div class="auth__bg">
      <img
        src="~assets/imgs/auth-coin.svg"
        alt="background"
      >
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    mode: 0,
  }),
  computed: {
    authBtnClass: ({ mode }) => ({ menu__item_active: (mode === 0) }),
  },
  methods: {
    setMode(i) {
      this.mode = i
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss">
