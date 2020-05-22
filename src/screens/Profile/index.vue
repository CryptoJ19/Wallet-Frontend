<template>
  <div class="pro content__item">
    <ModalChangePass @changePassSuccess="changePassSuccess" />
    <ModalEnableGA @GASubmiteSuccess="GASubmiteSuccess" />
    <ModalDisableGA @GADisableSuccess="GADisableSuccess" />
    <ModalSuccessEnableGA />
    <ModalSuccessDisableGA />
    <ModalSuccessChangePass />
    <div
      class="pro__item user"
      :class="userBoxClass"
    >
      <div class="header">
        <div class="header__shape" />
        <div class="header__body">
          <div class="header__ava">
            <div
              class="ava"
              :style="`background-image: url(${imagePath()})`"
            />
          </div>
          <div class="header__name">
            <div class="header__main">
              {{ getProfile.firstName }} {{ getProfile.lastName }}
            </div>
            <div class="header__sub">
              {{ getProfile.email }}
            </div>
          </div>
        </div>
      </div>
      <!--      <div>-->
      <!--        {{ getProfile }}-->
      <!--      </div>-->
      <!--      <div>-->
      <!--        {{ localProfile }}-->
      <!--      </div>-->
      <div class="user__items">
        <div class="user__item">
          <div class="user__title">
            {{ $t('auth.firstName') }}
          </div>
          <input
            v-model.trim="localProfile.firstName"
            :disabled="userEditMode === 0"
            type="text"
          >
          <div class="form__er">
            <div v-if="getUserEr(0)">
              {{ $t('auth.er.enterFirstName') }}
            </div>
          </div>
        </div>
        <div class="user__item">
          <div class="user__title">
            {{ $t('auth.lastName') }}
          </div>
          <input
            v-model.trim="localProfile.lastName"
            :disabled="userEditMode === 0"
            type="text"
          >
          <div class="form__er">
            <div v-if="getUserEr(1)">
              {{ $t('auth.er.enterSecondName') }}
            </div>
          </div>
        </div>
        <div class="user__item">
          <div class="user__title">
            {{ $t('auth.nickname') }}
          </div>
          <input
            v-model="localProfile.nickname"
            class="vinput__disable"
            :disabled="true"
            type="text"
          >
          <div class="form__er" />
        </div>
        <div class="user__item">
          <div class="user__title">
            {{ $t('auth.email') }}
          </div>
          <input
            v-model="localProfile.email"
            class="vinput__disable"
            :disabled="true"
            type="text"
          >
          <div class="form__er" />
        </div>
      </div>
      <div
        v-if="userEditMode === 0"
        class="btns"
      >
        <div />
        <div
          class="btn"
          @click="editUser()"
        >
          {{ $t('profile.edit') }}
        </div>
      </div>
      <div
        v-if="userEditMode === 1"
        class="btns"
      >
        <div
          class="btn"
          @click="cancelEditUser()"
        >
          {{ $t('profile.cancel') }}
        </div>
        <div
          class="btn"
          @click="saveUser()"
        >
          {{ $t('profile.save') }}
        </div>
      </div>
      <div
        class="user__loader"
        :class="{'user__loader_show': userLoader}"
      >
        <Loader />
      </div>
    </div>
    <div class="pro__items">
      <div class="pro__item tfa">
        <div class="tfa__title">
          {{ $t('profile.2fa') }}
        </div>
        <div class="tfa__body">
          <div class="tfa__left tfa__items">
            <div class="tfa__item">
              <div class="tfa__icon">
                <img
                  src="~assets/imgs/icons/ga.svg"
                  alt="ga"
                >
              </div>
              <div class="tfa__text">
                <div class="tfa__main">
                  {{ $t('profile.ga') }}
                </div>
                <div class="tfa__sub">
                  {{ $t('profile.gaSub') }}
                </div>
              </div>
            </div>
            <div class="tfa__item">
              <div class="tfa__text">
                <div class="tfa__main">
                  {{ $t('wallet.status') }}
                </div>
                <div
                  v-if="getGAEnabled"
                  class="tfa__sub tfa__sub_green"
                >
                  {{ $t('profile.enable') }}
                </div>
                <div
                  v-if="!getGAEnabled"
                  class="tfa__sub"
                >
                  {{ $t('profile.disable') }}
                </div>
              </div>
            </div>
          </div>
          <button
            v-if="getGAEnabled"
            class="btn-out"
            @click="showDisableGA()"
          >
            {{ $t('profile.disable') }}
          </button>
          <button
            v-if="!getGAEnabled"
            class="btn"
            @click="showEnableGA()"
          >
            {{ $t('profile.enable') }}
          </button>
        </div>
      </div>
      <div class="pro__item change-pass">
        <div class="change-pass__title">
          {{ $t('profile.changePass') }}
        </div>
        <button
          class="btn"
          @click="showChangePass()"
        >
          {{ $t('profile.changePassBtn') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
