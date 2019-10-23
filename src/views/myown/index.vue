<template>
  <div class="myown">
    <!-- header -->
    <van-nav-bar
      title="我的"
      fixed
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell>
      <template slot="title">
        <div class="userInfo">
          <div class="img" @click="toPrivate">
            <van-image src="https://goss2.cfp.cn/creative/vcg/800/new/VCG41N695260752.jpg" />
          </div>
          <div class="name">
            <van-cell title="I'm 小公举本人">
              <template slot="label">
                <van-button size="mini" type="default">申请认证</van-button>
              </template>
            </van-cell>
          </div>
          <div class="read">
            <div class="book">
              <van-image src="https://goss2.cfp.cn/creative/vcg/800/new/VCG41N695260752.jpg" />
            </div>
            <div class="name">
              <van-cell class="mycell">
                <template slot="title">
                  <div class="today">今日份reading</div>
                </template>
                <template slot="label">
                  <div class="times">5分钟</div>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
        <van-grid :column-num="3">
          <van-grid-item icon="photo-o" text="动态">
            <template slot="icon">222</template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="关注">
            <template slot="icon">333</template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="粉丝">
            <template slot="icon">555</template>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>

    <!-- 操作 -->
    <van-cell>
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="收藏"></van-grid-item>
        <van-grid-item icon="clock-o" text="历史"></van-grid-item>
        <van-grid-item icon="records" text="作品"></van-grid-item>
      </van-grid>
    </van-cell>

    <!-- 选项 -->
    <van-cell-group>
      <van-cell title="用户反馈" is-link url="/vant/mobile.html"></van-cell>
      <van-cell title="小公举同学" is-link to="/chat"></van-cell>
      <van-cell title="系统设置" is-link to="index"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods:{
        toPrivate(){
            this.$router.push({
                name:'person'
            })
        }
    }
};
</script>

<style lang="less" scoped>
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
.myown {
  margin-top: 46px;
  .userInfo {
    display: flex;
    position: relative;
    .img {
      .van-image /deep/ img {
        width: 60px;
        height: 60px;
        border-radius: 50% !important;
      }
    }
    .name {
      //   flex: 3;
      .van-cell /deep/ .van-cell__title {
        font-size: 12px;
      }
      .van-button {
        border-radius: 10px;
      }
    }
    .read {
      //   flex: 2;
      padding:0 10px;
      border-radius: 38px 0 0 38px;
      position: absolute;
    //   position:absolute大小改变
      right: -18px;
      top:10px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      .book {
        .van-image {
          width: 18px;
          height: 18px;
        }
      }
      .name {
          background: #ccc;
          .mycell {
              background-color: #ccc;
              padding:0;
              margin-left: 10px;
          }
      }
    }
  }
}
</style>