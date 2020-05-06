<template>
  <div class="pro">
    <div class="pro__item user">
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
      <div class="user__items">
        <div class="user__item">
          <div class="user__title">
            First name
          </div>
          <input
            type="text"
            value="Name"
          >
        </div>
        <div class="user__item">
          <div class="user__title">
            Second name
          </div>
          <input
            type="text"
            value="Surname"
          >
        </div>
        <div class="user__item">
          <div class="user__title">
            Nickname
          </div>
          <input
            type="text"
            value="Surname123123"
          >
        </div>
      </div>
      <div class="btns">
        <div class="btn">
          Cancel
        </div>
        <div class="btn">
          Save
        </div>
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
          <button class="btn">
            Enable
          </button>
        </div>
      </div>
      <div class="pro__item change-pass">
        <div class="change-pass__title">
          Change password
        </div>
        <button class="btn">
          Change
        </button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
