import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局登录组件
import myloginplugs from '@/utils/loginplugs'
// 导入 vant
import Vant from "vant";
import "vant/lib/index.css";
import dayjs from "dayjs";
// 导入 dayjs 的语言包
import "dayjs/locale/zh-cn";
// 导入 dayjs 的插件
import relativeTime from "dayjs/plugin/relativeTime";

import { Lazyload } from "vant";

// 导入 VeeValidate
import VeeValidate, { Validator } from "vee-validate";

// 导入 VeeValidata 的语言包
import zh_CN from "vee-validate/dist/locale/zh_CN";

Vue.use(Vant);
Vue.use(Lazyload);
// Vue.use(Dialog);
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

Vue.use(VeeValidate, {
  events: ""
});
Validator.localize("zh_CN", zh_CN);

Vue.use(myloginplugs)

// 封闭一个 dayjs 的全局过滤器
Vue.filter("dayjsformate", function(value) {
  // value： 使用当前过滤器的数据
  return dayjs().from(dayjs(value)); // 几秒前 / 20天之前
});
// 格式时间
Vue.filter("dateformate", function(value) {
  // value： 使用当前过滤器的数据
  return dayjs(value).format("YYYY-MM-DD hh:mm"); // 几秒前 / 20天之前
});


// -------------------------------------------------------------------
// // 使用 dayjs
// console.log("-------------------------");
// console.log(dayjs().from(dayjs("2019-07-26T21:42:38")));
// console.log("-------------------------");
// -------------------------------------------------------------------


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
