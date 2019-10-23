<template>
  <div class="footer">
    <van-cell>
      <template slot="title">
        <div class="bottom">
          <div class="inp">
            <van-field v-model="mess" placeholder="请输入内容">
              <template slot="left-icon">
                <van-icon name="edit" />
              </template>
            </van-field>
          </div>
          <div class="btn">
            <van-button type="danger" size="small" @click="sendMessage">发送</van-button>
          </div>
          <div class="start" v-if="isfirstComment">
            <van-icon name="star-o"></van-icon>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { setComment } from "@/api/comment";
export default {
  props: ["art_id", "isfirstComment","commentId"],
  data() {
    return {
      mess: ""
      // art_id: this.$route.params.id
    };
  },
  methods: {
    // 添加评论，发送请求
    // 从父组件获取文章id/this.$route.params.id
    async sendMessage() {
      // if (!this.mess.trim().length == 0) {
      //   try {
      //     let res = await setComment({
      //       target: this.art_id,
      //       content: this.mess,
      //       art_id: null
      //     });
      //     // console.log(res);
      //     this.$emit("sendComment", res);
      //     this.mess = "";
      //   } catch (error) {
      //     this.$toast.fail(error.message);
      //   }
      // } else {
      //   this.$toast("请输入点什么吧！");
      // }

      // try {
      //   this.$login()
      //   let res = await setComment({
      //     target: this.art_id,
      //     content: this.mess
      //   });
      //   this.$emit("sendComment", res);
      //   this.mess = "";
      //   // console.log(res);
      // } catch (error) {
      //   this.$toast.fail(error.message);
      // }

      try {
        this.$login();
        if (this.isfirstComment) {
          // 第一层评论
          let res = await setComment({
            target: this.art_id,
            content: this.mess
          });
          this.$emit("sendComment", res);
          this.mess = "";
          // console.log(res);
        } else {
          // 第二层评论:评论的回复
          let res = await setComment({
            target: this.commentId,
            content: this.mess,
            art_id:this.art_id
          });
          this.$emit("sendComment", res);
          this.mess = "";
        }
      } catch (error) {
        this.$toast.fail(error.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
  display: flex;
  align-items: center;
  .inp {
    flex: 1;
    width: 100%;
    .van-field {
      border-radius: 20px;
      background-color: #eee;
    }
  }
  .btn {
    margin: 0 10px;
    .van-button {
      border-radius: 15%;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>