// 封装一个 axios 文件
import axios from "axios";
import store from "@/store";

// 创建
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

const refreshToken = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
})

// 设置请求拦截器
request.interceptors.request.use(
  function(config) {
    // 添加一个请求头
    // 判断用户是否登录
    let user = store.state.user;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 设置响应拦截器
request.interceptors.response.use(
  function(response) {
    return response.data.data || response.data;
  },
  async function(error) {
    // console.dir(error);
    if(error.response.status === 401) {
      let refresh_token = store.state.user.refresh_token;
      let res = await refreshToken({
        url:"v1_0/authorizations",
        method:'PUT',
        headers:{
          Authorization:`Bearer ${refresh_token}`
        }
      })
      // console.log(res);
      let token = res.data.data.token
      store.commit('setUser',{
        token,
        refresh_token
      })
      // 再次发送请求
      return request(error.config)
    }
    return Promise.reject(error);
  }
);

// 暴露对象
export default request;
