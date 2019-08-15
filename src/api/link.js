import API from './api'

class Link extends API {
  // 创建接龙
  create (link) {
    return this.post('/link/purcharse', link, true)
  }

  // 获取接龙详情
  fetch (id) {
    return this.get(`/link/purcharse/${id}`)
  }

  // 参与接龙
  follow (id, link) {
    return this.post(`/link/purcharse/follow/${id}`, link)
  }

  // 接龙（支付）成功后回调
  followSuccess (followId) {
    return this.post(`/link/purcharse/follow/success/${followId}`)
  }
}

export default new Link()
