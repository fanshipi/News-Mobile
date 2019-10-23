<template>
    <div class="home">
        <van-nav-bar title="首页" />
        <!-- tab页 -->
        <van-tabs v-model="tabActive">
            <div class="myicon" slot="nav-right">
                <van-icon name="wap-nav" @click="openChannel" />
            </div>
            <van-tab v-for="(item, index) in channelList" :key="index" :title="item.name">
                <van-pull-refresh v-model="item.pullloading" @refresh="onRefresh">
                    <!-- list 组件 -->
                    <van-list v-model="item.uploading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
                        <!-- 新闻数据 -->

                        <van-cell v-for="(subitem, subindex) in item.article" :key="subindex" :title="subitem.title">
                            <template slot="label">
                                <!-- 九宫格：用来添加图片 -->
                                <van-grid v-if="subitem.cover.type > 0" :border="false" :column-num="3">
                                    <van-grid-item v-for="(img,imgIndex) in subitem.cover.images" :key="imgIndex">
                                        <van-image lazy-load :src="img" />
                                    </van-grid-item>
                                </van-grid>
                                <!-- 下方的信息： 作者： 评论条数 发布时间 -->
                                <div class="mymess">
                                    <div class="left">
                                        <span>{{ subitem.aut_name }}</span>
                                        <span>评论 {{ subitem.comm_count}}</span>
                                        <span>{{ subitem.pubdate | dayjsformate }}</span>
                                    </div>
                                    <div class="right">
                                        <van-icon @click="openMore(subitem.art_id, subitem.aut_id)" name="close" />
                                    </div>
                                </div>
                            </template>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <!-- 
                    v-model:
                        1.0 传入一个参数给子组件 value
                        2.0 给子组件绑定事件 input,将来调用时会更新 show 参数
                -->
        <!-- <channel v-model="show" @gaibianActive="gbactive" :channleArr="channelList" :active="tabActive" /> -->
        <channel v-model="show" :channleArr="channelList" :active.sync="tabActive" />

        <!-- 更多操作对话框 -->
        <more v-model="moreshow" @delItem="delItem" :authorId="authorId" :activeArticleId="activeArticleId" />
    </div>
</template>

<script>
// 导入获取频道的方法
import { getChannel } from '@/api/channel'
// 导入获取文章数据的方法
import { getArticle } from '@/api/article'
// 导入组件
import channel from '@/views/home/channel'
// 导入更多
import more from '@/views/home/more'

export default {
    data() {
        return {
            // 控制更多组件的显示和隐藏
            moreshow: false,
            // tab 的激活
            tabActive: 0,
            // 上拉的状态
            uploading: false,
            // 上拉完成
            finished: false,
            // list 中的数据源
            list: [],
            // 管理弹出层
            show: false,
            // 频道列表数据
            channelList: [],
            // 当前被点击的文章 id
            activeArticleId: 0,
            // 要拉黑作者的 id
            authorId: 0
        }
    },
    methods: {
        // list 组件的加载方法
        async onLoad() {
            // console.log('请求当请选中频道的数据')
            // 得到当前激活的频道
            let activeChannle = this.channelList[this.tabActive]

            // 判断时间戳是否为 null ，如果为 null 说明数据已经加载完成
            if (activeChannle.pre_timestamp === null) {
                // 将状态设置为结束
                activeChannle.finished = true
                // 已经加载完成
                activeChannle.uploading = false
                return;
            }

            // console.log(activeChannle)
            if (activeChannle.pre_timestamp === 0) {
                // 第一次：参数时间戳应该是当前时间
                let res = await getArticle({
                    channel_id: activeChannle.id,
                    timestamp: Date.now(),
                    with_top: 1
                })
                console.log(res)
                // 将文章数据保存到当前激活频道的 article 中
                activeChannle.article = res.results
                activeChannle.pre_timestamp = res.pre_timestamp
            } else {
                // 不是第一次：参数时间戳应该是上一次返回的时间戳
                let res = await getArticle({
                    channel_id: activeChannle.id,
                    timestamp: activeChannle.pre_timestamp,
                    with_top: 1
                })
                // 将文章数据保存到当前激活频道的 article 中
                activeChannle.article = [...activeChannle.article, ...res.results]
                activeChannle.pre_timestamp = res.pre_timestamp
            }
            activeChannle.uploading = false
            // console.log(this.channelList)
        },
        // pullrefresh 的刷新方法
        onRefresh() {
            // console.log('我被刷新了')
            // 得到当前激活的频道
            let activeChannel = this.channelList[this.tabActive]
            // 重置属性
            activeChannel.article = []
            activeChannel.uploading = false
            activeChannel.finished = false
            activeChannel.pre_timestamp = 0
            // 刷新状态改为 false
            activeChannel.pullloading = false
            // 重新请求数据
            this.onLoad()
        },
        openChannel() {
            this.show = true
        },
        // 得到频道数据
        async getChannel() {
            // 判断用户是否登录
            let user = this.$store.state.user
            if (user) {
                // 发送请求到服务器
                let res = await getChannel()
                this.channelList = res.channels;
            } else {
                // 判断 localstorage 中是否存在
                let localChannel = window.localStorage.getItem('channel')
                if (localChannel) {
                    this.channelList = JSON.parse(localChannel)
                } else {
                    // 发送请求到服务器
                    let res = await getChannel()
                    this.channelList = res.channels;
                }
            }
            // 调用方法，添加额外属性
            this.addPropToChannelList()
            // console.log(this.channelList)
        },
        // 将将来要到所有的属性统一保存到频道数据中
        addPropToChannelList() {
            // 遍历数组
            // bug：不会响应式的变化
            this.channelList.forEach(item => {
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
        // // 接收改变后的 tabActive
        // gbactive(index) {
        //     this.tabActive = index
        // }
        // 加载更多操作面板
        openMore(artId, autId) {
            this.activeArticleId = artId
            this.authorId = autId
            // 将当前点击的元素传递到更多页面
            this.moreshow = true
        },
        // 用来删除用户不喜欢的信息，由子组件来调用
        delItem(artId) {
            // 得到当前选项的文章数据
            let article = this.channelList[this.tabActive].article
            console.log(article)
            // 根据 artId 去删除文章数据中对应的信息
            article.forEach((item, index) => {
                // 根据 artId 去找到对应的 item
                if (item.art_id === artId) {
                    // 删除这条数据
                    article.splice(index, 1)
                    return;
                }
            })
        }
    },
    mounted() {
        // 获取频道数据
        this.getChannel()
    },
    components: {
        channel,
        more
    }
}
</script>


<style lang="less" scoped>
.home {
    margin-top: 90px;
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
}

.home /deep/ .van-tabs__wrap {
    width: 90%;
    position: fixed;
    top: 46px;
    left: 0px;
    z-index: 999;
}

.myicon {
    position: fixed;
    top: 58px;
    right: 5px;
}

.mymess {
    display: flex;
    justify-content: space-between;
    .left {
        span {
            margin-right: 10px;
        }
    }
}
</style>
