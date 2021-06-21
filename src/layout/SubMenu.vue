recommend use functional component
<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <!-- 这里获取不到$router  可以调用parent来获取 -->
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          parent.$router.push({
            query:parent.$route.query,
            path: item.path,
          }).catch(err => err)
        "
      >
      <!-- 上面注意,router重复导航会报错这里使用catch -->
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"],
};
</script>