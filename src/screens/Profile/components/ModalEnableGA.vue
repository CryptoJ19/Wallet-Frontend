<template>
  <b-modal
    id="modal-enable-ga"
    centered
    hide-header
    hide-footer
  >
    <div class="mod ega">
      <div class="ega__body">
        <div class="ega__main">
          <div class="mod__head">
            <div class="mod__title">
              Enable 2FA
            </div>
            <button
              class="mod__closs"
              @click="closeCheckEmail()"
            >
              <img
                src="~assets/imgs/icons/cross.svg"
                alt="close"
              >
            </button>
          </div>
          <div class="steps">
            <div class="steps__line" />
            <div class="steps__item steps__item_active">
              <div class="steps__num">
                1
              </div>
              <div class="steps__text">
                Install mobile app
              </div>
            </div>
            <div class="steps__item">
              <div class="steps__num">
                2
              </div>
              <div class="steps__text">
                Scan QR code
              </div>
            </div>
            <div class="steps__item">
              <div class="steps__num">
                3
              </div>
              <div class="steps__text">
                Backup key
              </div>
            </div>
            <div class="steps__item">
              <div class="steps__num">
                4
              </div>
              <div class="steps__text">
                Enable Google Authenticator
              </div>
            </div>
          </div>
          <div>
            <!--            qwe-->
          </div>
        </div>
        <div class="ega__bottom">
          <button class="btn">
            Back
          </button>
          <button class="btn">
            Next
          </button>
        </div>
      </div>
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loader}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import Loader from '../../../ui/Loader';

export default {
  components: {
    Loader,
  },
  props: {
    loader: Boolean,
  },
  data: () => ({
  }),
  methods: {
    closeCheckEmail() {
      this.$bvModal.hide('modal-change-pass');
    },
  },
};
</script>
<style lang="scss">
  #modal-enable-ga {
    .modal-dialog {
      max-width: 895px;
    }
    .modal-content {
    }

    .ega {
      padding: 30px;
      margin: 0;
      height: 600px;

      &__body {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }


      .steps {
        align-items: center;
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        &__line {
          position: absolute;
          height: 1px;
          left: 0;
          right: 0;
          background: $stroke;
        }
        &__num {
          transition: .35s;
          width: 24px;
          height: 24px;
          border-radius: 100px;
          background: #fff;
          display: flex;
          font-weight: bold;
          align-items: center;
          margin: 0 10px 0 0;
          justify-content: center;
        }
        &__text {
          transition: .35s;
          color: #000000;
          font-size: 14px;
          opacity: 0.4;
        }
        &__item {
          position: relative;
          background: #FFF;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border: 1px solid $stroke;
          border-radius: 13px;
          &.steps__item_active {
            background: $yellow-gradient;
            border-color: #fff;
            .steps__num {
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .steps__text {
              opacity: 1;
            }
          }
        }
      }

      &__bottom {
        display: flex;
        justify-content: space-between;
        .btn:first-child {
          @include btn_out;
        }
        .btn:last-child {
          @include btn-yellow;
        }
      }


    }
  }
</style>
