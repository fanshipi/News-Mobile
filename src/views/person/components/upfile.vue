<template>
  <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false">
    <van-cell-group>
      <van-cell title="拍照" />
      <van-cell title="从相册中选择" is-link @click="openfile">
        <template slot="label">
          <div class="father">
            <input type="file" class="son" ref="myfile" style="display:none;" />
          </div>
        </template>
      </van-cell>

      <van-cell title="取消" @click="$emit('input',false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { userPhotoupDate } from "@/api/user";
// 导入图片路径
import { ImagePreview } from "vant";
export default {
  props: ["value"],
  computed: {
    myfile: function() {
      console.log(this.$refs["myfile"]);
    },
    file: function() {
      return this.$refs["myfile"];
    }
  },
  methods: {
    // 点击“选择图片”的事件触发点击选择图片按钮的事件发生
    openfile() {
      // this.$refs['myfile'].click()
      this.file.onchange = () => {
        // console.log(this.file.files[0]);
        let imgfiles = this.file.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", res => {
          // console.log(res);
          ImagePreview({
            images: [res.target.result],
            onClose() {
              this.$dialog
                .confirm({
                  title: "提示",
                  message: "确认将该图片设置为当前头像吗？"
                })
                .then(async() => {
                  // on confirm
                  let backData = await userPhotoupDate(imgfiles);
                  console.log(backData);
                  this.$emit('changeUserImg',backData)
                  this.$toast.success("修改头像成功")
                })
                .catch(() => {
                  // on cancel
                });
            }
          });
        });
        reader.readAsDataURL(imgfiles);
        this.$emit("input", false);
      };
      this.file.click();
    }
  }
};
</script>

<style>
</style>