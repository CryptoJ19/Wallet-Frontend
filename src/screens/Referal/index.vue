<template>
  <div class="ref content__item">
    <div class="ref__item cover">
      <div class="cover__title">
        Share what is worth sharing
      </div>
      <div class="cover__sub">
        This bonus is for you and  your friends
      </div>
      <div class="cover__stand">
        <div class="stand">
          <div
            class="stand__item"
            v-html="'Your reward\nfor 1 user'"
          />
          <div class="stand__item">
            12 CFT
          </div>
        </div>
      </div>
      <div class="cover__link">
        <div class="link">
          <div class="link__value">
            https://cashflash.io/ref&=nybbq54bq54bq5
          </div>
          <button class="link__copy">
            <img
              src="~assets/imgs/icons/copy.svg"
              alt="close"
            >
          </button>
        </div>
      </div>
      <div class="cover__bg">
        <img
          src="~assets/imgs/referal-cover-bg.svg"
          alt="bg"
        >
      </div>
    </div>
    <div class="ref__item share">
      <div class="share__title">
        Invite Your Friends
      </div>
      <div class="share__items">
        <div class="share__item">
          <input
            maxlength="70"
            type="text"
            :placeholder="$t('auth.email')"
          >
          <div class="form__er">
            <!--            <div v-if="getEr(1)">-->
            <!--              {{ $t('wallet.modalSend.enterRecipient') }}-->
            <!--            </div>-->
          </div>
        </div>
        <div class="share__item">
          <textarea
            placeholder="Some message"
          />
          <div class="form__er">
            <!--            <div v-if="getEr(1)">-->
            <!--              {{ $t('wallet.modalSend.enterRecipient') }}-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="share__bottom">
        <button class="share__btn">
          Send
        </button>
      </div>
    </div>
    <div class="ref__item stat">
      <div class="stat__title">
        Statistic
      </div>
      <div class="stat__items">
        <div class="stat__item">
          <div class="stat__key">
            Personal invites sent
          </div>
          <div class="stat__value">
            5
          </div>
        </div>
        <div class="stat__item">
          <div class="stat__key">
            Personal invites sent
          </div>
          <div class="stat__value">
            5
          </div>
        </div>
        <div class="stat__item">
          <div class="stat__key">
            Personal invites sent
          </div>
          <div class="stat__value">
            5
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
