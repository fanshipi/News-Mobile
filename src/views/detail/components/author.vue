<template>
  <div>
    <!-- 文章内容作者信息 -->
    <van-cell>
      <template slot="title">
        <!-- 左边Img -->
        <div class="info">
          <div class="img">
            <img :src="obj.aut_photo" />
          </div>
          <!-- 中间con -->
          <div class="center">
            <van-cell>
              <template slot="title">{{obj.aut_name}}</template>
              <template slot="label">{{obj.pubdate|dayjsformate}}</template>
            </van-cell>
          </div>
          <!-- 右侧关注 -->
          <div class="btn">
            <van-button
              type="danger"
              size="small"
              v-if="obj.is_followed===false"
              @click="changefollow"
            >关注</van-button>
            <van-button v-else type="default" size="small" @click="unfollow">取消关注</van-button>
            <!-- @click="changefollow"  @click="unfollow"-->
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { followUser, unfollowUser } from "@/api/user.js";
export default {
  props: ["obj"],
  data() {
    return {};
  },
  methods: {
    async changefollow() {
      try {
        let res = await followUser(this.obj.aut_id);
        this.obj.is_followed = true;
        this.$toast("关注成功");
        console.log(this.obj.is_followed);
        // console.log(res); //target:1
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    async unfollow() {
      try {
        let res = await unfollowUser(this.obj.aut_id);
        this.obj.is_followed = false;
        this.$toast("取消关注成功");
        // console.log(res);//为空
      } catch (error) {
       this.$toast.fail(error.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info {
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
    flex: 4;
  }
  .btn {
    flex: 2;
  }
}
</style>