import Vue from 'vue';

Vue.mixin({
  computed: {
    BaseUrl() {
      return process.env.BASE_URL;
    },
  },
});
