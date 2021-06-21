import {check} from "@/utils/auth";
/* 自定义权限指令 */
/* 
   缺点: 只能在第一次加载的时候判断,不能动态的生效

*/
function install(Vue, options = {}){
  Vue.directive(options.name || 'auth', {
    //插入父节点时调用
    inserted(el, binding){
      if(!check(binding.value)){
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

export default {install};