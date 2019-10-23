import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login")
    },
    {
      path: "/",
      component: () => import("@/views/tabBar_layout"),
      children: [
        {
          path: "home",
          component: () => import("@/views/home")
        },
        {
          path: "myown",
          component: () => import("@/views/myown")
        }
      ]
    },
    {
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      path: '/list/:key',
      component: () => import('@/views/list')
    },
    {
      path:'/list',
      component:()=>import('@/views/list')
    },
    {
      path:'/detail/:id',
      component:()=>import('@/views/detail')
    },
    {
      path:'/person',
      name:'person',
      component:()=>import('@/views/person')
    },
    {
      path:'/chat',
      name:'chat',
      component:()=>import('@/views/chat')
    }
  ]
});
