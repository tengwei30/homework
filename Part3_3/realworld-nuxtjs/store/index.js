// 如果是服务端就加载这个包
const cookieParser = process.server ? require('cookieparser') : undefined

// 为了防止数据冲突，务必把 state 定义成一个函数
export const state = () => {
  return {
    // 当前登录用户的状态
    user: null,
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // 是一个特殊的action 方法， 会在服务端渲染期间自动调用
  // 作用： 初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用cookiepaeser 把 cookie 字符串转为Javascript 对象
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  },
}
