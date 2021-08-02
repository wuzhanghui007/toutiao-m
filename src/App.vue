<template>
  <div id="app">
    <div  class="text">222</div>
    <div>
      <i class=" toutiao toutiao-dianzan2"></i>
    </div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'

}
</script>

<style scoped>
.text{
  width: 375px;
  height: 50px;
  background-color: pink;
}

</style>
