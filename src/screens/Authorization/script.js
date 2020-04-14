export default {
  data: () => ({
    mode: 1,
    test: false,
  }),
  computed: {
    authBtnClass: ({ mode }) => ([
      { menu__item_active: (mode === 0) },
      { menu__item_active: (mode === 1) },
      { forgot_active: (mode === 2) },
    ]),
    authFormClass: ({ mode }) => ([
      { form_active: (mode === 0) },
      { form_active: (mode === 1) },
      { form_active: (mode === 2) },
    ]),
  },
  methods: {
    setMode(i) {
      this.mode = i;
    },
  },
};
