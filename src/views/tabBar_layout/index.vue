<template>
    <div>
        <router-view></router-view>
        <!-- 底部 tabBar -->
        <van-tabbar route v-model="tabBarActive">
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/search" @click="toSearch">搜索</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/myown">我的</van-tabbar-item>
            <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // tabBar 的激活
            tabBarActive: 0
        }
    },
    methods:{
        toSearch(){
            this.$router.push('/search')
        }
    }
}
</script>

<style>

</style>
