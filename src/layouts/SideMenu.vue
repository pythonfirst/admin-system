<template>
  <div>
    <a-menu
      style="width: 256px"
      :default-selected-keys="['2']"
      :open-keys.sync="openKeys"
      mode="inline"
      @click="handleClick"
      :theme="navTheme"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.key">{{
          item.title
        }}</a-menu-item>
        <Sub-menu v-else :key="item.key" :menuInfo="item"></Sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import SubMenu from "./SubMenu";
export default {
  components: {
    SubMenu
  },
  data() {
    this.menuList = this.generateMenuList(this.$router.options.routes);
    return {
      current: ["mail"],
      openKeys: []
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    }
  },
  computed: {
    navTheme: function() {
      return this.$route.query.navTheme || "dark";
    }
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
      let path = e.keyPath.reverse().join("/");
      this.$router
        .push({ path: path, query: { ...this.$route.query } })
        .catch(err => err);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    generateMenuList(route) {
      let copyRoutes = [...route];
      let list = [];
      copyRoutes.forEach(item => {
        if (!item.hiddenInMenu) {
          if (item.children && !item.hiddenChildrenMenu) {
            if (item.name) {
              list.push({
                key: item.path,
                title: item.meta.title,
                icon: item.meta.icon,
                children: this.generateMenuList(item.children)
              });
            } else {
              list = this.generateMenuList(item.children); // 这里容易犯错误，写成了 this.this.generateMenuList(item.children)
            }
          } else {
            if (item.name) {
              list.push({ key: item.path, title: item.meta.title });
            }
          }
        }
      });
      return list;
    }
  }
};
</script>
