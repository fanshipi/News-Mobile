<template>
    <div>
        <!-- 封装更多组件 -->
        <van-dialog :value="value" @input="$emit('input',$event)" closeOnClickOverlay :showConfirmButton="false" :showCancelButton="false" show-cancel-button>
            <!-- 更多操作 -->
            <van-cell-group v-if="!isItem">
                <van-cell icon="location-o" title="隐藏此信息" @click="hideMess" />
                <van-cell icon="location-o" title="举报" is-link @click="isItem=true" />
                <van-cell icon="location-o" title="拉黑" @click="blacklist" />
            </van-cell-group>
            <!-- 举报类型 -->
            <van-cell-group v-if="isItem">
                <van-cell icon="arrow-left" @click="isItem=false" />
                <van-cell @click="report(item.value)" v-for="(item, index) in itemList" :key="index" icon="location-o" :title="item.name" />
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
// 导入 不喜欢文章 方法
import { disLikeArticle, setBlacklist, reportArticle } from '@/api/article'
export default {
    props: ['value', 'activeArticleId', 'authorId'],
    data() {
        return {
            itemList: [
                { value: 0, name: "其他问题" },
                { value: 1, name: "标题夸张" },
                { value: 2, name: "低俗色情" },
                { value: 3, name: "错别字多" },
                { value: 4, name: "旧闻重复" },
                { value: 5, name: "广告软文" },
                { value: 6, name: "内容不实" },
                { value: 7, name: "涉嫌违法犯罪" },
                { value: 8, name: "侵权" }
            ],
            // 隐藏举报类型
            isItem: false
        }
    },
    methods: {
        // 隐藏此信息
        async hideMess() {
            try {
                // 发送请求到服务器
                await disLikeArticle(this.activeArticleId)
                // 告诉 home 组件删除被点击的元素
                this.$emit('delItem', this.activeArticleId)
                this.$toast.success('取关成功')
            } catch (error) {
                this.$toast.fail('取关失败')
            } finally {
                // 隐藏面板
                this.$emit('input', false)
            }
        },
        // 拉黑操作
        async blacklist() {
            try {
                await setBlacklist(this.authorId)
                this.$toast.success('拉黑成功')
            } catch (error) {
                this.$toast.fail('拉黑失败')
            } finally {
                this.$emit('input', false)
            }
        },
        async  report(value) {
            try {
                // value 当前举报的类型
                await reportArticle({
                    artId: this.activeArticleId,
                    type: value
                })
                this.$toast.success('您的举报信息我们已经收到，感谢您为网络净化作出的贡献')
            } catch (error) {
                // this.$toast.fail('失败')
                if (error.message.indexOf('409')) {
                    this.$toast.fail('当前文章已经被举报了')
                } else {
                    this.$toast.fail('系统异常')
                }
            } finally {
                // 回到隐藏信息面板
                this.isItem = false
                // 关闭更多功能面板
                this.$emit('input', false)
            }
        }
    }
}
</script>

<style>

</style>









