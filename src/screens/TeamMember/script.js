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
  computed: {
    languages() {
      return [
        'ITA',
        'GBR',
        'FRA',
      ];
    },
  },
  methods: {
    imagePath(name) {
      return require(`assets/imgs/members/${name}.jpg`);
    },
  },
};
