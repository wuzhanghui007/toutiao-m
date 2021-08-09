import request from '@/utils/request'

/* 获取推荐列表数据 */

export const getSearchSuggestions = (q) => {
  return request({
    url: 'app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
/* 获取搜索结果数据 */

export const getSearchResult = (params) => {
  return request({
    url: 'app/v1_0/search',
    method: 'GET',
    params
  })
}
