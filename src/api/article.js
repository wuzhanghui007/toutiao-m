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

/**
 * 获取文章具体内容
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

/**
 * 点赞文章
 */
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

/**
 * 取消点赞文章
 */
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
