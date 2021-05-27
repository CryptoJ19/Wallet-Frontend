<template>
  <div class="wallet content__item">
    <ModalSendBalance
      :currency="modalSendCurrency"
      @sendSuccess="sendSuccess"
      @refrashTransactions="refrashTransactions"
    />
    <ModalRecieve />
    <ModalSuccessSend />

    <div class="wallet__top">
      <div class="wallet__item balance">
        <div class="title">
          {{ $t('wallet.balance') }}
        </div>
        <div>
          <div class="mainnum">
            EOS
            {{ mathCut(getBalance('EOS')) }}
          </div>
          <div class="subnum">
            $ {{ mathCut(convertToUSD('EOS')) }}
          </div>
          <div class="bottom">
            <div class="balance__link" />
            <div class="btns">
              <button class="btn">
                <img
                  src="~assets/imgs/icons/refrash.svg"
                  alt="arrow"
                >
              </button>
              <button
                class="btn"
                @click="showSendBalance('EOS')"
              >
                <div>
                  {{ $t('wallet.send') }}
                </div>
                <div class="icon">
                  <img
                    src="~assets/imgs/icons/arrow_a.svg"
                    alt="arrow"
                  >
                </div>
              </button>
              <button
                class="btn"
                @click="showRecieve()"
              >
                <div>
                  {{ $t('wallet.receive') }}
                </div>
                <div class="icon">
                  <img
                    src="~assets/imgs/icons/arrow_a.svg"
                    alt="arrow"
                  >
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="wallet__item token">
        <div class="title">
          {{ $t('wallet.balance') }}
        </div>
        <div>
          <div class="mainnum">
            CFT
            {{ mathCut(getBalance('CFT')) }}
          </div>
          <div class="subnum">
            $ {{ mathCut(convertToUSD('CFT')) }}
          </div>
          <div class="bottom">
            <div />
            <div class="btns">
              <button class="btn">
                <img
                  src="~assets/imgs/icons/refrash.svg"
                  alt="arrow"
                >
              </button>
              <button
                class="btn"
                @click="showSendBalance('CFT')"
              >
                <div>
                  {{ $t('wallet.send') }}
                </div>
                <div class="icon">
                  <img
                    src="~assets/imgs/icons/arrow_a.svg"
                    alt="arrow"
                  >
                </div>
              </button>
              <button
                class="btn"
                @click="showRecieve()"
              >
                <div>
                  {{ $t('wallet.receive') }}
                </div>
                <div class="icon">
                  <img
                    src="~assets/imgs/icons/arrow_a.svg"
                    alt="arrow"
                  >
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="getMyBonuses.length !== 0"
        class="wallet__item reward"
      >
        <div class="taber">
          <div class="taber__top">
            <div class="taber__title">
              {{ $t('wallet.labelReward') }}
              <span class="taber__title_inv">
                ({{ $t('wallet.ofReward') }} {{ getMyBonuses.length }})
              </span>
            </div>
            <div class="taber__btns">
              <button
                class="taber__btn taber__btn_left"
                @click="prevRewardPage()"
              >
                <img
                  src="~assets/imgs/icons/arrow_default_white.svg"
                  alt="arrow"
                >
              </button>
              <button
                class="taber__btn taber__btn_right"
                @click="nextRewardPage()"
              >
                <img
                  src="~assets/imgs/icons/arrow_default_white.svg"
                  alt="arrow"
                >
              </button>
            </div>
          </div>
          <div class="taber__body">
            <div
              class="taber__items"
              :class="`taber__items_${rewardPage}`"
            >
              <div
                v-for="(item, i) in getMyBonuses"
                :key="`taber__item-${i}`"
                class="taber__item taber__text"
              >
                <span>
                  {{ getDeliveryDate[0] }}
                  <span class="taber__text_thin">
                    {{ getDeliveryDate[1] }}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="getMyBonuses.length <= 5"
            class="taber__pager"
          >
            <div
              v-for="rewardCircle in getMyBonuses.length"
              :key="`taber__circle-${rewardCircle - 1}`"
              class="taber__circle"
              :class="{'taber__circle_active': rewardPage === rewardCircle - 1}"
            />
          </div>
        </div>
        <div class="reward__text">
          <span>{{ $t('wallet.onReward') }} {{ getDeliveryDate[0] }}, {{ getDeliveryDate[1] }}.
            <strong>{{ getMyBonuses[rewardPage].reward }} CFT</strong>
            {{ $t('wallet.descReward') }}</span>
        </div>
        <div class="reward__cover">
          <img
            src="~assets/imgs/icons/rewart__cover.svg"
            alt="arrow"
          >
        </div>
      </div>
    </div>
    <div class="wallet__item history">
      <div class="head">
        <div class="head__title">
          {{ $t('wallet.history') }}
        </div>
        <div
          v-if="getTransactionList.length !== 0"
          class="pag"
        >
          <button
            class="pag__btn pag__btn_l"
            @click="prevPage"
          >
            <img
              src="~assets/imgs/icons/arrow_dd.svg"
              alt="arrow"
            >
          </button>
          <div class="pag__items">
            <input
              v-model.number="page"
              class="pag__input"
              type="number"
              :max="totalPages"
              @blur="validatePage"
            >
            <div class="pag__of">
              of
            </div>
            <div class="pag__total">
              {{ totalPages }}
            </div>
          </div>
          <button
            class="pag__btn pag__btn_r"
            @click="nextPage"
          >
            <img
              src="~assets/imgs/icons/arrow_dd.svg"
              alt="arrow"
            >
          </button>
        </div>
        <!--        <div class="head__right">-->
        <!--          <div class="dd">-->
        <!--            <div class="dd__toggler">-->
        <!--              All action-->
        <!--            </div>-->
        <!--            <div class="dd__arrow">-->
        <!--              <img-->
        <!--                src="~assets/imgs/icons/arrow_default.svg"-->
        <!--                alt="arrow"-->
        <!--              >-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="head__picker">-->
        <!--            <date-picker-->
        <!--              v-model="time3"-->
        <!--              class="custom-date-picker"-->
        <!--              :popup-class="'custom-date-picker'"-->
        <!--              range-->
        <!--              :format="'DD.MM.YY'"-->
        <!--              :range-separator="' - '"-->
        <!--            >-->
        <!--              <template v-slot:icon-calendar>-->
        <!--                <img-->
        <!--                  src="~assets/imgs/icons/calendar.svg"-->
        <!--                  alt="info"-->
        <!--                >-->
        <!--              </template>-->
        <!--            </date-picker>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <!--      {{ getTransactionList }}-->
      <div
        v-if="getTransactionList.length !== 0"
        class="table"
      >
        <div class="table__head">
          <div class="table__item">
            {{ $t('wallet.date') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.amount') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.cfid') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.EOShash') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.status') }}
          </div>
          <div class="table__item" />
        </div>
        <div class="table__body">
          <div
            v-for="(item, i) in getTransactionList"
            :key="`row_${i}`"
            class="table__row"
          >
            <div class="table__item">
              <div>{{ formatDate(item.createdAt)[0] }}</div>
              <div class="vtext__grey">
                {{ $t('wallet.at') }} {{ formatDate(item.createdAt)[1] }}
              </div>
            </div>
            <div class="table__item">
              <div
                v-if="item.type === 1"
                class="vtext__red"
              >
                -
                {{ item.amount }}
                {{ item.currencyId.toUpperCase() }}
              </div>
              <div
                v-else-if="item.type === 0"
                class="vtext__green"
              >
                +
                {{ item.amount }}
                {{ item.currencyId.toUpperCase() }}
              </div>
            </div>
            <div class="table__item">
              <div class="vtext__grey">
                {{ $t('wallet.cfid') }}
              </div>
              <div
                v-if="item.id"
                class="table__address"
              >
                <div>
                  {{ cutString(item.id) }}
                </div>
                <button

                  class="table__copy"
                  @click="copy(item.id)"
                >
                  <img
                    src="~assets/imgs/icons/copy.svg"
                    alt="close"
                  >
                </button>
              </div>
              <div
                v-else
                class="table__address"
              >
                -
              </div>
            </div>
            <div class="table__item">
              <div class="vtext__grey">
                {{ $t('wallet.EOShash') }}
              </div>
              <div
                v-if="item.meta.tx_id"
                class="table__address"
              >
                <div>
                  {{ cutString(item.meta.tx_id) }}
                </div>
                <button

                  class="table__copy"
                  @click="copy(item.meta.tx_id)"
                >
                  <img
                    src="~assets/imgs/icons/copy.svg"
                    alt="close"
                  >
                </button>
              </div>
              <div
                v-else
                class="table__address"
              >
                -
              </div>
            </div>
            <div class="table__item">
              <div
                v-if="item.status === 0"
                class="vtext__red"
              >
                {{ $t('wallet.statusFailed') }}
              </div>
              <div
                v-if="item.status === 1"
              >
                {{ $t('wallet.statusPending') }}
              </div>
              <div
                v-if="item.status === 2"
                class="vtext__green"
              >
                {{ $t('wallet.statusSuccess') }}
              </div>
            </div>
            <div class="table__item">
              <button
                v-if="item.meta.tx_id"
                class="table__btn"
                @click="goTo(`${EosUrl}${item.meta.tx_id}`)"
              >
                <img
                  src="~assets/imgs/icons/arrow__transaction.svg"
                  alt="arrow"
                >
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="history__empty"
      >
        {{ $t('wallet.epmtyHistory') }}
      </div>
      <div
        class="loader__body"
        :class="{'loader__body_show': loadingTransactions}"
      >
        <Loader />
      </div>
    </div>
    <div
      class="loader__body wallet__loader"
      :class="{'loader__body_show': loadingWallet}"
    >
      <Loader />
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
