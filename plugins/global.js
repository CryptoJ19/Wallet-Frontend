import Vue from 'vue';

Vue.mixin({
  computed: {
    BaseUrl() {
      return process.env.BASE_URL;
    },
    EosUrl() {
      return process.env.EOS_URL;
    },
    LocalHostUrl() {
      if (!process.server) {
        return `${window.location.host}`;
      }
      return '';
    },
  },
  methods: {
    NumberWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
});
