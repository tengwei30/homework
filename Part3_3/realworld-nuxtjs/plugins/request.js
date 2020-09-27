/**
 * 基于axios 封装请求模块
 */
import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// 通过插件机制获取上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为默认成员
export default ({ store }) => {
  // 请求拦截器
  // 任何请求都要经过拦截器
  // 可以在请求拦截器中做一些公共的业务处理，例如统一设置token
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }

      // 返回config, 请求配置对象
      return config
    },
    function(error) {
      // 如果请求失败（请求还没发出去）进入这里
      return Promise.reject(error)
    }
  )
}
