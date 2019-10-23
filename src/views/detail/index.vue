<template>
  <div class="detail">
    <van-nav-bar title="文章详情" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" />
    <van-cell>
      <template slot="title">
        <div class="mytitle">{{dataList.title}}</div>
      </template>
    </van-cell>
    <!-- 作者信息 -->
    <author :obj="dataList"></author>
    <!-- 文章详情 -->
    <van-cell>
      <template slot="title">
        <div v-html="dataList.content" class="mycontent"></div>
      </template>
    </van-cell>
    <!-- 喜欢与否 -->
    <like :obj="dataList" />

    <!--评论 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadCommentList">
      <div v-for="(item,index) in commentList" :key="index" class="myState">
        <comment :commentData="item" :isfirstComment="true" />
      </div>
    </van-list>
    <!-- message对文章的直接评论 -->
    <message :art_id="dataList.art_id" @sendComment="getSendComment" :isfirstComment="true" />
    <!-- reply_popup -->
    <van-popup v-model="show" position="bottom" round closeable :style="{ height: '60%' }">
      <van-cell>
        <template slot="title">
          <h3>当前评论</h3>
        </template>
      </van-cell>
      <comment :commentData="currentreply" :isfirstComment="false" />
      <!-- 评论的回复---回复 -->
      <van-list
        v-model="secloading"
        :finished="secfinished"
        finished-text="没有更多了"
        @load="secloadCommentList"
      >
        <div v-for="(item,index) in secondComment" :key="index" class="myState">
          <comment :commentData="item" :isfirstComment="false" />
        </div>
      </van-list>
      <!-- 评论的回复 -->
      <message
        :isfirstComment="false"
        :artid="artId"
        :commentId="currentreplyid"
        @sendComment="getSecondComment"
      />
    </van-popup>
  </div>
</template>

<script>
import author from "@/views/detail/components/author";
import like from "@/views/detail/components/like";
import comment from "@/views/detail/components/comment";
import message from "@/views/detail/components/message";
import { getArticleDetail } from "@/api/article";
import { getComment, setComment } from "@/api/comment";
import ebus from "@/utils/eventbus";
export default {
  components: {
    author,
    like,
    comment,
    message
  },
  data() {
    return {
      // 文章数据
      dataList: {},
      artId: this.$route.params.id,
      commentList: [],
      // 加载
      loading: false,
      // 加载完成
      finished: false,
      // 分页的依据
      offset: 0,
      end_id: -1,
      limit: 10,
      // popup
      show: false,
      // 回复弹框内容
      currentreply: {},
      // 评论回复的id
      currentreplyid: 0,
      secondComment: [],
      // 评论的回复内容加载
      secloading: false,
      secfinished: false,
      secondendId: 0,
      secondlastId: -1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async getDetail() {
      try {
        let res = await getArticleDetail(this.artId);
        // console.log(res);
        this.dataList = res;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    // 加载评论数据
    async loadCommentList() {
      try {
        // 判断是否加载完成
        if (this.offset === this.end_id) {
          this.finished = true;
          this.loading = false;
          return;
        }
        //  第一次获取数据
        if (this.offset === 0) {
          let res = await getComment({
            type: "a",
            source: this.artId,
            limit: this.limit
          });
          console.log(res);
          this.commentList = res.results;
          this.offset = res.last_id;
          this.end_id = res.end_id;
        } else {
          let res = await getComment({
            type: "a",
            source: this.artId,
            offset: this.offset,
            limit: this.limit
          });
          // console.log(res);
          this.commentList = [...this.commentList, ...res.results];
          this.offset = res.last_id;
          this.end_id = res.end_id;
        }
      } catch (error) {
        this.$toast.fail(error.message);
      }
      this.loading = false;
    },
    // 获取子组件message发送的评论数据
    getSendComment(val) {
      // this.commentList.unshift({...val.new_obj});
      this.commentList.unshift({
        ...val.new_obj,
        art_id: val.art_id,
        com_id: val.com_id
      });
      // this.commentList.unshift(val);
    },
    // 获取第二层，评论的回复
    getSecondComment(val) {
      this.secondComment.unshift({
        ...val.new_obj,
        art_id: val.art_id,
        com_id: val.com_id
      });
    },
    //获取评论的回复列表
    async loadSecondCommnent() {
      let res = await getComment({
        type: "c",
        source: this.currentreplyid
      });
      console.log(res);
    },
    async secloadCommentList() {
      // 如果加载完
      if(this.secondendId == this.secondlastId){
        this.secfinished = true
        this.secloading = false
        return
      }
      // 第一次获取数据
      if (this.secondlastId == -1) {
        let res = await getComment({
          type: "c",
          source: this.currentreplyid
        });
        // console.log(res);
        this.secondComment = res.results;
        this.secloading = false;
        this.secondendId = res.end_id;
        this.secondlastId = res.last_id;
      }else {
        let res = await getComment({
          type:"c",
          source:this.currentreplyid,
          offset:this.secondlastId
        })
        this.secondComment = [...this.secondComment,...res.results]
        this.secloading = false
        this.secfinished = true
        this.secondendId = res.end_id
        this.secondlastId = res.last_id
      }
    }
  },
  mounted() {
    this.getDetail();
    // this.loadCommentList();
    // ebus.$on('showpopup',val=>{
    //   this.show = val
    // })

    ebus.$on("showpopup", obj => {
      console.log(obj);
      (this.show = obj.show), (this.currentreply = obj.currentreply);
      this.currentreplyid = this.currentreply.com_id;
    });
  }
};
</script>

<style lang='less' scoped>
.detail {
  margin-bottom: 100px;
}
.van-nav-bar {
  background: #1989fa;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__arrow {
    color: #fff;
  }
}
// .detail /deep/ .mycontent p{
//   font-size:12px;
// }

.mytitle {
  margin-top: 46px;
  font-weight: 700;
  font-size: 14px;
}
.van-list {
  margin-top: 30px;
}
</style>