// app.js
App({
  towxml:require('/towxml/index'),
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.getUserInfo({
    //   success:(res)=>{
    //     console.log(res);
    //     wx.setStorageSync('wechatUser', res);
    //   }
    // })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

  },
  globalData: {
    logs:"",
    userinfo: "",
    wechatUser:"",
    token: "",
    curClass:""
  }
})
