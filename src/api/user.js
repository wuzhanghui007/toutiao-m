import request from '@/utils/request'

// 用户登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: 'app/v1_0/authorizations',
    data
  })
}

// 发送验证码请求 /app/v1_0/sms/codes/:mobile
export const sendSms = data => {
  return request({
    method: 'GET',
    url: `app/v1_0/sms/codes/${data}`

  })
}
/// app/v1_0/user/profile
// 获取用户数据
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user'
    /* headers: {
      //Authorization: `Bearer ${store.state.user.token}`

    } */

  })
}

// 获取用户频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/channels'
    /*  headers: {
         Authorization: `Bearer ${store.state.user.token}`
           // Authorization: `Bearer ${store.state.user.token}`
       } */

  })
}
