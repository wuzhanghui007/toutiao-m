<template>
  <div class="my-container">

    <!-- 已登录 -->
     <div class="hearder  user-info"  v-if="user">
       <div class="base-info">
         <div class="left">
              <van-image class="avatar"

             src="https://img01.yzcdn.cn/vant/cat.jpeg"
             round
               />
              <span>{{userInfo.intro}}</span>
         </div>
         <div class="right">
           <van-button type="default" round  size="mini">编辑资料</van-button>
         </div>
       </div>
       <div class="data-stats">
         <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
         </div>
          <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
         </div>
          <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
         </div>
          <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
         </div>

       </div>

    </div>
       <!-- 未登录 -->
    <div class="hearder not-login" v-else >
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" >
        <span class="text">登录/注册</span>
      </div>

    </div>

    <van-grid clickable :column-num="2" class="grid-nav">
     <van-grid-item  to="#" class="grid-item" >
       <i slot="icon" class="toutiao toutiao-shoucang"></i>
       <span slot="text">收藏</span>
     </van-grid-item>
     <van-grid-item   to="#" class="grid-item"  >
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
     </van-grid-item>
   </van-grid>

   <van-cell-group  >
  <van-cell title="消息通知"  is-link to="#" class="lead_item"  />
  <van-cell title="小智同学"  is-link to="#" class="lead_item" />

</van-cell-group>
<van-cell title="退出登录"  v-if="user"  clickable class="quit_item" @click="onLogout"/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}// 用户信息

    }
  },
  computed: {
    ...mapState(['user'])// 获取全局 $store.state.user

  },
  created () {
    if (this.user) {
      // 获取用户信息
      this.losdUserInfo()
    }
  },

  methods: {
    onLogout () {
      this.$dialog.confirm({

        message: '是否取消退出'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消退出')
        })
    },
    async losdUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(data.data)
      } catch (err) {
        console.log('获取用户信息失败' + err)
      }
    }

  }

}
</script>

<style lang="less" scoped>
.my-container{
  .hearder{
    height: 361px;
    background:url("~@/assets/banner.png");
    background-size: cover;

  }
    .not-login{
       display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
     display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
         width: 132px;
         height: 132px;
         margin-bottom: 15px;

      }
      .text{
        font-size: 28px;
        color: #fff;
      }

    }
    }
    .user-info{
      .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
       .left{
         display: flex;
         align-items: center;
         .avatar{
           width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
         }
         span{
           font-size: 30px;
          color: #fff;
         }

       }
    }
    .data-stats{
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 30px 0;
    }
    .data-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      .count{

        font-size:36px;
      }
      .text{
        font-size:20px;
      }

    }
    }
    .grid-nav{
      margin-bottom: 9px;
      .grid-item{
        height: 141px;

        .toutiao{
          font-size: 45px; padding: 26px 0;
        }
        span{
           font-size: 28px;
        }
         .toutiao-shoucang {
          color: #eb5253;
          }
         .toutiao-lishi {
          color: #ff9d1d;
         }

      }

    }
    .lead_item{
      height: 100px;
      font-size:30px ;
    }
    .quit_item{
      margin-top: 9px;
      height: 100px;
      line-height: 65px;
      text-align: center;
      color: #d86262;
      font-size: 30px;
    }

}

</style>
