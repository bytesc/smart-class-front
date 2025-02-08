const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const request = (url, method, data = {}) => {
  return new Promise((resolve, reject) => {
    const app = getApp();
    const serverUrl = app.globalData.serverUrl;
    wx.request({
      url: serverUrl + url, // 服务器url
      method: method, // 请求方法
      data: data, // 请求参数
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // 成功处理
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail(err) {
        // 失败处理
        reject(err);
      }
    });
  });
};

module.exports = {
  formatTime,
  request
}
