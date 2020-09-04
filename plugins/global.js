import Vue from 'vue';

Vue.mixin({
  computed: {
    BaseUrl() {
      return process.env.BASE_URL;
    },
  },
  methods: {
    NumberWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
});
