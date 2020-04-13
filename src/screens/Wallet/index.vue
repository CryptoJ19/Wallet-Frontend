<template>
  <div class="wallet">
    <div class="wallet__item balance">
      <div class="title">
        Balance
      </div>
      <div>
        <div class="mainnum">
          EOS 3.44
        </div>
        <div class="subnum">
          $ 123.234
        </div>
        <div class="bottom">
          <div class="balance__link">
            <a href="/">
              open in block explorer
            </a>
          </div>
          <div class="btns">
            <button class="btn">
              <img
                src="~assets/imgs/icons/refrash.svg"
                alt="arrow"
              >
            </button>
            <button class="btn">
              <div>
                Send
              </div>
              <div class="icon">
                <img
                  src="~assets/imgs/icons/arrow_a.svg"
                  alt="arrow"
                >
              </div>
            </button>
            <button class="btn">
              <div>
                Recieve
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
        Balance
      </div>
      <div>
        <div class="mainnum">
          2
        </div>
        <div class="subnum">
          $ 123.234
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
            <button class="btn">
              <div>
                Send
              </div>
              <div class="icon">
                <img
                  src="~assets/imgs/icons/arrow_a.svg"
                  alt="arrow"
                >
              </div>
            </button>
            <button class="btn">
              <div>
                Recieve
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
        <div class="head__right">
          <div class="dd">
            <div class="dd__toggler">
              All action
            </div>
            <div class="dd__arrow">
              <img
                src="~assets/imgs/icons/arrow_default.svg"
                alt="arrow"
              >
            </div>
          </div>
          <div class="head__picker">
            <date-picker
              v-model="time3"
              class="custom-date-picker"
              :popup-class="'custom-date-picker'"
              range
              :format="'DD.MM.YY'"
              :range-separator="' - '"
            >
              <template v-slot:icon-calendar>
                <img
                  src="~assets/imgs/icons/calendar.svg"
                  alt="info"
                >
              </template>
            </date-picker>
          </div>
        </div>
      </div>
      <div class="table">
        <div class="table__head">
          <div class="table__item">
            Amount
          </div>
          <div class="table__item">
            Date
          </div>
          <div class="table__item">
            Status
          </div>
        </div>
        <div class="table__body">
          <div
            v-for="item in 4"
            :key="`row_${item}`"
            class="table__row"
          >
            <div class="table__item">
              Lorem ipsum
            </div>
            <div class="table__item">
              Lorem ipsum
            </div>
            <div class="table__item">
              Lorem ipsum
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,

    };
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
