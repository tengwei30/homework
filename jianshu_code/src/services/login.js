import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

/**
 * 登录接口
 * @param {*} email jake@jake.jake
 * @param {*} password jakejake
 */
export const LogIn = (email, password) =>  {
  return instance.post('/api/users/login', {
    "user": {
      email,
      password
    }
  })
}

/**
 * 注册接口
 * @param {*} username  Jacob
 * @param {*} email jake@jake.jake
 * @param {*} password jakejake
 */
export const Register = (username,email,password) => {
  return instance.post('/api/users', {
    "user": {
      username,
      email,
      password
    }
  })
}