<template>
  <div class="content__item">
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
      :title="'Success'"
      success
    />
    <div
      v-if="false"
      class="steps"
    >
      <div class="steps__top">
        <div class="steps__text">
          Progress of verifiication
        </div>
        <div class="prog">
          <div class="prog__item prog_active">
            <div class="prog__circle">
              1
            </div>
          </div>
          <div
            class="prog__item"
            :class="{'prog_active': verStep > 1}"
          >
            <div class="prog__circle">
              2
            </div>
          </div>
          <div
            class="prog__item"
            :class="{'prog_active': verStep > 2}"
          >
            <div class="prog__circle">
              3
            </div>
          </div>
          <div
            class="prog__item"
            :class="{'prog_active': verStep > 3}"
          >
            <div class="prog__circle">
              4
            </div>
          </div>
        </div>
        <div />
      </div>
      <div class="steps__main steps__main_one">
        <div class="steps__title">
          PersonaI information
        </div>
        <div class="steps__fields">
          <div
            v-for="(item) in userFieldsPointsTabs[verStep]"
            :key="`user__item-${item}`"
            class="user__item"
            :class="{'user__item_disable': (userFieldsRules[item].const || userEditMode === 0) }"
          >
            <div class="user__title">
              {{ userFieldsRules[item].title }}
            </div>
            <div
              v-if="userFieldsRules[item].type === 'streetName'"
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
                    v-for="(itemStreet, s) in streetTypes"
                    :key="`dd__item_streetType_${s}`"
                    class="dd__item"
                    @click="selectDDStreetType(itemStreet)"
                  >
                    {{ itemStreet }}
                  </button>
                </div>
              </div>
              <input
                v-model.trim="localProfile[item]"
                :disabled="userFieldsRules[item].const || userEditMode === 0"
                type="text"
              >
            </div>
            <div
              v-else-if="userFieldsRules[item].type === 'filePicker'"
              class="file"
            >
              <input
                id="doc-file-input_ver"
                name="myFile"
                type="file"
                accept=".jpg, .png, .pdf"
                @change="handleImageDoc"
              >
              <div class="file__items">
                <div
                  v-for="(file, iDoc) in getDocFile"
                  :key="`file__item_${iDoc}`"
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
                for="doc-file-input_ver"
              >
                <img
                  src="~assets/imgs/icons/cross.svg"
                  alt="close"
                >
              </label>
            </div>
            <div
              v-else-if="userFieldsRules[item].type === 'country'"
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
                  v-if="userFieldsRules.identityDocumentCountry.show"
                  class="vdd__items"
                >
                  <button
                    v-for="(country, iCountris) in getCountris"
                    :key="`dd__item_country_${iCountris}`"
                    class="vdd__item"
                    @click="selectCountry(country.short)"
                  >
                    {{ country.full }}
                    {{ country.short }}
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else-if="userFieldsRules[item].type === 'idDoc'"
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
                  v-if="userFieldsRules.identityDocument.show"
                  class="vdd__items"
                >
                  <button
                    v-for="(doc, iIdDoc) in identityDocumentItems"
                    :key="`dd__item_id-doc_${iIdDoc}`"
                    class="vdd__item"
                    @click="selectIdDoc(doc)"
                  >
                    {{ doc }}
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else-if="userFieldsRules[item].type === 'date'"
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
              v-else-if="userFieldsRules[item].type === 'num'"
              class="user__input"
            >
              <input
                v-model.trim.number="localProfile[item]"
                :disabled="userEditMode === 0"
                type="number"
              >
            </div>
            <div
              v-else
              class="user__input"
            >
              <input
                v-model.trim="localProfile[item]"
                :disabled="userEditMode === 0"
                type="text"
              >
            </div>
            <div class="form__er">
              {{ userFieldsRules[item].er }}
            </div>
          </div>
        </div>
        <div class="steps__bottom">
          <button
            class="steps__btn steps__btn_out"
            @click="prevVerStep"
          >
            Back
          </button>
          <button
            class="steps__btn steps__btn_y"
            @click="nextVerStep"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="pro"
    >
      <div class="pro__item ava">
        <button
          class="ava__btn"
          @click="showChangeAva()"
        >
          <div
            class="ava__img"
            :style="avatarBg"
          />
          <div class="ava__change">
            <img
              src="~assets/imgs/icons/camera.svg"
              alt="icon"
            >
          </div>
        </button>
        <div class="ava__name">
          {{ getProfile.nickname }}
        </div>
        <div class="ava__email">
          {{ getProfile.email }}
        </div>
        <div
          v-if="getProfile.status === 0"
          class="ver"
        >
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
        <div
          v-if="getProfile.status === 0"
          class="ver ver_red"
        >
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
        <div
          v-if="getProfile.status === 1"
          class="ver ver_yellow"
        >
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
      <!--      <div v-if="fieldsRendered">-->
      <!--        <div>-->
      <!--          {{ fieldsRules }}-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="pro__item fields">
        <div class="fields__tabs">
          <button
            v-for="(item, i) in fieldsTabsKey"
            :key="`fields__tab_${item}`"
            class="fields__tab"
            :class="{'fields__tab_active': tab === i}"
            @click="changeTab(i)"
          >
            {{ item }}
          </button>
        </div>
        <div class="fields__content user">
          <div
            v-if="fieldsRendered"
            class="fields__items"
          >
            <div
              v-for="(item) in fieldsKeys[fieldsTabsKey[tab]]"
              :key="`user__item-${item}`"
              class="user__item"
              :class="{'user__item_disable': (userEditMode === 0) }"
            >
              <div class="user__title">
                <!--                {{ userFieldsRules[item].title }}-->
                {{ fieldsTabsKey[tab] + ' ' + item }}
              </div>
              <!--                            <div-->
              <!-- v-if="userFieldsRules[item].type === 'streetName'"-->
              <!--                              class="user__input user__input_dd"-->
              <!--                            >-->
              <!--                              <div class="dd">-->
              <!--                                <button-->
              <!--                                  v-click-outside="hideDDStreetType"-->
              <!--                                  class="dd__btn"-->
              <!--                                  @click="toggleDDStreetType()"-->
              <!--                                >-->
              <!--                                  <div class="dd__title">-->
              <!--                                    {{ localProfile['streetType'] || '-' }}-->
              <!--                                  </div>-->
              <!--                                  <div-->
              <!--                                    v-if="userEditMode === 1"-->
              <!--                                    class="dd__icon"-->
              <!--                                  >-->
              <!--                                    <img-->
              <!--                                      src="~assets/imgs/icons/arrow_dd.svg"-->
              <!--                                      alt="arrow"-->
              <!--                                    >-->
              <!--                                  </div>-->
              <!--                                </button>-->
              <!--                                <div-->
              <!--                                  v-if="DDStreetType"-->
              <!--                                  class="dd__items"-->
              <!--                                >-->
              <!--                                  <button-->
              <!--                                    v-for="(itemStreet, s) in streetTypes"-->
              <!--                                    :key="`dd__item_streetType_${s}`"-->
              <!--                                    class="dd__item"-->
              <!--                                    @click="selectDDStreetType(itemStreet)"-->
              <!--                                  >-->
              <!--                                    {{ itemStreet }}-->
              <!--                                  </button>-->
              <!--                                </div>-->
              <!--                              </div>-->
              <!--                              <input-->
              <!--                                v-model.trim="localProfile[item]"-->
              <!--  :disabled="userFieldsRules[item].const || userEditMode === 0"-->
              <!--                                type="text"-->
              <!--                              >-->
              <!--                            </div>-->
              <div
                v-if="item === 'filePicker'"
                class="file"
              >
                <input
                  id="doc-file-input"
                  name="myFile"
                  type="file"
                  accept=".jpg, .png, .pdf"
                  @change="handleImageDoc"
                >
                <div class="file__items">
                  <div
                    v-for="(file, iDoc) in getDocFile"
                    :key="`file__item_${iDoc}`"
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
                v-else-if="item === 'gender'"
                class="user__input"
              >
                <div class="vdd">
                  <button
                    v-click-outside="hideGender"
                    class="vdd__btn"
                    @click="toggleGender()"
                  >
                    <div
                      v-if="fieldsDropDown.gender !== ''"
                      class="vdd__title"
                    >
                      {{ fieldsDropDown.gender }}
                    </div>
                    <div
                      v-else
                      class="vdd__title vdd__title_placeholder "
                    >
                      Choose gender
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
                    v-if="fieldsDropDown.genderShow"
                    class="vdd__items"
                  >
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
              <div
                v-else-if="item === 'streetType'"
                class="user__input"
              >
                <div class="vdd">
                  <button
                    v-click-outside="hideStreetType"
                    class="vdd__btn"
                    @click="toggleStreetType()"
                  >
                    <div
                      v-if="fieldsDropDown.streetType !== ''"
                      class="vdd__title"
                    >
                      {{ fieldsDropDown.streetType }}
                    </div>
                    <div
                      v-else
                      class="vdd__title vdd__title_placeholder "
                    >
                      Choose streetType
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
                    v-if="fieldsDropDown.streetTypeShow"
                    class="vdd__items"
                  >
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
              <div
                v-else-if="item === 'type'"
                class="user__input"
              >
                <div class="vdd">
                  <button
                    v-click-outside="hideType"
                    class="vdd__btn"
                    @click="toggleType()"
                  >
                    <div
                      v-if="fieldsDropDown.type !== ''"
                      class="vdd__title"
                    >
                      {{ fieldsDropDown.type }}
                    </div>
                    <div
                      v-else
                      class="vdd__title vdd__title_placeholder "
                    >
                      Choose doc type
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
                    v-if="fieldsDropDown.typeShow"
                    class="vdd__items"
                  >
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
                    <img
                      src="~assets/imgs/icons/calendar.svg"
                      alt="info"
                    >
                  </template>
                </date-picker>
                <!--                <div>-->
                <!--                  {{ localFieldsValue[fieldsTabsKey[tab]][item] }}-->
                <!--                </div>-->
              </div>
              <!--              <div-->
              <!--                v-else-if="userFieldsRules[item].type === 'num'"-->
              <!--                class="user__input"-->
              <!--              >-->
              <!--                <input-->
              <!--                  v-model.trim.number="localProfile[item]"-->
              <!--                  :disabled="userFieldsRules[item].const || userEditMode === 0"-->
              <!--                  type="number"-->
              <!--                >-->
              <!--              </div>-->
              <div
                v-else
                class="user__input"
              >
                <input
                  v-model.trim="localFieldsValue[fieldsTabsKey[tab]][item]"
                  :disabled="userEditMode === 0"
                  type="text"
                >
              </div>
              <div class="form__er">
                {{ fieldsEr.person[item] }}
              </div>
            </div>
          </div>
          <div
            v-if="userEditMode === 0"
            class="fields__bottom"
          >
            <button
              class="fields__btn fields__btn fields__btn_y"
              @click="sendVerified"
            >
              Verified me
            </button>
            <button
              class="fields__btn fields__btn fields__btn_y"
              @click="editUser()"
            >
              Change
            </button>
          </div>
          <div
            v-else
            class="fields__bottom"
          >
            <button
              class="fields__btn fields__btn fields__btn_out"
              @click="cancelEditUser()"
            >
              Cancel
            </button>
            <button
              class="fields__btn fields__btn fields__btn_y"
              @click="saveUser()"
            >
              Save
            </button>
          </div>
          <div
            class="user__loader"
            :class="{'user__loader_show': userLoader}"
          >
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
