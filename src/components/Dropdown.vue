<template>
  <div class="dropdown">
    <div class="dropdown__button" @click="toggleMenu">
      <span class="dropdown__label" v-if="!selected">
        {{label}}
      </span>
      <span class="dropdown__button-value" v-else>
        {{ selected[valueField] }}
      </span>
      <span class="dropdown__button-arrow">
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20711 0.792893C8.59763 1.18342 8.59763 1.81658 8.20711 2.20711L4.5 5.91421L0.792893 2.20711C0.402368 1.81658 0.402369 1.18342 0.792893 0.792893C1.18342 0.402369 1.81658 0.402369 2.20711 0.792893L4.5 3.08579L6.79289 0.792893C7.18342 0.402369 7.81658 0.402369 8.20711 0.792893Z"
                fill="#000"
          />
        </svg>
      </span>
    </div>
    <ul
      v-show="isOpened"
      class="menu"
      v-click-outside="hideMenu">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="menu__item"
        @click="selectOption(item)"
      >{{item[valueField]}}</li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
// default output fields: key, value
export default {
  name: 'ultimate-dropdown',
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: Object,
    },
    setValue: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
    },
    passedKeyField: {
      type: String,
    },
    passedValueField: {
      type: String,
    },
  },
  data() {
    return {
      isOpened: false,
      keyField: 'key',
      valueField: 'value',
      selected: this.selected || undefined
    };
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened;
    },
    hideMenu() {
      this.isOpened = false;
    },
    selectOption(option) {
      // this.$emit('input', option);
      this.setValue(option);
      this.selected = option;
      this.hideMenu();
    },
  },
  mounted() {
    this.popupItem = this.$el;
    this.keyField = this.passedKeyField || 'key';
    this.valueField = this.passedValueField || 'value';
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  &__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFF;
    width: 100%;
    border-radius: 15px;
    font-weight: 500;
    padding: 0 20px;
    height: 44px;
    border: 1px solid #F5F3F3;
    font-size: 14px;
  }
  &__label{
    flex: 4;
    text-align: left;
    color: rgba(84, 89, 95, 0.5);
    font-size: 16px;
  }
  &__button-arrow{
    flex: 1;
    text-align: right;
    margin: 0 0 0 8px;
  }
}
.menu {
  z-index: 50;
  border-radius: 13px;
  position: absolute;
  top: calc(100% + 4px);
  background: #fff;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 15px -5px rgba(0, 0, 0, 0.15);
  padding: 7px 0;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  &__item {
    padding: 7px 20px !important;
  }
}
</style>
