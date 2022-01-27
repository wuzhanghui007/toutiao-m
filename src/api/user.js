import request from '@/utils/request'

// 用户登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码请求 /app/v1_0/sms/codes/:mobile
export const sendSms = data => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${data}`

  })
}
/// app/v1_0/user/profile
// 获取用户数据
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    /* headers: {
          //Authorization: `Bearer ${store.state.user.token}`

        } */

  })
}

// 获取用户频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
    /*  headers: {
             Authorization: `Bearer ${store.state.user.token}`
               // Authorization: `Bearer ${store.state.user.token}`
           } */

  })
}

/**
 * 关注用户
 */
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    // app/v1_0/user/followings
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
    // app/v1_0/user/followings/:target
  })
}
/**
   * 获取当前登录用户的个人资料
   */
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
