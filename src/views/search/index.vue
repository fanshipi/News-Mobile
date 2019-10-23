<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="key"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(key)"
      @cancel="onCancel"
    />
    <!-- 联想框 -->
    <van-cell-group v-if="thinkList.length !=0">
      <van-cell
        @click="onSearch(item.item)"
        icon="search"
        v-for="(item, index) in thinkList"
        :key="index"
      >
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group >
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史" >
          <template slot="right-icon">
              <van-icon name="delete" v-show="!isShow" @click="isShow=true"></van-icon>
              <div v-if="isShow">
                  <span @click="delAll">全部删除 </span>
                  <span @click="isShow=false">完成</span>
              </div>
          </template>
      </van-cell>
      <van-cell @click="onSearch(item) " v-for="(item,index) in searchList" :key="index" icon="search" :title="item" size="large" >
          <template slot="right-icon" >
              <van-icon name='close' v-if="isShow" @click="delItem(index)"></van-icon>
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入 API
import { thinkArticle } from "@/api/article";

export default {
  data() {
    return {
      key: "",
      // 用来存储联想的数据源
      thinkList: [],
      // 定义一个防抖的定时器
      timer: null,
      // 保存搜索的历史
      searchList: JSON.parse(window.localStorage.getItem('search')) || [],
    //   deleteIcon显示引产
      isShow:false,
    };
  },
  methods: {
    // 点击完成时触发
    onSearch(key) {
        // 保存搜索历史
        // this.searchList.push(key);
        this.searchList.unshift(key);
        // 去重
        this.searchList = [...new Set(this.searchList)]
        window.localStorage.setItem('search',JSON.stringify(this.searchList))

      // 获取搜索关键字
      this.$router.push(`/list/${key}`);

    },
    // 点击取消按钮时触发
    onCancel() {
      this.$router.back()
    },
    // 删除搜索历史
    delItem(index){
        this.searchList.splice(index,1)
        // 保存到localStorage
        window.localStorage.setItem('search',JSON.stringify(this.searchList))
    },
    // delAll
    delAll() {
        this.searchList = []
        window.localStorage.removeItem('search')
    }
  },
  watch: {
    key: function(newVal, oldVal) {
      // 清除定时器
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        // 判断 newVal 是否为空
        if (!newVal.trim().length) {
          // 将联想的数据源清空
          this.thinkList = [];
          return;
        }
        // 根据 key 去联想数据
        let res = await thinkArticle(newVal);
        this.thinkList = res.options;
        // 将 thinkList 中的每个元素使用关键字进行分隔，再使用 span 包裹的关键字进行组合
        this.thinkList = this.thinkList.map(item => {
          return {
            colorItem: item
              .split(newVal)
              .join(`<span style="color: red">${newVal}</span>`),
            item: item
          };
        });
        // console.log(this.thinkList);
      }, 500);
    }
  }
};
</script>

<style>
</style>
