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
