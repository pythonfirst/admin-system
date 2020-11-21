import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Auth from "./directives/Auth";
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Drawer,
  Radio
} from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
