import Vue from 'vue';
import { config } from '../config';

Vue.mixin({
  computed: {
    Config() {
      return config;
    },
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
