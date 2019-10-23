<template>
  <div class="like">
    <van-cell>
      <template slot="title">
        <div class="islike">
          <van-button
            type="default"
            size="small"
            icon="star-o"
            @click="unlikeArt"
            v-if="obj.attitude === 1"
          >取消点赞</van-button>
          <van-button type="danger" size="small" icon="star-o" @click="likeArt" v-else>点赞</van-button>

         
          <van-button type="danger" size="small" icon="like-o" v-if="obj.attitude === 0" @click="undislike">取消不喜欢</van-button>
          <van-button type="default" size="small" icon="like-o" v-else @click="dislike" class="dislike">不喜欢</van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { likings, unlikings, dislikeArt, undislikeArt } from "@/api/user";
export default {
  props: ["obj"],
  data() {
    return {
      artId: this.$route.params.id
    };
  },
  methods: {
    // 给文章点赞
    async likeArt() {
      try {
        let res = await likings(this.obj.art_id);
        this.obj.attitude = 1;
        // console.log(res);//target:35571---->this.$route.params.id,
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    // 取消点赞
    async unlikeArt() {
      try {
        let res = await unlikings(this.obj.art_id);
        this.obj.attitude = -1;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    // 取消不喜欢
    async undislike(){
      try {
        let res = await undislikeArt(this.obj.art_id)
        this.obj.attitude = -1
        console.log(res);
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    // 不喜欢
    async dislike(){
      try {
        let res = await dislikeArt(this.obj.art_id)
        this.obj.attitude = 0
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.islike {
  display: flex;
  justify-content: space-around;
  .van-button:nth-child(2) {
    color: #fff;
    border-radius: 12%;
  }
}
 .like /deep/ .dislike{
    color:#000 !important;
  }
</style>