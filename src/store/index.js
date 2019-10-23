import Vue from "vue";
import Vuex from "vuex";
// 导入 user 操作的文件
import * as Author from "@/utils/author";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: Author.getAuthor()
  },
  mutations: {
    setUser(state, user) {
      // 将 token 保存到 storage 中
      Author.setAuthor(user);
      // 将 token 缓存 到 user 中
      state.user = user;
    }
  },
  actions: {}
});
