<template>
  <div>
    <a-menu
      :default-selected-keys="['2']"
      :selectedKeys="selectedKeys"
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
import { check } from "../utils/auth";
export default {
  components: {
    SubMenu
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: ["mail"],
      openKeys: [],
      menuList: [],
      selectedKeys: [],
      selectedKeysMap: {},
      openKeysMap: {}
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
    selectedKeys(val) {
      console.log("selectedKeys", val);
    },
    "$route.path": function(val) {
      // console.log("path", this.$route.path, val);
      this.selectedKeys = [this.selectedKeysMap[val]];
    },
    isCollapsed(val) {
      if (val) {
        this.openKeys = [];
        this.selectedKeys = [];
      } else {
        this.selectedKeys = [this.selectedKeysMap[this.$route.path]];
        this.openKeys = this.openKeysMap[this.$route.path];
      }
    }
  },
  computed: {
    navTheme: function() {
      return this.$route.query.navTheme || "dark";
    }
  },
  created() {
    this.menuList = this.generateMenuList(this.$router.options.routes);
    this.selectedKeys = [this.selectedKeysMap[this.$route.path]]; // 默认选中菜单
    this.openKeys = this.openKeysMap[this.$route.path];
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
      this.selectedKeys = [e.key];
      let path = e.keyPath.reverse().join("/");
      this.$router
        .push({ path: path, query: { ...this.$route.query } })
        .catch(err => err);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },

    /**
     * 动态生成sidemenu需要考虑
     * parentPath parentItem 同时生成selectedKayMap
     * openKeys 同时生成openKeysMap
     * hidden参数 是否是隐藏的menu
     * 验证当前用户是否有访问
     */
    generateMenuList(
      route,
      parentPath = "", // 生成路由
      hidden = false,
      parentItem = "",
      openKeys = []
    ) {
      let copyRoutes = [...route];
      let list = [];
      // let path = parentPath;
      copyRoutes.forEach(item => {
        let paths = parentPath; // 这一步搞了半天，是真的半天（4个小时）
        let openKeysArray = [...openKeys]; // 这个引用类型和path的基本类型要区别开，也是吃了亏的。
        // exclude hidden memus
        if (!item.hiddenInMenu) {
          // subMenu
          // 权限管理
          if (
            (item.meta && item.meta.role && check(item.meta.role)) ||
            !item.meta ||
            item.meta.rol === [] ||
            !item.meta.role
          ) {
            if (item.children && !item.hiddenChildrenMenu) {
              if (item.name) {
                openKeysArray.push(item.path);
                paths =
                  item.path[0] === "/"
                    ? `${paths}${item.path}`
                    : `${paths}/${item.path}`;
                list.push({
                  key: item.path,
                  title: item.meta.title,
                  icon: item.meta.icon,
                  children: this.generateMenuList(
                    item.children,
                    paths,
                    hidden,
                    parentItem,
                    openKeysArray
                  )
                });
              } else {
                list = this.generateMenuList(
                  item.children,
                  "",
                  hidden,
                  parentItem
                ); // 这里容易犯错误，写成了 this.this.generateMenuList(item.children)
              }
              // menu-item
            } else {
              if (item.name) {
                paths = `${paths}/${item.path}`;
                this.openKeysMap[paths] = openKeysArray;

                if (!hidden) {
                  this.selectedKeysMap[paths] = item.path;
                } else {
                  this.selectedKeysMap[paths] = parentItem;
                }

                list.push({ key: item.path, title: item.meta.title });
                // 处理隐藏children的key map
                if (item.children && item.hiddenChildrenMenu) {
                  this.generateMenuList(
                    item.children,
                    (parentPath = paths),
                    true,
                    item.path,
                    openKeys
                  );
                }
              }
            }
          }
        }
      });
      return list;
    }
  }
};
</script>
