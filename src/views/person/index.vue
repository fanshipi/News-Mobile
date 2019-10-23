<template>
  <div class="myInfo">
    <!-- header -->
    <van-nav-bar title="个人信息" fixed left-arrow @click-right="save" @click-left="$router.back()">
      <template slot="right">
        <div class="saveIt">保存</div>
      </template>
    </van-nav-bar>
    <!-- content -->
    <van-cell-group>
      <van-cell title="头像" is-link class="userphoto" @click="changeuserimg">
        <template slot="default">
          <van-image :src="user.photo" class="personimg"></van-image>
        </template>
      </van-cell>
      <van-cell title="昵称" :value="user.name" @click="changename" is-link />
      <van-cell title="介绍" is-link />
      <van-cell title="性别" :value="user.gender ===0?'男':'女'" is-link @click="changegender" />
      <van-cell
        title="生日"
        :value="user.birthday===''?'待完善':user.birthday"
        @click="openBirthday"
        is-link
      />
    </van-cell-group>
    <!-- image -->
    <upfile v-model="dialogshow" @changeUserImg="changeUserImg" />
    <!-- 昵称的弹出层 -->
    <van-popup v-model="show" position="bottom" round closeable :style="{ height: '30%' }">
      <van-cell>
        <template slot="title">
          <h3>修改用户昵称</h3>
          <van-field v-model="user.name" class="changename" />
        </template>
      </van-cell>
    </van-popup>
    <!-- 性别的弹框 -->
    <van-popup v-model="gendershow" :style="{ height: '11%',width:'30%' }">
      <van-cell class="usergender">
        <van-radio-group v-model="user.gender">
          <van-radio name="0" checked-color="#07c160" shape="square">男</van-radio>
          <van-radio name="1" checked-color="#07c160" shape="square">女</van-radio>
        </van-radio-group>
      </van-cell>
    </van-popup>
    <!-- 生日的弹出层 -->
    <van-popup v-model="showBirthday" position="bottom" round closeable :style="{ height: '60%' }">
      <van-cell>
        <template slot="title">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            @confirm="confirm"
            @cancel="cancel"
          />
        </template>
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// 导入 dayjs 的插件
import relativeTime from "dayjs/plugin/relativeTime";

import upfile from "@/views/person/components/upfile";
import { userProfile, updateUser } from "@/api/user.js";
export default {
  components: {
    upfile
  },
  data() {
    return {
      user: {},
      //   头像
      //   dialog
      dialogshow: false,
      //   fileCont: null,
      //   昵称
      show: false,
      //   生日
      minDate: new Date(1990, 1, 1),
      currentDate: new Date(),
      showBirthday: false,
      //   genger
      radio: 0,
      gendershow: false
    };
  },
  methods: {
    //   保存按钮
    // save(){
    //     console.log(111);
    // },
    async save() {
      let res = await updateUser({
        name: this.user.name,
        gender: this.user.gender,
        birthday: this.user.birthday
      });
      console.log(res);
      this.$toast.success("修改成功");
    },
    // 加载用户资料
    async loadpersonprofile() {
      let res = await userProfile();
      console.log(res);
      this.user = res;
    },
    changename() {
      this.show = true;
    },
    openBirthday() {
      this.showBirthday = true;
    },
    changeuserimg() {
      this.dialogshow = true;
    },
    // getfile() {
    //   this.fileCont = this.$refs.myfile;
    // },
    changeUserImg(val) {
      this.user.photo = val.photo;
    },
    // 修改出生年日月
    async confirm(value) {
      // console.log(value);//获取到的是当前点击的年月日，需要格式化
      let res = dayjs(value).format("YYYY-MM-DD");
      this.user.birthday = res;
      let backdata = await updateUser({
        birthday: res
      });
      // console.log(backdata);
      this.showBirthday = false;
    },
    cancel() {
      this.showBirthday = false;
    },
    //修改性别
    async changegender() {
      this.gendershow = true;
    //   let res = await updateUser({
    //     gender: this.user.gender
    //   });
    //   console.log(this.user.gender);
    }
  },
  mounted() {
    this.loadpersonprofile();
  }
};
</script>

<style lang="less" scoped>
.myInfo {
  margin-top: 46px;
  .van-nav-bar {
    background: #1989fa;
    z-index: 99 !important;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon,
    .saveIt {
      color: #fff;
    }
  }
  .userphoto {
    padding-bottom: 0px;
  }
  .personimg {
    width: 30px;
    height: 30px;
  }
  .changename {
    color: #ccc;
  }
  .father {
    position: relative;
    .son {
      position: absolute;
      left: 0;
      top: -25px;
      opacity: 0;
      width: 100%;
    }
  }
  .usergender /deep/ .van-radio {
    margin-bottom: 10px !important;
  }
}
</style>