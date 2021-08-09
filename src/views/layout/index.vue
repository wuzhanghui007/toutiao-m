<template>
<div class="layout-container">
  <router-view></router-view>

<!-- 底部导航 -->
<van-tabbar  class="layout-tabbar" route active-color="#ee0a24" inactive-color="#000">
  <van-tabbar-item to="/home"  replace >
    <i slot="icon" class="toutiao toutiao-shouye"></i>
    <span>首页</span>
  </van-tabbar-item>

  <van-tabbar-item to="/qa">
    <i slot="icon" class="toutiao toutiao-wenda"></i>
    <span>问答</span>
  </van-tabbar-item>

  <van-tabbar-item to="/video">
    <i slot="icon" class="toutiao toutiao-shipin"></i>
    <span>视频</span>
  </van-tabbar-item>

  <van-tabbar-item to="/my" >
    <i slot="icon" class="toutiao toutiao-wode"></i>
    <span>{{$store.state.user? "我的":"未登录"}}</span>
  </van-tabbar-item>
</van-tabbar>

</div>

</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style lang="less" scoped>
.layout-container{
 /deep/ .layout-tabbar{
    .toutiao{
      font-size: 40px;
    }

    span{
      font-size: 20px;
    }

  }

}

</style>
