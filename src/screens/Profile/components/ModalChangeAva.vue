<template>
  <b-modal
    id="modal-change-ava"
    centered
    hide-header
    hide-footer
    @hidden="resetModal()"
  >
    <div class="mod">
      <div class="mod__head">
        <div class="mod__title">
          {{ $t('profile.setAvatar') }}
        </div>
        <button
          class="mod__closs"
          @click="close()"
        >
          <img
            src="~assets/imgs/icons/cross.svg"
            alt="close"
          >
        </button>
      </div>
      <div class="mod__body">
        <div class="change__body">
          <div class="change__text">
            {{ $t('profile.avatarDesc') }}
          </div>
          <label
            class="change__label"
            for="set-avatar-input"
          >
            {{ $t('profile.uploadAva') }}
          </label>
          <div
            v-if="er.length !== 0"
            class="change__msg"
          >
            <div
              v-if="getEr(1)"
              class="vtext__red"
            >
              {{ $t('profile.sizeEr') }}
            </div>
          </div>
        </div>
        <input
          id="set-avatar-input"
          name="myFile"
          type="file"
          accept="image/*"
          @change="handleImage"
        >
      </div>
      <!--      <div class="mod__btns">-->
      <!--        <button-->
      <!--          class="mod__btn"-->
      <!--          @click="close()"-->
      <!--        >-->
      <!--          Close-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
    <div
      class="loader__body"
      :class="{'loader__body_show': loading}"
    >
      <Loader />
    </div>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex';
import Loader from '../../../ui/Loader';

export default {
  components: {
    Loader,
  },
  data: () => ({
    file: '',
    image: '',
    loading: false,
    er: [],
  }),
  methods: {
    ...mapActions([
      'logout',
      'fetchEditProfile',
      'fetchGetProfile',
    ]),
    getEr(i) {
      return this.er.indexOf(i) !== -1;
    },
    resetModal() {
      this.image = '';
      this.loading = false;
      this.er = [];
    },
    async preludeLoadImg() {
      const res = await this.fetchEditProfile({
        avatar: this.image,
      });
      this.loading = false;
      console.log(res);

      if (res.ok) {
        await this.fetchGetProfile();
        this.close();
      }
    },
    handleImage(e) {
      this.er = [];
      const fileObj = e.target.files[0];
      console.log('fileObj', fileObj.size / 1024 / 1024);


      if (e.currentTarget !== null) {
        if ((fileObj.size / 1024 / 1024) > 5) {
          this.er.push(1);
        }
        if (this.er.length === 0) {
          this.loading = true;
          this.createBase64Image(fileObj);
        }
      }
    },
    createBase64Image(fileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        this.image = e.target.result;
        this.preludeLoadImg();
      };
      reader.readAsDataURL(fileObj);
    },
    close() {
      this.$bvModal.hide('modal-change-ava');
    },
  },
};
</script>
