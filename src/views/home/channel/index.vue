<template>
  <div class="channel">
    <!-- 操作频道 -->
    <!-- 添加一个弹出框 -->
    <!-- 
    :value="value" @input="$emit('input', $event)": v-model 的实现
    -->
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{height: '90%'}">
      <div class="mybox">
        <div class="top">
          <div class="mychannel">
            我的频道
            <span>点击进入频道</span>
          </div>
          <div class="edit">
            <button v-if="!clearshow" @click="edit">编辑</button>
            <button v-else @click="clearFini">完成</button>
          </div>
        </div>
        <van-grid clickable>
          <van-grid-item v-for="(item, index) in channleArr" :key="index">
            <div class="mytext" slot="text" @click="changeActive(index)">
              <div :class="{ active: index === active }">{{ item.name }}</div>
              <van-icon @click="clearitem(index)" v-show="clearshow" name="clear" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="mybox">
        <div class="top">
          <div class="mychannel">
            频道推荐
            <span>点击进入频道</span>
          </div>
        </div>
        <van-grid clickable>
          <van-grid-item v-for="(item, index) in otherChannel" :key="index">
            <div @click="addCha(item)" class="mytext" slot="text">{{ item.name }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入 channle 数据
import { getAllChannel, setChannel } from '@/api/channel.js'

export default {
  props: ['value', 'channleArr', // myC
    'active'],
  data() {
    return {
      // 控制页面上叉叉的显示
      clearshow: false,
      // 这个属性与父组件传递过来的参数是一样的（但是不是父组件的传参）
      // cloneActive: '',
      // 所有的频道数据
      allChannleList: [] // allC
    }
  },
  computed: {
    // 通过计算属性将 allChannleList 中在 channleArr 中不存在元素遍历出来
    otherChannel() {
      // 1.0 取出 myC 中所有的 id
      let ids = this.channleArr.map(item => {
        return item.id
      })
      // 2.0 遍历 allC 判断在 ids 中是否存在 
      let otherchannel = this.allChannleList.filter(item => {
        return !ids.includes(item.id)
      })
      // 3.0 返回
      return otherchannel
    }
  },
  mounted() {
    // // 将 active 赋值给 cloneActive
    // this.cloneActive = this.active
    this.getChannelList()
  },
  methods: {
    // 显示叉叉
    edit() {
      this.clearshow = true
    },
    // 完成编辑
    clearFini() {
      this.clearshow = false
    },
    // 切换选中的频道
    changeActive(index) {
      // 切换选中的频道
      this.cloneActive = index
      // 将参数重新交给 home
      this.$emit('update:active', index)
    },
    // 获取所有的频道数据
    async getChannelList() {
      var res = await getAllChannel()
      // 得到所有的频道数据
      this.allChannleList = res.channels
      // 添加自定义属性
      this.allChannleList.forEach(item => {
        // 添加文章
        this.$set(item, 'article', [])
        // 添加上拉
        this.$set(item, 'uploading', false)
        // 添加完成状态
        this.$set(item, 'finished', false)
        // 添加下拉
        this.$set(item, 'pullloading', false)
        // 添加时间戳
        this.$set(item, 'pre_timestamp', 0)
      })
    },
    // 添加频道信息
    async addCha(item) {
      // 添加到我的频道
      this.channleArr.push(item)
      let user = this.$store.state.user
      // 没有登录的情况
      if (!user || !user.token) {
        // 将数据保存到本地
        window.localStorage.setItem('channel', JSON.stringify(this.channleArr))
      } else {
        // 将 channleArr 改造为 channels
        let channels = this.channleArr.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // console.log(channels)
        // 已经登录：将数据更新到服务器
        await setChannel({
          channels: channels
        })
      }
    },
    // 删除一个频道信息
    async clearitem(index) {
      // 从集合中删除元素
      this.channleArr.splice(index, 1)

      let user = this.$store.state.user
      if (!user || !user.token) {// 没有登录
        window.localStorage.setItem('channel', JSON.stringify(this.channleArr))
      } else {
        // 将 channleArr 改造为 channels
        let channels = this.channleArr.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // console.log(channels)
        // 已经登录：将数据更新到服务器
        await setChannel({
          channels: channels
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.van-popup.van-popup--bottom {
  padding: 10px;
  box-sizing: border-box;
}

.van-grid-item {
  position: relative;
}

.mybox {
  margin-bottom: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    .mychannel {
      font-size: 16px;
      span {
        font-size: 12px;
        color: #aaa;
      }
    }
    .edit {
      button {
        background-color: #fff;
        border: 1px solid red;
        border-radius: 15px;
        padding: 0px 10px;
        color: red;
        font-size: 12px;
      }
    }
  }
  .mytext {
    font-size: 12px;
    color: #333;
    .active {
      color: red;
    }
    .van-icon {
      position: absolute;
      top: 0px;
      right: 0px;
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>
