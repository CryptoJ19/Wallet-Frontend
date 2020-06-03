<template>
  <div class="ref content__item">
    <div class="ref__item cover">
      <div class="cover__bg">
        <img
          src="~assets/imgs/referal-cover-bg.svg"
          alt="bg"
        >
      </div>
      <div class="cover__title">
        {{ $t('ref.title') }}
      </div>
      <div class="cover__sub">
        {{ $t('ref.sub') }}
      </div>
      <div class="cover__stand">
        <div class="stand">
          <div
            class="stand__item"
            v-html="$t('ref.reward')"
          />
          <div class="stand__item">
            {{ $t('ref.rewardNum') }}
          </div>
        </div>
      </div>
      <div class="cover__link">
        <div class="link">
          <div class="link__value">
            {{ getReferalLink }}
          </div>
          <button
            class="link__copy"
            @click="copy(getReferalLink)"
          >
            <img
              src="~assets/imgs/icons/copy.svg"
              alt="close"
            >
          </button>
        </div>
      </div>
    </div>
    <div class="ref__item share">
      <div class="share__title">
        {{ $t('ref.invFriends') }}
      </div>
      <div class="share__items">
        <div class="share__item">
          <input
            v-model="sendEmail"
            maxlength="70"
            type="text"
            :placeholder="$t('auth.email')"
          >
          <div class="form__er">
            <div v-if="getEr(0)">
              {{ $t('auth.er.enterEmail') }}
            </div>
            <div v-if="getEr(1)">
              {{ $t('auth.er.enterValidEmail') }}
            </div>
          </div>
        </div>
        <div class="share__item">
          <textarea
            v-model="sendMsg"
            :placeholder="$t('ref.someMsg')"
          />
          <div class="form__er">
            <div
              v-if="showSendSuccessMsg"
              class="vtext__green"
            >
              {{ $t('ref.inviteSuccesSent') }}
            </div>
            <div v-else-if="getEr(2)">
              {{ $t('auth.er.enterMsg') }}
            </div>
          </div>
        </div>
      </div>
      <div class="share__bottom">
        <button
          class="share__btn"
          @click="preludeSendInvite()"
        >
          {{ $t('ref.invBtn') }}
        </button>
      </div>
      <div
        class="loader__body"
        :class="{'loader__body_show': sendLoading}"
      >
        <Loader />
      </div>
    </div>
    <div class="ref__item stat">
      <div class="stat__title">
        {{ $t('ref.statistic') }}
      </div>
      <div class="stat__items">
        <div class="stat__item">
          <div class="stat__key">
            {{ $t('ref.statSent') }}
          </div>
          <div class="stat__value">
            {{ getReferal.invitationCount }}
          </div>
        </div>
        <div class="stat__item">
          <div class="stat__key">
            {{ $t('ref.statBonuses') }}
          </div>
          <div class="stat__value">
            {{ getReferal.amount }} {{ getReferal.currency.toUpperCase() }}
          </div>
        </div>
        <div class="stat__item">
          <div class="stat__key">
            {{ $t('ref.statRef') }}
          </div>
          <div class="stat__value">
            {{ getReferal.usersCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
