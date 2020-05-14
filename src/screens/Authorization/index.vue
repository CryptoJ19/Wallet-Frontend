<template>
  <div class="auth">
    <ModalCheckEmail
      :er-check-email="erCheckEmail"
      :loader-modal="loaderModal"
      @preludeValidateEmail="preludeValidateEmail"
    />
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
              Sign in
            </button>
            <button
              :class="authBtnClass[1]"
              class="menu__item"
              @click="setMode(1)"
            >
              Sign Up
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
              v-model="signin.email"
              maxlength="40"
              placeholder="Email"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(0)">
                Введите email
              </div>
              <div v-if="getEr(1)">
                Введите корректный email
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signin.password"
                maxlength="40"
                placeholder="Password"
                :type="signin.passwordType"
              >
              <button
                class="password-hide"
                @click="togglePasswordType()"
              >
                <img
                  v-if="signin.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                >
                <img
                  v-else
                  src="~assets/imgs/icons/eye__close.svg"
                  alt="eye"
                >
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(2)">
                Введите пароль
              </div>
              <div v-if="signin.GAEnabled === false">
                {{ erMes }}
              </div>
            </div>
          </div>
          <div class="check">
            <label
              class="check__label"
              for="form-auth"
            >
              <input
                id="form-auth"
                v-model="signin.remember"
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
          <div
            v-if="signin.GAEnabled"
            class="form__item"
          >
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signin.GACode"
                maxlength="40"
                placeholder="Код авторизации"
                :type="signin.GACodeType"
              >
              <button
                class="password-hide"
                @click="toggleGACodeType()"
              >
                <img
                  v-if="signin.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                >
                <img
                  v-else
                  src="~assets/imgs/icons/eye__close.svg"
                  alt="eye"
                >
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(3)">
                Введите GA код.
              </div>
              {{ erMes }}
            </div>
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="preludeSignin()"
            >
              Sign In
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="authFormClass[1]"
        >
          <div class="form__item">
            <input
              v-model="signup.firstName"
              maxlength="40"
              placeholder="First name"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(0)">
                Введите имя
              </div>
            </div>
          </div>
          <div class="form__item">
            <input
              v-model="signup.lastName"
              maxlength="40"
              placeholder="Last name"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(1)">
                Введите фамилию
              </div>
            </div>
          </div>
          <div class="form__item">
            <input
              v-model="signup.email"
              maxlength="40"
              placeholder="Email"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(2)">
                Введите email
              </div>
              <div v-if="getEr(4)">
                Введите корректный email
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signup.password"
                maxlength="40"
                placeholder="Password"
                :type="signup.passwordType"
              >
              <button
                class="password-hide"
                @click="togglePasswordType()"
              >
                <img
                  v-if="signup.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                >
                <img
                  v-else
                  src="~assets/imgs/icons/eye__close.svg"
                  alt="eye"
                >
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(3)">
                Введите пароль
              </div>
              <div v-if="getEr(5)">
                Пароль должен содержать спец символ
              </div>
              <div v-if="getEr(6)">
                Пароль должен содержать заглавную букву
              </div>
              <div v-if="getEr(7)">
                Пароль должен содержать строчную букву
              </div>
              <div v-if="getEr(8)">
                Пароль не должен содержать пробелы
              </div>
              {{ erMes }}
            </div>
          </div>

          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="preludeSignup()"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="authFormClass[2]"
        >
          <div class="form__item">
            <input
              v-model="forgot.email"
              maxlength="40"
              placeholder="Email"
              type="text"
            >
            <div class="form__er">
              <div v-if="getEr(0)">
                Введите email
              </div>
              {{ erMes }}
            </div>
          </div>
          <div class="auth__btns">
            <button
              class="auth__btn"
              @click="preludeForgotSend()"
            >
              Send
            </button>
          </div>
        </div>
        <div
          class="form"
          :class="authFormClass[3]"
        >
          <div class="form__text">
            На ваш email отправлено письмо для восстановления пароля.
          </div>
        </div>
        <div>
          <!--          <nuxt-link to="/wallet">-->
          <!--            w-->
          <!--          </nuxt-link>-->
          <!--          <div>-->
          <!--            {{ accessToken }}-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            {{ refreshToken }}-->
          <!--          </div>-->
        </div>
      </div>
      <div
        class="auth__loader"
        :class="{'auth__loader_show': loader}"
      >
        <Loader />
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
