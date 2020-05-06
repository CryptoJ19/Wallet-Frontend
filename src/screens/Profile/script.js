import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'logout',
    ]),
    imagePath() {
      return require('assets/imgs/ava.png');
    },
  },
};
