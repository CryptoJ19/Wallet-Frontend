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
          {{ getWallets[0] && mathCut(getWallets[0].balance) || 0 }}
        </div>
        <div class="subnum">
          $ {{ getWallets[0] && mathCut(convertEOSUSD(0)) || 0 }}
        </div>
        <div class="bottom">
          <div class="balance__link">
            <a href="/">
              {{ $t('wallet.openExplorer') }}
            </a>
          </div>
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
          TNT {{ getWallets[1] && mathCut(getWallets[1].balance) || 0 }}
        </div>
        <div class="subnum">
          $ {{ getWallets[1] && mathCut(convertEOSUSD(1)) || 0 }}
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
              @click="showSendBalance('TNT')"
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
          History
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
      <div class="table">
        <div class="table__head">
          <div class="table__item">
            {{ $t('wallet.amount') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.date') }}
          </div>
          <div class="table__item">
            {{ $t('wallet.status') }}
          </div>
        </div>
        <div class="table__body">
          <div
            v-for="item in getTransactionList"
            :key="`row_${item}`"
            class="table__row"
          >
            <div class="table__item">
              {{ item.amount }}
              {{ item.currencyId.toUpperCase() }}
            </div>
            <div class="table__item">
              {{ formatDate(item.createdAt) }}
            </div>
            <div
              v-if="item.status === 0"
              class="table__item"
            >
              {{ $t('wallet.statusFailed') }}
            </div>
            <div
              v-if="item.status === 1"
              class="table__item"
            >
              {{ $t('wallet.statusPending') }}
            </div>
            <div
              v-if="item.status === 2"
              class="table__item"
            >
              {{ $t('wallet.statusSuccess') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
