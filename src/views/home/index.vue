<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      slot="title"
      class="search-btn"
      size="small"
      icon="search"
      type="info"
      round
      to="/search"
      >搜索</van-button>
  </van-nav-bar>

  <!-- 标签页 -->

  <van-tabs class="channel-tabs" v-model="active" animated swipeable>
  <van-tab
  v-for="obj in channels" :key="obj.id"
  :title="obj.name"

  class="tabItem">
    <div class="inner">
    <article-list :channels= obj class="article" />
   </div>
  </van-tab>

  <div class="placeholder" slot="nav-right"></div>

  <div class="hamburger-btn" slot="nav-right" @click="ischennelEditshow=true">
    <i class="toutiao toutiao-gengduo"></i>
  </div>

</van-tabs>

 <van-popup
    v-model="ischennelEditshow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
    >
    <channel-edait :mychannels='channels' :active='active'
    @update-active='onUpdateActive'
    ></channel-edait>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article.vue'
import channelEdait from './component/channelEdait.vue'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    channelEdait
  },
  data () {
    return {
      active: 0,
      channels: [],
      ischennelEditshow: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])

  },
  methods: {
    // 获取频道列表数据
    async loadChannels () {
      try {
        let channelsItem = []
        if (this.user) {
          // 已登录，请求获取用户频道列表
          // console.log("已登录，请求获取用户频道列表");
          const { data } = await getUserChannels()
          channelsItem = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据

          const localChannels = await getItem('TOUTIAO_CHANNELS')
          // console.log('本地数据localChannels:');
          //  console.log(localChannels);

          if (localChannels && localChannels === undefined) {
            // console.log('未登录有数据' + localChannels );
            // 有 将本地数据赋值
            channelsItem = localChannels
          } else {
            //  console.log('未登录无数据'+ '发送请求');
            //    没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channelsItem = data.data.channels
          }
        }
        this.channels = channelsItem
      } catch (error) {

      }

      /*  try {
        const {data} =await getUserChannels()
        this.channels = data.data.channels
       // console.log(data.data.channels);
     } catch (error) {
       this.$toast('获取频道数据失败'+ error)

     } */
      // this.channels=await getItem('TOUTIAO_CHANNELS')
      // console.log(getItem('TOUTIAO_CHANNELS'));
    },
    onUpdateActive (index, flog) {
      this.active = index
      this.ischennelEditshow = flog
    }

  }

}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
 /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
