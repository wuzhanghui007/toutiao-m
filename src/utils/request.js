/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
// 引入超出js安全处理的函数包
import JSONBig from 'json-bigint'

const request = axios.create({
  // http://ttapi.research.itcast.cn/
  // http://toutiao-app.itheima.net/
  // http://toutiao.itheima.net/api.html#
  // http://toutiao.itheima.net/'
  baseURL: 'http://toutiao.itheima.net', // 接口的基准路径http://toutiao-app.itheima.net/
  timeout: 10000,
  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]

})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  // console.log(user.user);
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
