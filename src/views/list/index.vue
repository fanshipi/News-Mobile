<template>
  <div class="list">
    <!-- nav -->
    <van-nav-bar
      title="搜索列表"
      left-text="返回"
      fixed
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
    />
    <div id="top"></div>
    <!-- content -->
    <van-cell-group>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell :title="item.aut_name" v-for="(item,index) in searchList" :key="index">
          <template slot="label" >
            <div @click="toContent(item.art_id)">{{item.title}}</div>
            <van-grid :column-num="3">
              <van-grid-item text="评论" @click="comment" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-list>
      </van-pull-refresh>
    </van-cell-group>
    <a href="#top" class="mydirect">返回到顶部</a>
  </div>
</template>

<script>
import { getSearchPage } from "@/api/article";
export default {
  data() {
    return {
      // search's key
      key: this.$route.params.key,
      // 默认显示的数据
      page: 1,
      // 页容量
      per_page: 10,
      //   搜索列表
      searchList: [],
      //   加载更多
      loading: false,
      //   加载完成
      finished: false,
      // 下拉刷新
      isLoading:false
    };
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.back()
    },
    // onRefresh
    onRefresh(){
      // this.getSearchData()
      // this.isLoading = false
    },
    // 加载更多
    onLoad() {
      this.getSearchData();
    },
    async getSearchData() {
      this.page++;
      let res = await getSearchPage({
        page: this.page,
        per_page: this.per_page,
        // q:this.key
        key: this.key
      });
      console.log(res);
      //   加载的是当前页面
      //   this.searchList = res.results;
      // 加载的是之前的加上新的内容
      this.searchList = [...this.searchList, ...res.results];
      //   需要下拉加载
      //   加载完成之后
      // 此时page没有++
      //  this.loading=false;
      // this.finished= true

      // 如果内容加载完了
      if (this.searchList.length === res.total_count) {
        this.finished = true;
      }
      this.loading = false;
    },
    comment() {
      //   // 进行评论需要判断用户是否登录
      //   // 登录状态保存在vuex
      //   let user = this.$store.state.user;
      //   if (!user || !user.token) {
      //     this.$dialog
      //       .confirm({
      //         title: "注意",
      //         message: "评论需要登录哦~"
      //       })
      //       .then(() => {
      //         this.$router.push("/login");
      //       })
      //       .catch(error => {
      //         return;
      //       });
      //   }

      this.$login();
      // console.log("1111");
    },
    toContent(art_id) {
      this.$router.push(`/detail/${art_id}`)
      // console.log(id);
    }
  },
  mounted() {
    //   console.log(this.key);
    // this.getSearchData();
  }
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 46px;
}
.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.mydirect {
  position: fixed;
  bottom: 50px;
  right: 10px;
}
</style>
