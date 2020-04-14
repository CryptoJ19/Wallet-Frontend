<template>
  <div class="auth">
    <modalCheckEmail />
    <div class="auth__main container">
      <div class="auth__box">
        <div class="auth__title">
          Welcome to
          <br>
          CashFlash
        </div>
        <div class="menu">
          <div class="menu__items">
            <button
              :class="authBtnClass[0]"
              class="menu__item"
              @click="setMode(0)"
            >
              Sing in
            </button>
            <button
              :class="authBtnClass[1]"
              class="menu__item"
              @click="setMode(1)"
            >
              Sing Up
            </button>
          </div>
          <button
            :class="authBtnClass[2]"
            class="menu__forgot"
            @click="setMode(2)"
          >
            Forgot Password
          </button>
        </div>
        <div
          class="form"
          :class="authFormClass[0]"
        >
          <div class="form__item">
            <input
              placeholder="Name"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="form__item">
            <input
              placeholder="Password"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="check">
            <label
              class="check__label"
              for="form-auth"
            >
              <input
                id="form-auth"
                v-model="test"
                type="checkbox"
              >
              <span class="check__box">
                <img
                  class="check__icon"
                  src="~assets/imgs/icons/check.svg"
                  alt="v"
                >
              </span>
              <span class="check__title">
                Remember me?
              </span>
            </label>
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="showCheckEmail()"
            >
              Log in
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="authFormClass[1]"
        >
          <div class="form__item">
            <input
              placeholder="First name"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="form__item">
            <input
              placeholder="Last name"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="form__item">
            <input
              placeholder="Email"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="form__item">
            <input
              placeholder="Password"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="showCheckEmail()"
            >
              Log Up
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="authFormClass[2]"
        >
          <div class="form__item">
            <input
              placeholder="Email"
              type="text"
            >
            <div class="form__er" />
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="showCheckEmail()"
            >
              Send
            </button>
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
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
