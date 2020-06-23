<template>
  <div class="content__item pur">
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
            Days
          </div>
          <div class="timer__title timer__title_mob">
            D
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
            Hours
          </div>
          <div class="timer__title timer__title_mob">
            H
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
            Minutes
          </div>
          <div class="timer__title timer__title_mob">
            M
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
            Seconds
          </div>
          <div class="timer__title timer__title_mob">
            S
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
          ICO Progress
        </div>
      </div>
      <div class="line">
        <div class="line__container">
          <div class="line__filler" />
          <div class="line__points">
            <div class="line__point line__point_active">
              <div class="line__border">
                <div class="line__nucleus">
                  <div class="line__num">
                    1
                  </div>
                </div>
              </div>
            </div>
            <div class="line__point">
              <div class="line__border">
                <div class="line__nucleus">
                  <div class="line__num">
                    2
                  </div>
                </div>
              </div>
            </div>
            <div class="line__point">
              <div class="line__border">
                <div class="line__nucleus">
                  <div class="line__num">
                    3
                  </div>
                </div>
              </div>
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
        Specify a number
      </div>
      <div class="pay__subtitle">
        Choose a payment method
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
              EOS
            </button>
            <button
              class="tab__item"
              @click="setPayTab(1)"
            >
              Stripe
            </button>
          </div>
        </div>
      </div>
      <div class="pay__subtitle">
        Amount
      </div>
      <div class="pay__amount">
        <input
          maxlength="40"
          :placeholder="'Amount'"
          type="text"
        >
      </div>
      <div class="pay__subtitle">
        Total sum
      </div>
      <div class="pay__sum">
        1.000 €
      </div>
      <div class="pay__btns">
        <button class="pay__btn">
          Confirm
        </button>
      </div>
    </div>
    <div class="steps">
      <div class="steps__title">
        Steps
      </div>
      <div class="steps__items">
        <div class="step">
          <div class="step__item">
            <div class="step__title">
              1 Round
            </div>
            <div class="step__sub">
              January 13 - February 13
            </div>
          </div>
          <div class="step__item">
            50% extra token
          </div>
          <div class="step__item">
            released 3 months later the end of the ICO
          </div>
          <div class="step__item">
            <div class="step__title">
              $ 2.07
            </div>
            <div class="step__sub">
              For token
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step__item">
            <div class="step__title">
              1 Round
            </div>
            <div class="step__sub">
              January 13 - February 13
            </div>
          </div>
          <div class="step__item">
            50% extra token
          </div>
          <div class="step__item">
            released 3 months later the end of the ICO
          </div>
          <div class="step__item">
            <div class="step__title">
              $ 2.07
            </div>
            <div class="step__sub">
              For token
            </div>
          </div>
        </div>
        <div class="step step_active">
          <div class="step__item">
            <div class="step__title">
              1 Round
            </div>
            <div class="step__sub">
              January 13 - February 13
            </div>
          </div>
          <div class="step__item">
            50% extra token
          </div>
          <div class="step__item">
            released 3 months later the end of the ICO
          </div>
          <div class="step__item">
            <div class="step__title">
              $ 2.07
            </div>
            <div class="step__sub">
              For token
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js" />
<style lang="scss" scoped src="./style.scss" />
