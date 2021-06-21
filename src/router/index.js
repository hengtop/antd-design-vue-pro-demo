import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";//设置跳转动画
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";//引入外部函数
import { notification } from "ant-design-vue";//导入警告框提示
import { check, isLogin } from "@/utils/auth"
Vue.use(VueRouter);

const Login = () => import(/* webpackChunkName: "user" */ "@/views/user/Login");
const Register = () => import(/* webpackChunkName: "user" */ "@/views/user/Register");
const UserLayout = () => import(/* webpackChunkName: "layout" */ "@/layout/UserLayout");
const BasicLayout = () => import(/* webpackChunkName: "layout" */ "@/layout/BasicLayout");
const Analysis = () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/Analysis");
const BasicForm = () => import(/* webpackChunkName: "form" */ "@/views/form/BasicForm");
const StepFormIndex = () => import(/* webpackChunkName: "form" */ "@/views/form/stepForm");
const StepFormIndex1 = () => import(/* webpackChunkName: "form" */ "@/views/form/stepForm/Step1");
const StepFormIndex2 = () => import(/* webpackChunkName: "form" */ "@/views/form/stepForm/Step2");
const StepFormIndex3 = () => import(/* webpackChunkName: "form" */ "@/views/form/stepForm/Step3");
const NotFound = () => import("@/views/404");
const Forbidden = () => import("@/views/403")
//const RenderRouterView = () => import("@/components/RenderRouterView");
const routes = [
  {
    path: "/user",
    hideInMenu: true,//设置标志位哪些该渲染在菜单栏中
    component: UserLayout,
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: "/user/login",
        name: "login",
        component: Login,
      },
      {
        path: "/user/register",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: BasicLayout,
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: 'dashboard', title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: Analysis,
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: { icon: 'form', title: "表单", authority: ['admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicForm",
            meta: { title: "基础表单" },
            component: BasicForm
          },
          {
            path: "/form/step-form",
            name: 'stepForm',
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: StepFormIndex,
            children: [
              {
                path: '/form/step-form',
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                meta:{title:'step1'},
                component: StepFormIndex1
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                meta:{title:'step2'},
                component: StepFormIndex2
              },
              {
                path: "/form/step-form/result",
                name: "result",
                meta:{title:'step3'},
                component: StepFormIndex3
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "forbidden",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "notFound",
    hideInMenu: true,
    component: NotFound
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    //防止切换主题设置的时候触发跳转动画
    NProgress.start();
  }
  //找到最近路由含有authority的meta,获取权限信息
  const record = findLast(to.matched, record => record.meta.authority);
  //如果有权限但是没有对应的权限
  if (record && !check(record.meta.authority)) {
    //判断登录,防止连续跳转栈溢出
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      //提示信息
      notification.error({
        message:"403",
        description:"你没有权限访问,请联系管理员"
      })
      next({
        path: '/403'
      })
    }
    NProgress.done();
  }
  //to.matched 一个数组，包含当前路由的所有嵌套路径片段的路由记录

  next();
});
router.afterEach(() => {
  NProgress.done();
})

export default router;
