<template>
  <div class="auth">
    <ModalCheckEmail
      :er-check-email="erCheckEmail"
      :loader-modal="loaderModal"
      @preludeValidateEmail="preludeValidateEmail"
    />
    <div class="auth__main container">
      <div class="auth__box">
        <div class="auth__title" v-html="$t('auth.welcome')" />
        <div class="menu">
          <div class="menu__items">
            <button :class="authBtnClass[0]" class="menu__item" @click="setMode(0)">
              {{ $t('auth.signin') }}
            </button>
            <button :class="authBtnClass[1]" class="menu__item" @click="setMode(1)">
              {{ $t('auth.signup') }}
            </button>
          </div>
          <button :class="authBtnClass[2]" class="menu__forgot" @click="setMode(2)">
            {{ $t('auth.forgotPassword') }}
          </button>
        </div>
        <div class="form" :class="authFormClass[0]">
          <div class="form__item">
            <input
              v-model="signin.email"
              maxlength="40"
              :placeholder="$t('auth.email')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(0)">
                {{ $t('auth.er.enterEmail') }}
              </div>
              <div v-if="getEr(1)">
                {{ $t('auth.er.enterValidEmail') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signin.password"
                maxlength="40"
                :placeholder="$t('auth.password')"
                :type="signin.passwordType"
              />
              <button class="password-hide" @click="togglePasswordType()">
                <img
                  v-if="signin.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                />
                <img v-else src="~assets/imgs/icons/eye__close.svg" alt="eye" />
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(2)">
                {{ $t('auth.er.enterPass') }}
              </div>
              <div v-if="signin.GAEnabled === false">
                {{ erMes }}
              </div>
            </div>
          </div>
          <div class="check">
            <label class="check__label" for="form-auth">
              <input id="form-auth" v-model="signin.remember" type="checkbox" />
              <span class="check__box">
                <img class="check__icon" src="~assets/imgs/icons/check.svg" alt="v" />
              </span>
              <span class="check__title">
                {{ $t('auth.rememberMe') }}
              </span>
            </label>
          </div>
          <div v-if="signin.GAEnabled" class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signin.GACode"
                maxlength="40"
                :placeholder="$t('auth.codeAuth')"
                :type="signin.GACodeType"
              />
              <button class="password-hide" @click="toggleGACodeType()">
                <img
                  v-if="signin.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                />
                <img v-else src="~assets/imgs/icons/eye__close.svg" alt="eye" />
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(3)">
                {{ $t('auth.er.enterTotp') }}
              </div>
              {{ erMes }}
            </div>
          </div>
          <div class="auth__btns">
            <button class="auth__btn" @click="preludeSignin()">
              {{ $t('auth.signin_btn') }}
            </button>
          </div>
        </div>
        <div class="form" :class="authFormClass[1]">
          <div class="form__item">
            <input
              v-model="signup.firstName"
              maxlength="40"
              :placeholder="$t('auth.firstName')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(0)">
                {{ $t('auth.er.enterFirstName') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <input
              v-model="signup.lastName"
              maxlength="40"
              :placeholder="$t('auth.lastName')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(1)">
                {{ $t('auth.er.enterSecondName') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <Dropdown label="Country" :items="getCountriesRegSort" passedKeyField="short" passedValueField="full" :setValue="selectCountry" />
            <div class="form__er">
              <div v-if="getEr(13)">
                {{ $t('auth.er.enterCountry') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <input
              v-model="signup.memo"
              maxlength="12"
              :placeholder="$t('auth.nickname')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(9)">
                {{ $t('auth.er.enterNickname') }}
              </div>
              <div v-if="getEr(10)">
                {{ $t('auth.er.enterValidNickname') }}
              </div>
              <div v-if="getEr(12)">
                {{ $t('auth.er.nicknameExists') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <input
              v-model="signup.email"
              maxlength="40"
              :placeholder="$t('auth.email')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(2)">
                {{ $t('auth.er.enterEmail') }}
              </div>
              <div v-if="getEr(4)">
                {{ $t('auth.er.enterValidEmail') }}
              </div>
              <div v-if="getEr(11)">
                {{ $t('auth.er.emailExists') }}
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="password-hide__p ui-input__body">
              <input
                v-model="signup.password"
                maxlength="40"
                :placeholder="$t('auth.password')"
                :type="signup.passwordType"
              />
              <button class="password-hide" @click="togglePasswordType()">
                <img
                  v-if="signup.passwordType === 'password'"
                  src="~assets/imgs/icons/eye__open.svg"
                  alt="eye"
                />
                <img v-else src="~assets/imgs/icons/eye__close.svg" alt="eye" />
              </button>
            </div>
            <div class="form__er">
              <div v-if="getEr(3)">
                {{ $t('auth.er.enterPass') }}
              </div>
              <div v-if="getEr(5)">
                {{ $t('auth.er.enterPassSpecial') }}
              </div>
              <div v-if="getEr(6)">
                {{ $t('auth.er.enterPassUp') }}
              </div>
              <div v-if="getEr(7)">
                {{ $t('auth.er.enterPassDown') }}
              </div>
              <div v-if="getEr(8)">
                {{ $t('auth.er.enterPassSpace') }}
              </div>
            </div>
            <div class="auth__kyc">
              {{ $t('auth.kyc') }}
            </div>
          </div>

          <div class="auth__btns">
            <button class="auth__btn" @click="preludeSignup()">
              {{ $t('auth.signup_btn') }}
            </button>
          </div>
        </div>
        <div class="form" :class="authFormClass[2]">
          <div class="form__item">
            <input
              v-model="forgot.email"
              maxlength="40"
              :placeholder="$t('auth.email')"
              type="text"
            />
            <div class="form__er">
              <div v-if="getEr(0)">
                {{ $t('auth.er.enterEmail') }}
              </div>
              {{ erMes }}
            </div>
          </div>
          <div class="auth__btns">
            <button class="auth__btn" @click="preludeForgotSend()">
              {{ $t('auth.forgotPassword__send') }}
            </button>
          </div>
        </div>
        <div class="form" :class="authFormClass[3]">
          <div class="form__text">
            {{ $t('auth.checkEmailToRestorePass') }}
          </div>
        </div>
      </div>
      <div class="auth__loader" :class="{ auth__loader_show: loader }">
        <Loader />
      </div>
    </div>
    <div class="auth__bg">
      <img src="~assets/imgs/auth-coin.svg" alt="background" />
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
