import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: 'dashboard' */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: { name: "basicform" }
          },
          {
            path: "basic-form",
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: 'form' */ "../views/Form/BasicForm")
          },
          {
            path: "step-form",
            redirect: { name: "info" },
            component: { render: h => h("router-view") },
            children: [
              {
                path: "info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ "../views/Form/StepForm/Info"
                  )
              },
              {
                path: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ "../views/Form/StepForm/Confirm"
                  )
              },
              {
                path: "result",
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
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
