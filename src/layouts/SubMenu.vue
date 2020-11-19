<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon :type="menuInfo.icon"></a-icon>
      <span>{{ menuInfo.title }}</span></span
    >
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">{{
        item.title
      }}</a-menu-item>
      <Sub-menu v-else :key="item.key" :menuInfo="item"></Sub-menu>
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
export default {
  name: "SubMenu",
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style></style>
