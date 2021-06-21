<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            $router
              .push({
                query: $route.query,
                path: item.path,
              })
              .catch((err) => err)
          "
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "@/utils/auth";
export default {
  props: {
    theme: {
      type: String,
      default: "dark",
    },
    layout: {
      type: String,
      default: "left",
    },
    //解决左菜单栏有选中时收缩会出现悬浮窗的问题
    navCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    //设置路由与key的对应关系,记录打开菜单和选中的菜单
    this.selectedKeysMap = new Map();
    this.openKeysMap = new Map();
    //获取路由中的配置信息
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      prePath: "",
      menuData,
      //设置初始选中和打开的key
      selectedKeys: this.selectedKeysMap.get(this.$route.path),
      openKeys: this.openKeysMap.get(this.$route.path),
    };
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap.get(val);
      this.openKeys = this.openKeysMap.get(val);
    },
    navCollapsed: function (val) {
      const pathArr = this.menuData.map((item) => {
        return item.path;
      });
      if (val) {
        const index = this.openKeys.findIndex((item) => {
          return pathArr.includes(item);
        });
        if (index !== -1) {
          //保存上次删除的打开的key(path)
          this.prePath = this.openKeys[index];
          //其他展开的未选中的菜单
          const otherPathArr = this.openKeys.filter((item) => {
            return this.selectedKeys[0].indexOf(item) === -1;
          });
          this.openKeys.splice(index, 1);
          //删除其他打开但是未选中的菜单
          for (const [index, item] of this.openKeys.entries()) {
            if (otherPathArr.includes(item)) {
              this.openKeys.splice(index, 1);
            } else {
              continue;
            }
          }
        }
      } else {
        this.openKeys.push(this.prePath);
      }
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      for (let item of routes) {
        //设置权限不够不能查看部分菜单内容
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          //这里记录下,设置打开和选中时应该激活的路由参考
          this.openKeysMap.set(item.path, parentKeys);
          this.selectedKeysMap.set(item.path, [selectedKeys || item.path]);
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
};
</script>

<style lang="less" scoped>
/* 修改下菜单项动画样式,与侧边栏保持一致*/
/deep/.ant-menu {
  transition: background 0.3s, width 0.2s;
}
</style>
