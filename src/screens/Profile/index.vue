<template>
  <div class="pro content__item">
    <ModalChangePass />
    <ModalEnableGA />
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
              Name Surnmae
            </div>
            <div class="header__sub">
              aiubadubsidub@gmail.com
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
            First name
          </div>
          <input
            v-model="localProfile.firstName"
            :disabled="userEditMode === 0"
            type="text"
          >
        </div>
        <div class="user__item">
          <div class="user__title">
            Second name
          </div>
          <input
            v-model="localProfile.lastName"
            :disabled="userEditMode === 0"
            type="text"
          >
        </div>
        <div class="user__item">
          <div class="user__title">
            Nickname
          </div>
          <input
            v-model="localProfile.nickname"
            :disabled="userEditMode === 0"
            type="text"
          >
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
          Edit
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
          Cancel
        </div>
        <div
          class="btn"
          @click="saveUser()"
        >
          Save
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
          2FA
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
                  Google Authenticator
                </div>
                <div class="tfa__sub">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
            <div class="tfa__item">
              <div class="tfa__text">
                <div class="tfa__main">
                  Status
                </div>
                <div class="tfa__sub">
                  DIsable
                </div>
              </div>
            </div>
          </div>
          <button
            class="btn"
            @click="showEnableGA()"
          >
            Enable
          </button>
        </div>
      </div>
      <div class="pro__item change-pass">
        <div class="change-pass__title">
          Change password
        </div>
        <button
          class="btn"
          @click="showChangePass()"
        >
          Change
        </button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
