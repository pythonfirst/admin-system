import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash";
import Vue from "vue";
import { Notification } from "ant-design-vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound";
import Forbidden from "../views/Forbidden";
import { check, isLogin } from "../utils/auth";
Vue.use(VueRouter);

/**
 * 如需设置权限，需要在meta.role设置
 * 如不需要设置权限，需删除role字段
 * role字段不能为[](空Array)
 */
const routes = [
  {
    path: "/user",
    hiddenInMenu: true, // 标志是否渲染在sideMenu
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/User/index"),
    children: [
      {
        path: "/user",
        redirect: { name: "login" }
      },
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: 'user' */ "../views/User/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: 'user' */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: 'BasicLayout' */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard", // 有name字段的渲染为一级菜单
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "analysis",
            name: "analysis",
            meta: { icon: "", title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: 'dashboard' */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: { name: "basicform" }
          },
          {
            path: "basic-form",
            meta: { icon: "", title: "基础表单", role: ["user", "admin"] },
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: 'form' */ "../views/Form/BasicForm")
          },
          {
            path: "step-form",
            name: "stepform",
            meta: { icon: "", title: "分步表单" },
            hiddenChildrenMenu: true,
            redirect: { name: "info" },
            component: { render: h => h("router-view") },
            children: [
              {
                path: "info",
                name: "info",
                meta: { icon: "", title: "表单信息" },
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ "../views/Form/StepForm/Info"
                  )
              },
              {
                path: "confirm",
                name: "confirm",
                meta: { icon: "", title: "表单确认" },
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ "../views/Form/StepForm/Confirm"
                  )
              },
              {
                path: "result",
                name: "result",
                meta: { icon: "", title: "表单结果" },
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ "../views/Form/StepForm/Result"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    hiddenInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    hiddenInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  const record = findLast.findLast(to.matched, record => record.meta.role);
  if (record && !check(record.meta.role)) {
    if (!isLogin() && to.path !== "/user/login") {
      // 防止栈溢出
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      Notification.open({
        type: "error",
        message: "系统提醒",
        description: "您没有权限访问此页面，请联系管理员咨询。",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
