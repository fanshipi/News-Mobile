<template>
  <van-popup v-model="gendershow" :style="{ height: '11%',width:'30%' }">
    <van-cell>
      <van-radio-group v-model="radio">
        <van-radio name="0">男</van-radio>
        <van-radio name="1">女</van-radio>
      </van-radio-group>
    </van-cell>
  </van-popup>
</template>

<script>
export default {};
</script>

<style>
</style>