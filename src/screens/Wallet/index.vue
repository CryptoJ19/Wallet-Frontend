<template>
  <div class="wallet content__item">
    <ModalSendBalance
      :currency="modalSendCurrency"
      @sendSuccess="sendSuccess"
    />
    <ModalRecieve />
    <ModalSuccessSend />

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
                {{ $t('wallet.recieve') }}
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
                {{ $t('wallet.recieve') }}
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
    <div class="wallet__item history">
      <div class="head">
        <div class="head__title">
          {{ $t('wallet.history') }}
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
              {{ item.amount }}
              {{ item.currencyId.toUpperCase() }}
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
              <a
                v-if="item.meta.tx_id"
                target="_blank"
                :href="`https://testnet.eos.io/transaction/${item.meta.tx_id}`"
                class="table__btn"
              >
                <img
                  src="~assets/imgs/icons/arrow__transaction.svg"
                  alt="arrow"
                >
              </a>
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
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
