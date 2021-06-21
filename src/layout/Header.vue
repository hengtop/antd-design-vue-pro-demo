<template>
  <div class="header-container">
    <a-icon
      v-auth="['admin']"
      class="trigger"
      :type="checkIcon ? 'menu-unfold' : 'menu-fold'"
      @click="handleSiderHide"
    ></a-icon>
    Header
    <a-dropdown class="dropdown">
      <a-icon type="global"></a-icon>
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">
          <a href="javascript:;">中文</a>
        </a-menu-item>
        <a-menu-item key="enUS">
          <a href="javascript:;">English</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      checkIcon: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    //设置侧边栏隐藏显示
    handleSiderHide() {
      this.checkIcon = !this.checkIcon;
      this.$emit("handleSiderHide");
    },
    //国际化
    localeChange({ key }) {
      this.$router.push({
        query: {
          ...this.$route.query,
          locale: key,
        },
      });
      this.$i18n.locale = key;
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.header-container {
  .trigger {
    padding: 0 20px;
  }
  .trigger:hover {
    color: #c3c3c3;
  }
  .dropdown {
    margin-left: 30px;
  }
}
</style>
