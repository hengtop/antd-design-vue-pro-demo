
<script>
/* 权限控制组件----权限组件 */
import { check } from "@/utils/auth";
export default {
  functional: true,
  props:{
    authority:{
      type:Array,
      required:true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    /* 校验通过返回子组件,没有就返回null */
    return check(props.authority) ? scopedSlots.default() : null;
  }, 
};
</script>