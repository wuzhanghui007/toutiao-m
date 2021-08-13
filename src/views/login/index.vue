<template>
<div class="login-container">
  <van-nav-bar class="page-nav-bar" title="登录" >
    <i slot="left" @click="$router.back()" ><van-icon class="icon" name="cross" /></i>
  </van-nav-bar>

  <van-form @submit="onSubmit" ref="loginForm">
  <van-field
    v-model="uesr.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="userFormRules.mobile"
    maxLength='11'
    type='number'

  >
  <i slot="left-icon" class=" toutiao toutiao-shouji"></i>
  </van-field>

  <van-field
    v-model="uesr.code"
    name="code"
    placeholder="请输入验证码"
    :rules="userFormRules.code"
    maxLength='6'

     native-type="button"
  >
   <i slot="left-icon" class=" toutiao toutiao toutiao-yanzhengma"></i>
  <template #button>
          <!--
            time: 倒计时时间
           -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
          native-type="button"
            v-else
            class="send-sms-btn"

            round
            size="small"
            type="default"

            @click="onSendSms"
          >发送验证码</van-button>
        </template>

   </van-field>

  <div class="login-btn-wrap">
    <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
  </div>
  </van-form>

  <div class="help">
          <h4>测试账号</h4>

         <div> mobile: 13911111111</div>
         <div>code:246810</div>

        </div>

</div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      uesr: {
        mobile: '', // 13911111111
        code: ''// 246810
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号码不能为空'
        },
        {
          pattern: /^1[3|4|5|7|8]\d{9}$/,
          message: '手机格式不正确'
        }],

        code: [{
          required: true,
          message: '请填写验证码'
        },
        {
          pattern: /^\d{6}$/,
          message: '请输入6位验证码'
        }]

      },

      isCountDownShow: false

    }
  },
  methods: {
    // 表单提交
    async onSubmit () {
      // vant 文本提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 请求登录
      try {
        // console.log(this.uesr)
        const { data } = await login(this.uesr)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // this.$router.push('/home')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },

    // 点击 发送验证码
    async onSendSms () {
      // 只验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        console.log('验证失败' + err)
        return
      }
      // 倒计时显示和隐藏
      this.isCountDownShow = true

      // 请求发送验证码
      try {
        await sendSms(this.uesr.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了')
        } else {
          this.$toast.fail('发送失败,请稍后重试')
        }
      }
    }

  }

}
</script>

<style scoped lang="less" >
 .login-container{
  .toutiao{
    font-size: 47px;
  }
    .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed !important;
    font-size: 22px;
    color: #666;
    padding: 0;
  }
  .van-button--default{
   background-color: #ededed;

  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .help{
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    font-size: 30px;
  }
}

</style>
