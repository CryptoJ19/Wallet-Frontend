<template>
  <div class="land__container">
    <div class="header">
      <div class="header__left">
        <div class="start">
          <div class="start__bg">
            <img
              src="~assets/imgs/Landing/lighting.svg"
              alt="img"
            >
          </div>
          <div class="start__title">
            Start pre ICO
          </div>
          <div class="counter">
            <div class="counter__item">
              <div class="counter__num">
                38
              </div>
              <div class="counter__label">
                Days
              </div>
            </div>
            <div class="counter__colon">
              :
            </div>
            <div class="counter__item">
              <div class="counter__num">
                17
              </div>
              <div class="counter__label">
                Hours
              </div>
            </div>
            <div class="counter__colon">
              :
            </div>
            <div class="counter__item">
              <div class="counter__num">
                38
              </div>
              <div class="counter__label">
                Minutes
              </div>
            </div>
            <div class="counter__colon">
              :
            </div>
            <div class="counter__item">
              <div class="counter__num">
                38
              </div>
              <div class="counter__label">
                Seconds
              </div>
            </div>
          </div>
          <div class="pdf">
            <div class="pdf__item">
              <div class="pdf__title">
                Whitepaper
              </div>
              <div class="pdf__icon">
                <img
                  src="~assets/imgs/Landing/pdf.svg"
                  alt="pdf"
                >
              </div>
            </div>
            <div class="pdf__item">
              <div class="pdf__title">
                Contract
              </div>
              <div class="pdf__icon">
                <img
                  src="~assets/imgs/Landing/pdf.svg"
                  alt="pdf"
                >
              </div>
            </div>
            <div class="pdf__item">
              <div class="pdf__title">
                K.Y.C
              </div>
              <div class="pdf__icon">
                <img
                  src="~assets/imgs/Landing/pdf.svg"
                  alt="pdf"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="prog">
          <div class="prog__line">
            <div class="prog__filling" />
          </div>
          <div class="prog__points">
            <div class="prog__point">
              <div class="prog__notch" />
              <div class="prog__text">
                Soft Cap (350 Millions €)
              </div>
            </div>
            <div class="prog__point">
              <div class="prog__notch" />
              <div class="prog__text">
                (1 Billion €)
              </div>
            </div>
            <div class="prog__point">
              <div class="prog__notch" />
              <div class="prog__text">
                Hard Cap (4 Billions €)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header__right">
        <div class="cards">
          <div class="cards__items">
            <div class="cards__item cards__item_a">
              <div class="cards__left">
                <div class="cards__title">
                  1st round
                </div>
                <div class="cards__sub">
                  January 13 - February 13
                </div>
                <div class="cards__extra">
                  50% extra token
                </div>
                <div class="cards__epitaph">
                  issued 3 months after the end of the ICO
                </div>
              </div>
              <div class="cards__right">
                <div class="cards__sub">
                  For token
                </div>
                <div class="cards__cost">
                  € 3,00
                </div>
              </div>
            </div>
            <div class="cards__line cards__line_a" />
            <div class="cards__item cards__item_b">
              <div class="cards__left">
                <div class="cards__title">
                  1st round
                </div>
                <div class="cards__sub">
                  January 13 - February 13
                </div>
                <div class="cards__extra">
                  50% extra token
                </div>
                <div class="cards__epitaph">
                  issued 3 months after the end of the ICO
                </div>
              </div>
              <div class="cards__right">
                <div class="cards__sub">
                  For token
                </div>
                <div class="cards__cost">
                  € 3,00
                </div>
              </div>
            </div>
            <div class="cards__line cards__line_b" />
            <div class="cards__item cards__item_c">
              <div class="cards__left">
                <div class="cards__title">
                  1st round
                </div>
                <div class="cards__sub">
                  January 13 - February 13
                </div>
                <div class="cards__extra">
                  50% extra token
                </div>
                <div class="cards__epitaph">
                  issued 3 months after the end of the ICO
                </div>
              </div>
              <div class="cards__right">
                <div class="cards__sub">
                  For token
                </div>
                <div class="cards__cost">
                  € 3,00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .land {
    .header {
      display: flex;
      justify-content: space-between;
      margin: 160px 0 220px;
      &__left {
        width: 50%;
      }
      &__right {
        width: 50%;
        padding: 0 0 0 150px;
      }
      .start {
        position: relative;
        margin: 0 0 150px;
        &__title {
          position: relative;
          font-size: 120px;
          font-weight: 900;
          color: #000000;
          margin: 0 0 50px;
        }
        &__bg {
          border-radius: 0 0 60px 0;
          right: -100px;
          bottom: -70px;
          width: 300%;
          height: 300%;
          position: absolute;
          background: linear-gradient(127.84deg, #F9F9F9 6.94%, #F4F4F4 87.01%);
          overflow: hidden;
          img {
            position: absolute;
            bottom: -1120px;
            right: -276px;
          }
        }
        .counter {
          position: relative;
          margin: 0 0 40px;
          display: flex;
          align-items: center;
          &__item {
            display: flex;
          }
          &__num {
            font-weight: 300;
            font-size: 120px;
            color: $grey;
            font-family: Gilroy;
            font-weight: 300;
          }
          &__label {
            font-weight: 300;
            font-size: 20px;
            line-height: 143.4%;
            text-align: center;
            color: rgba($grey, 0.5);
          }
          &__colon {
            font-family: Gilroy;
            font-weight: 300;
            color: rgba($grey, 0.5);
            font-size: 60px;
            line-height: 143.4%;
            margin: 0 15px;
          }
        }
        .pdf {
          position: relative;
          display: flex;
          justify-content: space-between;
          &__item {
            max-width: 260px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            background: #FFF;
            border-radius: 20px;
            padding: 20px 35px;
            align-items: center;
          }
          &__title {
            font-weight: bold;
            color: $grey;
            line-height: 30px;
          }
          &__icon {}
        }
      }
      .prog {
        width: 100%;
        &__line {
          width: 100%;
          height: 24px;
          background: #F7F6F4;
          border-radius: 15px;
          padding: 0 5px;
          display: flex;
          align-items: center;
        }
        &__filling {
          border-radius: 10px;
          background: $yellow;
          height: 14px;
          width: 20%;
        }
        &__points {
          top: -5px;
          position: relative;
          display: flex;
          justify-content: center;
        }
        &__point {
          width: 25%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        &__notch {
          width: 1px;
          height: 19px;
          background: $grey;
        }
        &__text {
          font-weight: 500;
          font-size: 16px;
          color: $grey;
        }
      }
      .cards {
        &__items {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        &__item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 20px;
          padding: 20px 36px;
          max-width: 625px;
          &_a {
            border: 3px solid $yellow;
          }
          &_b {
            background: $yellow;
            border: 3px solid $grey;
          }
          &_c {
            border: 3px solid $stroke;
          }
        }
        &__line {
          //position: absolute;
          //bottom: 0;
          width: 1px;
          height: 60px;
          &_a {
            background: $yellow;
          }
          &_b {
            background: #F5F3F3;
          }
        }
        &__title {
          font-weight: bold;
          font-size: 30px;
          color: #000000;
        }
        &__sub {
          color: rgba(#54595F, 0.7);
          font-size: 16px;
        }
        &__extra {
          font-weight: 600;
          font-size: 18px;
          color: #000000;
          margin: 0 0 10px;
        }
        &__epitaph {
          color: $grey;
          font-weight: normal;
          font-size: 18px;
          max-width: 330px;
        }
        &__cost {
          font-weight: 800;
          font-size: 60px;
          color: #000000;
          white-space: nowrap;
        }
        &__left {
          margin: 0 20px 0 0;
          .cards__sub {
            margin: 0 0 20px;
          }
        }
        &__right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      }
    }
    @media (max-width: 1700px) {
      .header {
        margin: 100px 0 150px;
        .cards {
          &__item {
            padding: 16px 30px;
          }
          &__cost {
            font-size: 40px;
          }
          &__title {
            font-size: 26px;
          }
          &__sub, &__extra {
            font-size: 14px;
          }
          &__epitaph {
            font-size: 16px;
            max-width: 280px;
          }
          &__line {
            height: 40px;
          }
        }
        .prog {
          &__text {
            font-size: 14px;
          }
        }
        .start {
          //padding: 20px 0;
          padding: 0 0 40px;
          &__title {
            font-size: 80px;
          }
          .counter {
            &__num {
              font-size: 80px;
            }
            &__label {
              font-size: 18px;
            }
          }
          .pdf {
            &__item {
              padding: 16px 20px;
              max-width: 186px;
            }
          }
        }
      }
    }
    @media (max-width: 1400px) {
      .header {
        .prog {
          &__text {
            font-size: 12px;
          }
        }
        .start {
          padding: 0 0 60px;
          &__title {
            font-size: 70px;
          }
          .counter {
            &__num {
              font-size: 70px;
            }
            &__label {
              font-size: 16px;
            }
          }
          .pdf {
            &__item {
              padding: 14px 16px;
              max-width: 160px;
              img {
                max-width: 20px;
              }
            }
          }
        }
      }
    }
    @media (max-width: 1199px) {
      .header {
        margin: 140px 0 100px;
        flex-direction: column;
        align-items: start;
        &__left, &__right {
          width: 100%;
        }
        &__right {
          padding: 0;
        }
        .prog {
          margin: 0 0 40px;
        }
        .start {
          padding: 0;
          &__bg {
            right: -200px;
            bottom: -70px;
            border-radius: 0;
          }
          &__title {
            text-align: center;
          }
          .counter {
            justify-content: center;
            &__item {
              flex-direction: column-reverse;
            }
          }
          .pdf {
            justify-content: center;
            &__item:not(:last-child) {
              margin: 0 30px 0 0;
            }
          }
        }
      }
    }
    @media (max-width: 991px) {

    }
    @media (max-width: 767px) {
      .header {
        margin-bottom: 80px;
        .prog {
          position: relative;
          display: flex;
          justify-content: center;
          &__line {
            width: 24px;
            height: 350px;
            padding: 5px;
            align-items: flex-start;
            justify-content: center;
          }
          &__point {
            flex-direction: row;
            align-items: center;
            height: 25%;
            width: 100%;
          }
          &__text {
            font-size: 16px;
          }
          &__notch {
            width: 19px;
            height: 1px;
            margin: 0 25px 0 0;
          }
          &__filling {
            height: 20%;
            width: 100%;
          }
          &__points {
            margin: 0 0 0 18px;
            //height: 100%;
            width: initial;
            flex-direction: column;
            //position: absolute;
            //top: 0;
            //left: 0;
          }
        }
      }
    }
    @media (max-width: 575px) {
      .header {
        .cards {
          text-align: center;
          &__item {
            padding: 13px;
          }
          &__cost {
            font-size: 50px;
          }
          &__title {
            font-size: 26px;
          }
          &__sub {
            font-size: 16px;
          }
          &__extra {
            font-size: 18px;
          }
          &__epitaph {
            font-size: 18px;
          }
          &__item {
            flex-direction: column;
          }
          &__right {
            align-items: center;
          }
          &__left {
            margin: 0 0 13px;
          }
        }
        .start {
          margin: 0 0 100px;
          &__title {
            font-weight: 900;
            font-size: 48px;
            margin: 0 0 7px;
          }
          .counter {
            margin: 0 0 30px;
            &__num {
              font-size: 55px;
            }
            &__label {
              font-size: 16px;
            }
          }
          .pdf {
            flex-direction: column;
            align-items: center;
            &__item {
              padding: 23px 35px;
              max-width: 260px;
              &:not(:last-child) {
                margin: 0 0 17px;
              }
            }
          }
        }
      }
    }
    @media (max-width: 480px) {
      .header {
        .start {
          &__title {
            font-size: 35px;
          }
          .counter {
            &__num {
              font-size: 40px;
            }
            &__label {
              font-size: 12px;
            }
            &__colon {
              font-size: 40px;
              margin: 0 10px;
            }
          }
          .pdf {
            &__item {
              padding: 16px 26px;
            }
          }
        }
      }
    }
  }
</style>
