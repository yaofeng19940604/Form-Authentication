
import mpx from '@mpxjs/core'

class API {
  constructor () {
    this.env = 'remoteTest';

    ['delete', 'get', 'head', 'options', 'trace', 'post', 'put', 'patch'].forEach((method) => {
      API.prototype[method] = function (url, data, withUserInfo, config) {
        return this.request({
          ...config,
          method,
          url,
          data
        }, withUserInfo)
      }
    })
  }

  // 获取配置
  config () {
    return API._config[this.env]
  }

  // 网络请求
  // withUserInfo: 是否在 Header.UserInfo 中附带用户信息，需要提前授权。
  request (options, withUserInfo) {
    wx.showNavigationBarLoading()

    Promise.resolve().then(()=>{
      // 是否在 Header.UserInfo 中附带用户信息
      if (!withUserInfo) return;

      return mpx.getUserInfo({lang: 'zh_CN'}).then(res=>{
        let {nickName:nickname, avatarUrl:avatar, gender, city, province, country} = res.userInfo
        let info = {nickname, phone, avatar, gender, city, province, country}

      })
    }).then(userInfo=> {
      // 准备头部信息
      let header = {...(this.config().headers), ...options.header}
      if (userInfo) header.UserInfo = userInfo
      // 发启网络请求
      return mpx.request({
        ...options,
        url: `${options.baseURL || this.config().baseURL}${options.url}`,
        header,
        complete () {
          options.complete && options.complete()
          wx.hideNavigationBarLoading()
        }
      }).then((res) => {
        switch (res.statusCode) {
          case 200:
            return res.data
          default:
            console.warn(API.statusCode[res.statusCode])
            throw res
        }
      })
    })
  }
}

// 默认请求配置
API._config = {
  default: {
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
      'Authorization': ''
      // 'Authorization': 'Bearer 13b10a8f79b08d836d1a1a969115e499'
      // 'Accept': 'application/json, text/plain, */*',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Content-type': 'application/json',
    }
  },
  remoteTest: {
    baseURL: 'http://101.200.200.17:8000/api/v1',
    headers: {
      'Authorization': ''
    }
  }
}

API.statusCode = {
  200: '正常请求',
  401: '未登陆',
  403: '未授权接口',
  500: '服务器出错',
  502: '服务器出错',
  503: '哦～服务器宕机了'
}

export default API
