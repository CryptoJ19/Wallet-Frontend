import Menu from '../Landing/blocks/Menu';
import Footer from '../Landing/blocks/Footer';

export default {
  components: {
    Menu,
    Footer,
  },
  props: {
    person: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getFlagImg(language) {
      try {
        return require(`assets/imgs/flags/${language}.svg`);
      } catch {
        return '';
      }
    },
    imagePath(name) {
      return require(`assets/imgs/members/${name}.jpg`);
    },
  },
};
