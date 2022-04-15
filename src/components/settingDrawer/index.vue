<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
      width="300px"
    >
      <!-- 设置抽屉挂载位置 -->
      <template v-slot:handle>
        <div class="setting-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div>
        <!-- 同步路由设置和默认设置 -->
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="handleSettingChange('navTheme', $event.target.value)"
        >
          <h2>整体风格设置</h2>
          <a-radio value="dark"> 黑色 </a-radio>
          <a-radio value="light"> 白色 </a-radio>
        </a-radio-group>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="handleSettingChange('navLayout', $event.target.value)"
        >
          <h2>导航栏位置</h2>
          <a-radio value="left"> 左侧 </a-radio>
          <a-radio value="top"> 顶部 </a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      visible: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({
        query: {
          //保存已有的参数
          ...this.$route.query,
          [type]: value,
        },
      });
    },
  },
  components: {},
};
</script>

<style lang="less" src="../../styles/theme/index.less">
</style>
