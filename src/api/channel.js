// import '@/utils/request'
import request from '../utils/request'
/**
 * 获取所有频道列表
 */
export const getAllchannels = () => {
  return request({
    method: 'GEt',
    url: 'app/v1_0/channels'
  })
}

/**
 * 添加用户频道
 */
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
