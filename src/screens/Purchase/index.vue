<template>
  <div class="content__item pur">
    <ModalResponse
      :id="'pay-success-modal'"
      :text="$t('purchase.modal.successText')"
      :title="$t('purchase.modal.successTitle')"
      :success="true"
    />
    <ModalResponse
      :id="'pay-fail-modal'"
      :text="$t('purchase.modal.failureText')"
      :title="$t('purchase.modal.failureTitle')"
      :success="false"
    />
    <ModalPayConfirm
      :mode="payTab"
      :total="formatSum(amount)"
      @showPaySuccessModal="showPaySuccessModal()"
      @showPayFailModal="showPayFailModal()"
    />
    <div class="promo">
      <div class="promo__head">
        <div class="promo__title">
          {{ $t('purchase.promo.title') }}
        </div>
      </div>
      <div class="promo__items">
        <div
          v-for="(item, i) in promoItems"
          :key="`promoitem_${i}`"
          class="promo__item"
        >
          <div class="promo__num">
            {{ i+1 }}
          </div>
          <div
            class="promo__text"
            v-html="item"
          />
        </div>
      </div>
    </div>
    <div class="pur__items">
      <div class="timer">
        <img
          src="~assets/imgs/timer-bg.svg"
          alt="bg"
          class="timer__bg"
        >
        <div class="timer__box">
          <div class="timer__item">
            <div class="timer__num">
              38
            </div>
            <div class="timer__title">
              {{ $t('purchase.days') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.d') }}
            </div>
          </div>
          <div class="timer__points">
            :
          </div>
          <div class="timer__item">
            <div class="timer__num">
              12
            </div>
            <div class="timer__title">
              {{ $t('purchase.hours') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.h') }}
            </div>
          </div>
          <div class="timer__points">
            :
          </div>
          <div class="timer__item">
            <div class="timer__num">
              12
            </div>
            <div class="timer__title">
              {{ $t('purchase.minutes') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.m') }}
            </div>
          </div>
          <div class="timer__points">
            :
          </div>
          <div class="timer__item">
            <div class="timer__num">
              12
            </div>
            <div class="timer__title">
              {{ $t('purchase.seconds') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.s') }}
            </div>
          </div>
        </div>
      </div>
      <div class="progress">
        <div class="progress__head">
          <div class="progress__icon">
            <img
              src="~assets/imgs/fire.svg"
              alt="icon"
            >
          </div>
          <div class="progress__title">
            {{ $t('purchase.ico') }}
          </div>
        </div>
        <div class="line">
          <div class="line__container">
            <div class="line__filler" />
            <div class="line__points">
              <div
                v-for="(item, i) in 3"
                :key="`line__point_${i}`"
                :class="{'line__point_active': (i === 0)}"
                class="line__point"
              >
                <tippy
                  animation="shift-toward"
                  placement="top"
                  theme="dark"
                  arrow
                  class="line__tippy"
                >
                  <template
                    v-slot:trigger
                  >
                    <div class="line__border">
                      <div class="line__nucleus">
                        {{ item }}
                      </div>
                    </div>
                  </template>
                  <div>
                    {{ $t(`purchase.progressItems[${i}]`) }}
                  </div>
                </tippy>
              </div>
              <div class="line__point" />
            </div>
          </div>
          <div class="line__per">
            35%
          </div>
        </div>
      </div>
      <div class="pay">
        <div class="pay__title">
          {{ $t('purchase.specify') }}
        </div>
        <div class="pay__subtitle">
          {{ $t('purchase.choose') }}
        </div>
        <div class="tab">
          <div class="tab__box">
            <div
              class="tab__shape"
              :class="{'tab__shape_swap': payTab === 1}"
            />
            <div class="tab__items">
              <button
                class="tab__item"
                @click="setPayTab(0)"
              >
                {{ $t('purchase.EOS') }}
              </button>
              <button
                class="tab__item"
                @click="setPayTab(1)"
              >
                {{ $t('purchase.stripe') }}
              </button>
            </div>
          </div>
        </div>
        <div class="pay__subtitle">
          {{ $t('purchase.amount') }}
        </div>
        <div class="pay__amount">
          <input
            v-model="amount"
            maxlength="40"
            :placeholder="$t('purchase.amountPlaceholder')"
            type="number"
          >
        </div>
        <div class="pay__subtitle">
          {{ $t('purchase.total') }}
        </div>
        <div class="pay__sum">
          {{ formatSum(amount) }} {{ $t('purchase.cur') }}
        </div>
        <div class="pay__btns">
          <button
            class="pay__btn"
            @click="showModal('modal-pay-confirm')"
          >
            {{ $t('purchase.confirm') }}
          </button>
        </div>
      </div>
      <div class="steps">
        <div class="steps__title">
          {{ $t('purchase.steps.title') }}
        </div>
        <div class="steps__items">
          <div
            v-for="(item, i) in 3"
            :key="`steps__item${i}`"
            class="step"
            :class="{'step_active': (i === 2)}"
          >
            <div class="step__item">
              <div class="step__title">
                {{ $t(`purchase.steps.items[${i}].round`) }}
              </div>
              <div class="step__sub">
                {{ $t(`purchase.steps.items[${i}].date`) }}
              </div>
            </div>
            <div class="step__item">
              {{ $t(`purchase.steps.items[${i}].extra`) }}
            </div>
            <div class="step__item">
              {{ $t(`purchase.steps.items[${i}].released`) }}
            </div>
            <div class="step__item">
              <div class="step__title">
                {{ $t(`purchase.steps.items[${i}].sum`) }}
              </div>
              <div class="step__sub">
                {{ $t(`purchase.steps.items[${i}].token`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
