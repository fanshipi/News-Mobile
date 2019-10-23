import Vue from 'vue'
import store from '@/store';
import router from '@/router'
import {Dialog } from 'vant'
Vue.use(Dialog)
var myplugs = {};
myplugs.install = function(Vue) {
  // 添加全局的登录方法
  Vue.prototype.$login = function() {
    // 进行评论需要判断用户是否登录
    // 登录状态保存在vuex
    let user = store.state.user;
    if (!user || !user.token) {
      Dialog.confirm({
        title: "注意",
        message: "评论需要登录哦~"
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
export default myplugs;