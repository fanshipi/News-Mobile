<template>
  <div class="comment">
    <!-- 文章内容作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="info">
          <div class="img">
            <img
              :src="commentData.aut_photo"
            />
          </div>
          <!-- 中间con -->
          <div class="center">
            <van-cell>
              <template slot="title">{{commentData.aut_name}}</template>
            </van-cell>
          </div>
          <!-- 右侧点赞 -->
          <div class="btn">
            <van-icon name="good-job-o" />{{commentData.like_count}}
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <div>{{commentData.content}}</div>
          <span>{{commentData.pubdate|dateformate}}</span>
          <span @click="openPopup" v-if="isfirstComment">回复 {{commentData.reply_count}}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import ebus from '@/utils/eventbus'
export default {
  props:['commentData',"isfirstComment"],
  data(){
    return{}
  },
  methods:{
    openPopup(){
      // 将数据传到兄弟组件，关闭弹框
      ebus.$emit('showpopup',{
        show:true,
        currentreply:this.commentData
        })
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  display: flex;
  align-items: center;
  .img {
    flex: 1;
    width: 20%;
    height: 20%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .center {
    flex:4;
  }
  .btn {
    flex:1
  }
}
.comment {
  margin-bottom: 20px;
}
.comment /deep/ .content {
  margin-left: 65px;
  span {
    margin-right:12px;
  }
}
</style>