/* 权限校验 */

//获取权限
export function getCurrentAuthority(){
  return ["admin"]
}

//检查权限
export function check(authority){
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

//判断登录
export function isLogin() {
  const current = getCurrentAuthority;
  //有权限且不等于guest测判断为登录状态
  return current && current[0] !== "guest";
}