import request from '@/utils/request'

/* 请求文章数据 */

export const getArticles = (params) => {
  return request({
    url: 'app/v1_1/articles',
    method: 'GET',
    /* Headers: {
      ContentType: 'application/json'

    }, */

    params
  })
}
