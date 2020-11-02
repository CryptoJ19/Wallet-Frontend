<template>
  <div class="land">
    <Menu :mode="'nav-off'" />
    <div class="member">
      <div class="member__bg">
        <img
          src="~assets/imgs/member__bg.svg"
          alt="bg"
        >
      </div>
      <div class="member__content land__container">
        <div class="member__nav">
          nav
        </div>
        <div class="member__item">
          <div class="member__cloud">
            qwe
          </div>
        </div>
        <div class="member__item">
          <div class="member__main">
            <div class="member__header">
              <div class="member__name">
                Andrea Cerato
              </div>
              <div class="member__role">
                CashFlash General Manager
              </div>
            </div>
            <div class="member__bottom">
              <div class="member__title">
                Language
              </div>
              <div class="member__language language">
                <div class="language__items">
                  <div class="language__item">
                    <div class="language__icon">
                      <img
                        src="~assets/imgs/flags/eng.svg"
                        alt="flag"
                      >
                    </div>
                    <div class="language__name">
                      Italian
                    </div>
                    <div class="language__point">
                      p
                    </div>
                    <div class="language__line line">
                      .line__filler
                    </div>
                    <div class="language__value">
                      v
                    </div>
                  </div>
                  <div class="language__item">
                    <div class="language__icon">
                      <img
                        src="~assets/imgs/flags/eng.svg"
                        alt="flag"
                      >
                    </div>
                    <div class="language__name">
                      Italian
                    </div>
                    <div class="language__point">
                      p
                    </div>
                    <div class="language__line line">
                      .line__filler
                    </div>
                    <div class="language__value">
                      v
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script src="./script.js" />
<style lang="scss" src="./style.scss" />
