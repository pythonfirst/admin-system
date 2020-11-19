import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound";
Vue.use(VueRouter);

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
            meta: { icon: "", title: "基础表单" },
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: 'form' */ "../views/Form/BasicForm")
          },
          {
            path: "step-form",
            name: "stepform",
            meta: { icon: "", title: "分步表单" },
            hiddenChildrenMenu: false,
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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
