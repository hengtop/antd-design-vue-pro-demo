<template>
  <!-- 保存下样式 -->
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        v-model="collapsed"
        collapsible
        :trigger="null"
        width="256px"
      >
        <div class="logo">Ant Design Vue</div>
        <SiderMenu :theme="navTheme" :navCollapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header @handleSiderHide="collapsed = !collapsed" />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 传入权限,不符合就不会显示出来 -->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "@/components/settingDrawer";
export default {
  name: "",
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    //同步主题配置
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  created() {},
  mounted() {},
  methods: {},
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
};
</script>

<style lang="less" scoped>
.nav-theme-dark .logo {
  color: #fff;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
</style>
