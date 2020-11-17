<template>
  <div>
    <a-layout style="min-height: 100vh">
      <a-layout-sider :trigger="null" v-model="collapsed" collapsible>
        <div class="logo" />
        <SideMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="collapsed = !collapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer class="drawer" />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  components: {
    Header,
    Footer,
    SideMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 40px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
</style>
