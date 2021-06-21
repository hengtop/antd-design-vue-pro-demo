<template>
  <div class="" style="text-align: center">
    404NotFound
    <IconFont type="icon-404-font" style="font-size: 100px" />
    <!-- <img :src="logo" alt="" width="100" /> -->\
    <Logo width=100 />    
  </div>
</template>

<script type="text/ecmascript-6">
/* 这里默认被webpack处理成了url,可以使用img引入,但如果想使用组件式的形式引用svg,就要修改vue.config.js中的配置 */
import Logo from "@/assets/logo.svg";
export default {
  name: "",
  data() {
    return {
      //logo
    };
  },
  created() {},
  mounted() {},
  methods: {},
  components: {
    Logo,
  },
};
</script>

<style lang="less" scoped>
</style>
