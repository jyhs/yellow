function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function post (url, body) {
  let serverPath = 'https://api2.huanjiaohu.com'
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url,
      data: body,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        resolve(res.data) // 把返回的数据传出去
      },
      fail (ret) {
        reject(ret) // 把错误信息传出去
      }
    })
  })
}
export function get (url) {
  let serverPath = 'https://api2.huanjiaohu.com'
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        resolve(res.data) // 把返回的数据传出去
      },
      fail (ret) {
        reject(ret) // 把错误信息传出去
      }
    })
  })
}

export default {
  formatNumber,
  formatTime,
  post,
  get
}
