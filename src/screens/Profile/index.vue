<template>
  <div class="pro content__item">
    <ModalChangePass @changePassSuccess="changePassSuccess" />
    <ModalEnableGA @GASubmiteSuccess="GASubmiteSuccess" />
    <ModalDisableGA @GADisableSuccess="GADisableSuccess" />
    <ModalSuccessEnableGA />
    <ModalSuccessDisableGA />
    <ModalSuccessChangePass />
    <ModalChangeAva />
    <ModalResponse
      :id="'profile-verification-send-modal'"
      :text="'Your personal data have been successfully sent to KYC provider.\n'+
        'We\'ll notify you when the verification procedure is completed.\n'+
        'Check your account status on Cash Flash Profile tab and your mailbox.\n'+
        'Thank you!\n'"
      :title="$t('Success')"
      :success="true"
    />
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
          <div class="header__left">
            <div class="header__name">
              <div class="header__main">
                {{ getProfile.firstName }} {{ getProfile.lastName }}
              </div>
              <div class="header__sub">
                {{ getProfile.email }}
              </div>
            </div>
            <div class="ver">
              <div class="ver__text">
                Verified
              </div>
              <div class="ver__icon">
                <img
                  src="~/assets/imgs/icons/ok.svg"
                  alt="ok"
                >
              </div>
            </div>
            <div class="ver ver_red">
              <div class="ver__text">
                Not verified
              </div>
              <div class="ver__icon">
                <img
                  src="~/assets/imgs/icons/cross_w.svg"
                  alt="ok"
                >
              </div>
            </div>
            <div class="ver ver_yellow">
              <div class="ver__text">
                Pending
              </div>
              <div class="ver__icon">
                <img
                  src="~/assets/imgs/icons/cloce.svg"
                  alt="ok"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="red-mes">
          Your verification request was declined. Your address is incorrect
        </div>
      </div>
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
            v-if="userFields[item].type === 'streetName'"
            class="user__input user__input_dd"
          >
            <div class="dd">
              <button
                v-click-outside="hideDDStreetType"
                class="dd__btn"
                @click="toggleDDStreetType()"
              >
                <div class="dd__title">
                  {{ localProfile['streetType'] || '-' }}
                </div>
                <div
                  v-if="userEditMode === 1"
                  class="dd__icon"
                >
                  <img
                    src="~assets/imgs/icons/arrow_dd.svg"
                    alt="arrow"
                  >
                </div>
              </button>
              <div
                v-if="DDStreetType"
                class="dd__items"
              >
                <button
                  v-for="(item, i) in streetTypes"
                  :key="`dd__item_streetType_${i}`"
                  class="dd__item"
                  @click="selectDDStreetType(item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
            <input
              v-model.trim="localProfile[item]"
              :disabled="userFields[item].const || userEditMode === 0"
              type="text"
            >
          </div>
          <div
            v-else-if="userFields[item].type === 'filePicker'"
            class="file"
          >
            <!--            {{ getDocFile }}-->
            <input
              id="doc-file-input"
              name="myFile"
              type="file"
              accept=".jpg, .png, .pdf"
              @change="handleImageDoc"
            >
            <div class="file__items">
              <div
                v-for="(file, i) in getDocFile"
                :key="`file__item_${i}`"
                class="file__item"
              >
                <div class="file__name">
                  {{ cutString(file.originalName) }}
                </div>
                <button
                  class="file__cross"
                  @click="removeDocFile(file.docId)"
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
            v-else-if="userFields[item].type === 'country'"
            class="user__input"
          >
            <div class="vdd">
              <button
                v-click-outside="hideCountry"
                class="vdd__btn"
                @click="toggleCountry()"
              >
                <div class="vdd__title">
                  {{ localProfile['identityDocumentCountry'] ?
                    getProfile.countryCodes[localProfile['identityDocumentCountry']] + ' ' +
                    localProfile['identityDocumentCountry']
                    : '' }}
                </div>
                <div
                  v-if="userEditMode === 1"
                  class="vdd__icon"
                >
                  <img
                    src="~assets/imgs/icons/arrow_dd.svg"
                    alt="arrow"
                  >
                </div>
              </button>
              <div
                v-if="userFields.identityDocumentCountry.show"
                class="vdd__items"
              >
                <button
                  v-for="(item, i) in getCountris"
                  :key="`dd__item_country_${i}`"
                  class="vdd__item"
                  @click="selectCountry(item.short)"
                >
                  {{ item.full }}
                  {{ item.short }}
                </button>
              </div>
            </div>
          </div>
          <div
            v-else-if="userFields[item].type === 'idDoc'"
            class="user__input"
          >
            <div class="vdd">
              <button
                v-click-outside="hideIdDoc"
                class="vdd__btn"
                @click="toggleIdDoc()"
              >
                <div class="vdd__title">
                  {{ localProfile['identityDocument'] || '' }}
                </div>
                <div
                  v-if="userEditMode === 1"
                  class="vdd__icon"
                >
                  <img
                    src="~assets/imgs/icons/arrow_dd.svg"
                    alt="arrow"
                  >
                </div>
              </button>
              <div
                v-if="userFields.identityDocument.show"
                class="vdd__items"
              >
                <button
                  v-for="(item, i) in identityDocumentItems"
                  :key="`dd__item_id-doc_${i}`"
                  class="vdd__item"
                  @click="selectIdDoc(item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
          </div>
          <div
            v-else-if="userFields[item].type === 'date'"
            class="user__input"
          >
            <date-picker
              v-model="localProfile[item]"
              class="custom-date-picker"
              :popup-class="'custom-date-picker'"
              :format="'DD/MM/YYYY'"
              value-type="format"
              :disabled="userEditMode === 0"
            >
              <template v-slot:icon-calendar>
                <img
                  src="~assets/imgs/icons/calendar.svg"
                  alt="info"
                >
              </template>
            </date-picker>
          </div>
          <div
            v-else-if="userFields[item].type === 'num'"
            class="user__input"
          >
            <input
              v-model.trim="localProfile[item]"
              :disabled="userFields[item].const || userEditMode === 0"
              type="number"
            >
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
        <div
          class="btn btn"
          @click="sendVerified"
        >
          Verified
        </div>
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
          class="btn btn_cancel"
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
