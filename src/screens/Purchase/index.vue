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
      :total-sum="+totalSum"
      :amount-e-o-s="+amountEOS"
      :amount-c-f-t="+amountCFT"
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
        <div class="promo__box">
          <div class="promo__box-container">
            <div class="promo__box-title">{{$t('purchase.specialOfferTitle')}}</div>
            <div class="promo__box-description">
              {{$t('purchase.specialOfferDescription')}}
            </div>
            <div v-if="getBonuses[0]" class="promo__box-offer">
              <strong>{{ NumberWithCommas(getBonuses[0].minAmount) }}€</strong>
              {{ $t('purchase.promoTo') }}
              <strong>{{ NumberWithCommas(getBonuses[0].maxAmount) }}€</strong>
              <div>{{ $t('purchase.promoExtra') }} {{ getBonuses[0].reward }}%</div>
            </div>
          </div>
          <img src="~assets/imgs/promo_bg.svg" alt="">
        </div>
        <div v-for="(item, i) in getBonuses.slice(1)" :key="`promoitem_${i}`" class="promo__item">
          <div class="promo__num">
            {{ i + 1 }}
          </div>
          <div v-if="+item.maxAmount !== 0 && +item.reward !== 0" class="promo__text">
            <strong>{{ NumberWithCommas(item.minAmount) }}€</strong>
            {{ $t('purchase.promoTo') }}
            <strong>{{ NumberWithCommas(item.maxAmount) }}€</strong>
            <div>{{ $t('purchase.promoExtra') }}
              {{ item.reward }}%</div>
          </div>
          <div v-else>
            <strong>{{ NumberWithCommas(item.minAmount) }}€</strong>
            <div>{{ $t('purchase.andMore') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pur__items">
      <div class="pay">
        <div class="pay__title">
          {{ $t('purchase.specify') }}
        </div>
        <div class="pay__subtitle">
          {{ $t('purchase.choose') }}
        </div>
        <div class="tab">
          <div class="tab__box">
            <div class="tab__shape" :class="{ tab__shape_swap: payTab === 1 }" />
            <div class="tab__items">
              <button class="tab__item" @click="setPayTab(0)">
                {{ $t('purchase.EOS') }}
              </button>
              <button class="tab__item" @click="setPayTab(1)">
                {{ $t('purchase.stripe') }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="payTab === 0" class="pay__way">
          <div class="pay__sum pay__sum_sm">
            1 CFT =
            {{
              Math.ceil(
                (this.getCurrencyByName('CFT').currentRate /
                  this.getCurrencyByName('EOS').currentRate) *
                  10000,
              ) / 10000
            }}
            EOS = {{ rateCFT }} EUR
          </div>
          <div class="pay__subtitle">{{ $t('purchase.amount') }} CFT</div>
          <div class="pay__amount">
            <input
              v-model="amountCFT"
              maxlength="40"
              :placeholder="$t('wallet.modalSend.amount')"
              type="number"
              @input="onChangeField"
            />
          </div>
          <div class="pay__subtitle">{{ $t('purchase.amount') }} EOS</div>
          <div class="pay__amount">
            <input
              v-model="amountEOS"
              maxlength="40"
              :placeholder="$t('wallet.modalSend.amount')"
              type="number"
              @input="onChangeField"
            />
          </div>
          <div class="pay__subtitle">
            {{ $t('purchase.total') }}
          </div>
          <div class="pay__sum">{{ Math.ceil(totalSum * 100) / 100 }}{{ $t('purchase.cur') }}</div>
          <div class="reward">
            <div class="reward__item">
              <div class="reward__title">
                {{ $t('purchase.bonusAmount') }}
              </div>
              <div class="reward__value">{{ Math.ceil(bonus * 10000) / 10000 }} CFT</div>
            </div>
            <div class="reward__item">
              <div class="reward__title">
                {{ $t('purchase.deliveryDate') }}
              </div>
              <div class="reward__value">
                {{ bonus === 0 ? '-' : getDeliveryDate() }}
              </div>
            </div>
          </div>
          <div class="pay__btns">
            <button
              class="pay__btn"
              :class="{ pay__btn_dis: checkValidPay }"
              :disabled="checkValidPay"
              @click="showPayConfirmModal()"
            >
              {{ $t('purchase.confirm') }}
            </button>
          </div>
        </div>
        <div v-else class="pay__way">
          <div class="payment">
            <div class="payment__title">{{ $t('purchase.paymentBtcEth.title') }} BTC</div>
            <div class="payment__rates">1 CFT = {{ round(rate('CFT', 'BTC'), 8) }} BTC = {{ rate('CFT', 'EUR') }} EUR</div>
            <div class="payment__text" v-html="$t('purchase.paymentBtcEth.description')">
            </div>
            <div class="payment__address-title">BTC {{ $t('purchase.paymentBtcEth.address') }}</div>
            <div class="payment__address">
              <input type="text" disabled v-model="mockBtcAddress">
              <button class="payment__copy" @click="copy(mockBtcAddress)">
                <div class="payment__copy-active">
                  <img src="~assets/imgs/icons/copy.svg" alt="close" />
                </div>
              </button>
            </div>
          </div>
          <div class="payment">
            <div class="payment__title">{{ $t('purchase.paymentBtcEth.title') }} ETH</div>
            <div class="payment__rates">1 CFT = {{ round(rate('CFT', 'ETH'), 8) }} ETH = {{ rate('CFT', 'EUR') }} EUR</div>
            <div class="payment__text" v-html="$t('purchase.paymentBtcEth.description')"></div>
            <div class="payment__address-title">ETH {{ $t('purchase.paymentBtcEth.address') }}</div>
            <div class="payment__address">
              <input type="text" disabled v-model="mockBtcAddress">
              <button class="payment__copy" @click="copy(mockBtcAddress)">
                <div class="payment__copy-active">
                  <img src="~assets/imgs/icons/copy.svg" alt="close" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="timer">
        <img src="~assets/imgs/timer-bg.svg" alt="bg" class="timer__bg" />
        <div class="timer__box">
          <div class="timer__item">
            <div class="timer__num">{{ d }}</div>
            <div class="timer__title">
              {{ $t('purchase.days') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.d') }}
            </div>
          </div>
          <div class="timer__points">:</div>
          <div class="timer__item">
            <div class="timer__num">{{ h }}</div>
            <div class="timer__title">
              {{ $t('purchase.hours') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.h') }}
            </div>
          </div>
          <div class="timer__points">:</div>
          <div class="timer__item">
            <div class="timer__num">{{ m }}</div>
            <div class="timer__title">
              {{ $t('purchase.minutes') }}
            </div>
            <div class="timer__title timer__title_mob">
              {{ $t('purchase.m') }}
            </div>
          </div>
          <div class="timer__points">:</div>
          <div class="timer__item">
            <div class="timer__num">{{ s }}</div>
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
            <img src="~assets/imgs/fire.svg" alt="icon" />
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
                class="line__point"
              >
                <tippy
                  animation="shift-toward"
                  placement="top"
                  theme="dark"
                  arrow
                  class="line__tippy"
                >
                  <template v-slot:trigger>
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
          <div class="line__per">5%</div>
        </div>
      </div>

      <div class="steps">
        <div class="steps__title">
          {{ $t('purchase.currencies.title') }}
        </div>
        <div class="steps__items">
          <div class="steps__header">
            <div class="steps__column-name">{{ $t('purchase.currencies.columns.currency') }}</div>
            <div class="steps__column-name">{{ $t('purchase.currencies.columns.price') }}</div>
            <div class="steps__column-name">{{ $t('purchase.currencies.columns.change') }}</div>
          </div>
          <div
            v-for="(item, i) in currencies"
            :key="`steps__item${i}`"
            class="step"
            :class="{ step_active: i === 0 }"
          >
            <div class="step__item">
              <div class="step__title">
                {{ item.name }}
              </div>
            </div>
            <div class="step__item">
              €{{ NumberWithCommas(item.price) }}
            </div>
            <div class="step__item">
              <div class="step__title">
                <img
                  v-if="item.change > 0"
                  src="~assets/imgs/icons/arrow_up.svg"
                  alt="img"
                >
                <img
                  v-if="item.change < 0"
                  src="~assets/imgs/icons/arrow_down.svg"
                  alt="img"
                >
                {{ Math.abs(item.change) }}%
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
