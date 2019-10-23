<template>
    <div>
        <!-- 导航头 -->
        <van-nav-bar title="登录" />
        <!-- 输入框 -->
        <van-cell-group>
            <van-field v-validate="'required'" name="mobile" :error-message="errors.first('mobile')" v-model="mobile" required clearable label="手机号" placeholder="请输入手机号" />
            <van-field v-validate="'required'" name="code" :error-message="errors.first('code')" v-model="code" label="验证码" placeholder="请输入验证码" required />
        </van-cell-group>
        <!-- 登录按钮 -->
        <div class="mybtn">
            <van-button type="info" :loading="loading" size="large" @click="login">登录</van-button>
        </div>
    </div>
</template>

<script>
// 导入请求服务器的 API 文件
import { userLogin } from '@/api/user'

export default {
    data() {
        return {
            mobile: '18888888888',
            code: '246810',
            loading: false
        }
    },
    methods: {
        // 实现登录操作
        async login() {
            try {
                this.loading = true;
                // 1.0 获取输入的数据
                let valid = await this.$validator.validate()
                if (valid) {
                    let res = await userLogin({
                        mobile: this.mobile,
                        code: this.code
                    })
                    // 将 token 保存到 storege 中
                    this.$store.commit('setUser', res)
                    // this.$router.push('/home')
                    // 如果是从评论区返回登录时
                    this.$router.back()
                }
                this.loading = false;
            } catch (error) {
                // 提示错误
                this.$toast.fail('登录失败')
            }
        },
        setMyRule() {
            const dict = {
                custom: {
                    mobile: {
                        required: '请输入手机号'
                    },
                    code: {
                        required: '请输入验证码'
                    }
                }
            };
            this.$validator.localize('en', dict);
        }
    },
    mounted() {
        this.setMyRule()
    }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background: #1989fa;
    .van-nav-bar__title {
        color: #fff;
    }
}

.mybtn {
    margin: 10px;
}
</style>
