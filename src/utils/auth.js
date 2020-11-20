// 获取当前用户角色
export function getAuthority() {
  return ["admin"];
}

// 判断当前用户角色是否存在当前路由的权限数组中
export function check(authority) {
  const current = getAuthority();
  if (authority) {
    return current.some(item => authority.includes(item));
  } else {
    return true;
  }
}

// 判断用户是否登陆
export function isLogin() {
  const current = getAuthority();
  return current && current[0] !== "guest";
}
