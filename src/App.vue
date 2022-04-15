<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
//按需引入
import moment from "moment"; //还要切换moment的语言配置
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  mounted() {
  },
  watch: {
    //监听参数变换切换语言
    "$route.query.locale": function (val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    },
  },
};
</script>
<style lang="less"></style>
