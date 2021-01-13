<template>
  <div class="">
    <ModalChangePass @changePassSuccess="changePassSuccess" />
    <ModalEnableGA @GASubmiteSuccess="GASubmiteSuccess" />
    <ModalDisableGA @GADisableSuccess="GADisableSuccess" />
    <ModalSuccessEnableGA />
    <ModalSuccessDisableGA />
    <ModalSuccessChangePass />
    <ModalChangeAva />
    <ModalResponse
      :id="'profile-verification-send-modal'"
      :text="$t('profile.kysSuccess')"
      :title="$t('profile.progressVer')"
      success
    />
    <ModalResponse
      :id="'profile-verification-send-modal_fail'"
      :text="verificationError || 'Verification error. Please check all fields'"
      :title="$t('profile.progressVer')"
    />
    <div v-if="false && getProfile.verificationStatus === 0" class="steps">
      <div class="steps__top">
        <div class="steps__text">
          {{ $t('profile.progressVer') }}
        </div>
        <div class="prog">
          <div class="prog__item prog_active">
            <div class="prog__circle">1</div>
          </div>
          <div class="prog__item" :class="{ prog_active: verStep > 0 }">
            <div class="prog__circle">2</div>
          </div>
          <div class="prog__item" :class="{ prog_active: verStep > 1 }">
            <div class="prog__circle">3</div>
          </div>
          <div class="prog__item" :class="{ prog_active: verStep > 2 }">
            <div class="prog__circle">4</div>
          </div>
        </div>
        <div />
      </div>
      <div class="steps__main steps__main_one">
        <div class="steps__title">
          {{ fieldsTitles[fieldsTabsKey[verStep]].title }}
        </div>
        <div v-if="fieldsRendered" class="fields__items fields_steps steps__fields">
          <div
            v-for="item in fieldsKeys[fieldsTabsKey[verStep]]"
            :key="`user__item-${item}`"
            class="user__item"
          >
            <div class="fields__label">
              {{ fieldsTitles[fieldsTabsKey[verStep]][item] }}
            </div>
            <div v-if="item === 'filePicker'" class="file">
              <input
                id="doc-file-input_2"
                class="doc-file-input"
                name="myFile"
                type="file"
                accept=".jpg, .png, .pdf"
                @change="handleImageDoc"
              />
              <div class="file__items">
                <div
                  v-for="(file, iDoc) in getDocFile"
                  :key="`file__item_${iDoc}`"
                  class="file__item"
                >
                  <div class="file__name">
                    {{ cutString(file.originalName) }}
                  </div>
                  <button class="file__cross" @click="removeDocFile(file.docId)">
                    <img src="~assets/imgs/icons/cross.svg" alt="close" />
                  </button>
                </div>
              </div>
              <label class="file__add" for="doc-file-input_2">
                <img src="~assets/imgs/icons/cross.svg" alt="close" />
              </label>
            </div>
            <div v-else-if="item === 'gender'" class="user__input">
              <div class="vdd">
                <button v-click-outside="hideGender" class="vdd__btn" @click="toggleGender()">
                  <div v-if="fieldsDropDown.gender !== ''" class="vdd__title">
                    {{ fieldsDropDown.gender }}
                  </div>
                  <div v-else class="vdd__title vdd__title_placeholder" />
                  <div class="vdd__icon">
                    <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                  </div>
                </button>
                <div v-if="fieldsDropDown.genderShow" class="vdd__items">
                  <button
                    v-for="(gender, iGender) in genders"
                    :key="`dd__item_gender_${iGender}`"
                    class="vdd__item"
                    @click="selectGender(gender)"
                  >
                    {{ gender }}
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="item === 'streetType'" class="user__input">
              <div class="vdd">
                <button
                  v-click-outside="hideStreetType"
                  class="vdd__btn"
                  @click="toggleStreetType()"
                >
                  <div v-if="fieldsDropDown.streetType !== ''" class="vdd__title">
                    {{ fieldsDropDown.streetType }}
                  </div>
                  <div v-else class="vdd__title vdd__title_placeholder" />
                  <div class="vdd__icon">
                    <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                  </div>
                </button>
                <div v-if="fieldsDropDown.streetTypeShow" class="vdd__items">
                  <button
                    v-for="(streetType, iStreetType) in streetTypes"
                    :key="`dd__item_street-type_${iStreetType}`"
                    class="vdd__item"
                    @click="selectStreetType(streetType)"
                  >
                    {{ streetType }}
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="item === 'type'" class="user__input">
              <div class="vdd">
                <button v-click-outside="hideType" class="vdd__btn" @click="toggleType()">
                  <div v-if="fieldsDropDown.type !== ''" class="vdd__title">
                    {{ fieldsDropDown.type }}
                  </div>
                  <div v-else class="vdd__title vdd__title_placeholder" />
                  <div class="vdd__icon">
                    <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                  </div>
                </button>
                <div v-if="fieldsDropDown.typeShow" class="vdd__items">
                  <button
                    v-for="(type, iType) in docTypes"
                    :key="`dd__item_type_${iType}`"
                    class="vdd__item"
                    @click="selectType(type)"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else-if="Object.keys(fieldsDatePickerValue).indexOf(item) !== -1"
              class="user__input"
            >
              <date-picker
                v-model="fieldsDatePickerValue[item]"
                class="custom-date-picker"
                :popup-class="'custom-date-picker'"
                :format="'DD/MM/YYYY'"
              >
                <template v-slot:icon-calendar>
                  <img src="~assets/imgs/icons/calendar.svg" alt="info" />
                </template>
              </date-picker>
            </div>
            <div v-else class="user__input">
              <input v-model.trim="localFieldsValue[fieldsTabsKey[verStep]][item]" type="text" />
            </div>
            <div class="form__er">
              {{ fieldsEr[fieldsTabsKey[verStep]][item] }}
            </div>
          </div>
        </div>
        <div class="steps__bottom">
          <button class="steps__btn steps__btn_out" @click="prevVerStep">
            {{ $t('profile.backBtn') }}
          </button>
          <button class="steps__btn steps__btn_y" @click="nextVerStep">
            {{ $t('profile.nextBtn') }}
          </button>
        </div>
        <div class="steps__loader" :class="{ steps__loader_show: userLoader }">
          <Loader />
        </div>
      </div>
    </div>
    <div v-else class="content__item pro">
      <div class="pro__item ava">
        <button class="ava__btn" @click="showChangeAva()">
          <div class="ava__img" :style="avatarBg" />
          <div class="ava__change">
            <img src="~assets/imgs/icons/camera.svg" alt="icon" />
          </div>
        </button>
        <div class="ava__name">
          {{ getProfile.nickname }}
        </div>
        <div class="ava__email">
          {{ getProfile.email }}
        </div>
        <div v-if="getProfile.verificationStatus === 2" class="ver">
          <div class="ver__text">
            {{ $t('profile.verified') }}
          </div>
          <div class="ver__icon">
            <img src="~/assets/imgs/icons/ok.svg" alt="ok" />
          </div>
        </div>
        <div
          v-if="getProfile.verificationStatus === -1 || getProfile.verificationStatus === 0"
          class="ver ver_red"
        >
          <div class="ver__text">
            {{ $t('profile.notVerified') }}
          </div>
          <div class="ver__icon">
            <img src="~/assets/imgs/icons/cross_w.svg" alt="ok" />
          </div>
        </div>
        <div v-if="getProfile.verificationStatus === 1" class="ver ver_yellow">
          <div class="ver__text">
            {{ $t('profile.pending') }}
          </div>
          <div class="ver__icon">
            <img src="~/assets/imgs/icons/cloce.svg" alt="ok" />
          </div>
        </div>
      </div>
      <div class="pro__item fields">
        <div class="fields__tabs">
          <button
            v-for="(item, i) in fieldsTabsKey"
            :key="`fields__tab_${item}`"
            class="fields__tab"
            :class="{ fields__tab_active: tab === i }"
            @click="changeTab(i)"
          >
            {{ fieldsTitles[item].title }}
          </button>
        </div>
        <div class="fields__content user">
          <div v-if="fieldsRendered" class="fields__items">
            <div
              v-for="item in fieldsKeys[fieldsTabsKey[tab]]"
              :key="`user__item-${item}`"
              class="user__item"
              :class="{ user__item_disable: userEditMode === 0 }"
            >
              <div class="fields__label">
                <!--                {{ userFieldsRules[item].title }}-->
                {{ fieldsTitles[fieldsTabsKey[tab]][item] || item }}
              </div>
              <div v-if="item === 'filePicker'" class="file">
                <input
                  id="doc-file-input"
                  class="doc-file-input"
                  name="myFile"
                  type="file"
                  accept=".jpg, .png, .pdf"
                  @change="handleImageDoc"
                />
                <div class="file__items">
                  <div
                    v-for="(file, iDoc) in getDocFile"
                    :key="`file__item_${iDoc}`"
                    class="file__item"
                  >
                    <div class="file__name">
                      {{ cutString(file.originalName) }}
                    </div>
                    <button class="file__cross" @click="removeDocFile(file.docId)">
                      <img src="~assets/imgs/icons/cross.svg" alt="close" />
                    </button>
                  </div>
                </div>
                <label class="file__add" for="doc-file-input">
                  <img src="~assets/imgs/icons/cross.svg" alt="close" />
                </label>
              </div>
              <div v-else-if="item === 'gender'" class="user__input">
                <div class="vdd">
                  <button v-click-outside="hideGender" class="vdd__btn" @click="toggleGender()">
                    <div v-if="fieldsDropDown.gender !== ''" class="vdd__title">
                      {{ fieldsDropDown.gender && gendersName[fieldsDropDown.gender] }}
                    </div>
                    <div v-else class="vdd__title vdd__title_placeholder">
                      {{ $t('profile.chooseGender') }}
                    </div>
                    <div v-if="userEditMode === 1" class="vdd__icon">
                      <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                    </div>
                  </button>
                  <div v-if="fieldsDropDown.genderShow" class="vdd__items">
                    <button
                      v-for="(gender, iGender) in genders"
                      :key="`dd__item_gender_${iGender}`"
                      class="vdd__item"
                      @click="selectGender(gender)"
                    >
                      {{ gendersName[gender] }}
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-else-if="item === 'country' && fieldsTabsKey[tab] === 'document'"
                class="user__input"
              >
                <div class="vdd">
                  <button
                    v-click-outside="hideCountryDoc"
                    class="vdd__btn"
                    @click="toggleCountryDoc()"
                  >
                    <div v-if="fieldsDropDown.countryDoc !== ''" class="vdd__title">
                      {{
                        fieldsDropDown.countryDoc
                          ? fieldsDropDown.countryDoc +
                            ' ' +
                            getProfile.countryCodes[fieldsDropDown.countryDoc]
                          : ''
                      }}
                    </div>
                    <div v-else class="vdd__title vdd__title_placeholder" />
                    <div v-if="userEditMode === 1" class="vdd__icon">
                      <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                    </div>
                  </button>
                  <div v-if="fieldsDropDown.countryDocShow" class="vdd__items">
                    <button
                      v-for="(countryDoc, iCountryDoc) in getCountris"
                      :key="`dd__item_gender_${iCountryDoc}`"
                      class="vdd__item"
                      @click="selectCountryDoc(countryDoc.short)"
                    >
                      {{ countryDoc.short }}
                      {{ countryDoc.full }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-else-if="item === 'streetType'" class="user__input">
                <div class="vdd">
                  <button
                    v-click-outside="hideStreetType"
                    class="vdd__btn"
                    @click="toggleStreetType()"
                  >
                    <div v-if="fieldsDropDown.streetType !== ''" class="vdd__title">
                      {{ fieldsDropDown.streetType }}
                    </div>
                    <div v-else class="vdd__title vdd__title_placeholder" />
                    <div v-if="userEditMode === 1" class="vdd__icon">
                      <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                    </div>
                  </button>
                  <div v-if="fieldsDropDown.streetTypeShow" class="vdd__items">
                    <button
                      v-for="(streetType, iStreetType) in streetTypes"
                      :key="`dd__item_street-type_${iStreetType}`"
                      class="vdd__item"
                      @click="selectStreetType(streetType)"
                    >
                      {{ streetType }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-else-if="item === 'type'" class="user__input">
                <div class="vdd">
                  <button v-click-outside="hideType" class="vdd__btn" @click="toggleType()">
                    <div v-if="fieldsDropDown.type !== ''" class="vdd__title">
                      {{ fieldsDropDown.type }}
                    </div>
                    <div v-else class="vdd__title vdd__title_placeholder" />
                    <div v-if="userEditMode === 1" class="vdd__icon">
                      <img src="~assets/imgs/icons/arrow_dd.svg" alt="arrow" />
                    </div>
                  </button>
                  <div v-if="fieldsDropDown.typeShow" class="vdd__items">
                    <button
                      v-for="(type, iType) in docTypes"
                      :key="`dd__item_type_${iType}`"
                      class="vdd__item"
                      @click="selectType(type)"
                    >
                      {{ type }}
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-else-if="Object.keys(fieldsDatePickerValue).indexOf(item) !== -1"
                class="user__input"
              >
                <date-picker
                  v-model="fieldsDatePickerValue[item]"
                  class="custom-date-picker"
                  :popup-class="'custom-date-picker'"
                  :format="'DD/MM/YYYY'"
                  :disabled="userEditMode === 0"
                >
                  <template v-slot:icon-calendar>
                    <img src="~assets/imgs/icons/calendar.svg" alt="info" />
                  </template>
                </date-picker>
              </div>
              <div
                v-else-if="item === 'country' && fieldsTabsKey[tab] === 'location'"
                class="user__input user__input_const"
              >
                {{ getProfile.countryCodes[getProfile.country] }}
              </div>
              <div v-else class="user__input">
                <input
                  v-model.trim="localFieldsValue[fieldsTabsKey[tab]][item]"
                  :disabled="userEditMode === 0"
                  type="text"
                />
              </div>
              <div class="form__er">
                {{ fieldsEr[fieldsTabsKey[tab]][item] }}
              </div>
            </div>
          </div>
          <div v-if="userEditMode === 0" class="fields__bottom">
            <button class="fields__btn fields__btn fields__btn_y" @click="sendVerified">
              {{ $t('profile.verifiedMe') }}
            </button>
            <button class="fields__btn fields__btn fields__btn_y" @click="editUser()">
              {{ $t('profile.changeProfile') }}
            </button>
          </div>
          <div v-else class="fields__bottom">
            <button class="fields__btn fields__btn fields__btn_out" @click="cancelEditUser()">
              {{ $t('profile.cancel') }}
            </button>
            <button class="fields__btn fields__btn fields__btn_y" @click="saveUser(tab)">
              {{ $t('profile.save') }}
            </button>
          </div>
          <div class="user__loader" :class="{ user__loader_show: userLoader }">
            <Loader />
          </div>
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
                <img src="~assets/imgs/icons/ga.svg" alt="ga" />
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
                <div v-if="getGAEnabled" class="tfa__sub tfa__sub_green">
                  {{ $t('profile.enable') }}
                </div>
                <div v-if="!getGAEnabled" class="tfa__sub">
                  {{ $t('profile.disable') }}
                </div>
              </div>
            </div>
          </div>
          <button v-if="getGAEnabled" class="btn-out" @click="showDisableGA()">
            {{ $t('profile.disable') }}
          </button>
          <button v-if="!getGAEnabled" class="btn" @click="showEnableGA()">
            {{ $t('profile.enable') }}
          </button>
        </div>
      </div>
      <div class="pro__item change-pass">
        <div class="change-pass__title">
          {{ $t('profile.changePass') }}
        </div>
        <button class="btn" @click="showChangePass()">
          {{ $t('profile.changePassBtn') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
