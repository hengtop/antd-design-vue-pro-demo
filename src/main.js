import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuei18n from "vue-i18n";
import QueryString from "query-string";
import {Button, Layout, Icon, Drawer, Radio, Menu, Form, Input, Select, Dropdown, DatePicker, ConfigProvider} from "ant-design-vue";
import enUS from './locale/enUS';
import zhCN from "./locale/zhCN";

/* 将权限组件全局注册 */
import Authorized from "@/components/Authorized";
/* 调用自定义权限指令 */
import Auth from "@/directives/auth";

//引入Vuehighlightjs
import vueHighlightJS from "vue-highlightjs";
import 'highlight.js/styles/github.css' // or other highlight.js theme
// 按需引入不用加载样式
//import "ant-design-vue/dist/antd.css";
// 注册
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(vueHighlightJS);
Vue.use(ConfigProvider);//国际化
Vue.use(Vuei18n);//vue自带组件国际化
const i18n = new Vuei18n({
  locale:QueryString.parse(location.search).locale || 'zhCN',
  messages:{
    zhCN:{message:zhCN},
    enUS:{message:enUS}
  }
})
//将权限组件全局注册
Vue.component('Authorized', Authorized);
Vue.use(Auth);//有install函数就可以这样使用

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2615196_pekgai9gwj.js', // 在 iconfont.cn 上生成
});
Vue.component('IconFont', MyIcon)

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
