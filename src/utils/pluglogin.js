import Vue from 'vue'
// 导入 store
import store from "@/store";
// 导入 dailog 
import { Dialog } from "vant";
// 导入 router
import router from "@/router";

Vue.use(Dialog);

// 封装一个登录的插件
var myplugs = {};
// 添加一个插件的方法
myplugs.install = function(Vue) {
  // 处理自己插件的逻辑：给 Vue 的实例对象添加全局的方法
  Vue.prototype.$login = function() {
    // 登录状态是保存在 vuex: 直接判断 vuex 中是否存在数据
    let user = store.state.user;
    // 判断
    if (!user || !user.token) {
      // 没有登录,直接跳转到登录页面，提示用户
      Dialog.confirm({
        title: "注意",
        message: "要进行当前操作时需要登录"
      })
        .then(() => {
          router.push("/login");
        })
        .catch(() => {
          return;
        });
    }
  };
};

// 将插件对象暴露去
export default myplugs;