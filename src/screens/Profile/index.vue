<template>
  <div class="pro content__item">
    <ModalChangePass @changePassSuccess="changePassSuccess" />
    <ModalEnableGA @GASubmiteSuccess="GASubmiteSuccess" />
    <ModalDisableGA @GADisableSuccess="GADisableSuccess" />
    <ModalSuccessEnableGA />
    <ModalSuccessDisableGA />
    <ModalSuccessChangePass />
    <ModalChangeAva />
    <div
      class="pro__item user"
    >
      <div class="header">
        <div class="header__shape" />
        <div class="header__body">
          <button
            class="header__ava"
            @click="showChangeAva()"
          >
            <div
              class="ava"
              :style="avatarBg"
            />
            <div class="header__change">
              <img
                src="~assets/imgs/icons/up.svg"
                alt="icon"
              >
            </div>
          </button>
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
      <!--        <button @click="checkEr">-->
      <!--          checkIsEmpty-->
      <!--        </button>-->
      <!--      </div>-->
      <div class="user__items">
        <div
          v-for="(item, i) in userFieldsPoints"
          :key="`user__item-${i}`"
          class="user__item"
          :class="{'user__item_disable': (userFields[item].const || userEditMode === 0) }"
        >
          <div class="user__title">
            {{ userFields[item].title }}
          </div>
          <div
            v-if="userFields[item].type === 'filePicker'"
            class="file"
          >
            <input
              id="doc-file-input"
              name="myFile"
              type="file"
              accept="image/*"
              @change="handleImageDoc"
            >
            <div class="file__items">
              <div
                v-for="(file, i) in docIdentCopyFileData"
                :key="`file__item_${i}`"
                class="file__item"
              >
                <div class="file__name">
                  {{ file }}
                </div>
                <button
                  class="file__cross"
                  @click="removeDocFile(i)"
                >
                  <img
                    src="~assets/imgs/icons/cross.svg"
                    alt="close"
                  >
                </button>
              </div>
            </div>
            <label
              class="file__add"
              for="doc-file-input"
            >
              <img
                src="~assets/imgs/icons/cross.svg"
                alt="close"
              >
            </label>
          </div>
          <div
            v-else
            class="user__input"
          >
            <input
              v-model.trim="localProfile[item]"
              :disabled="userFields[item].const || userEditMode === 0"
              type="text"
            >
          </div>
          <div class="form__er">
            {{ userFields[item].er }}
          </div>
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
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
