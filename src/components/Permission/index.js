import permission from './permission'

const install = function(Vue) {
  //自定义指令
  Vue.directive('permission', permission)
};

permission.install = install;
export default permission
