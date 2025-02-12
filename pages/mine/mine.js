// pages/mine/mine.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },

  // getUserInfo: function(){
  //   var userinfo = wx.getStorageSync('userinfo');
  //   if (userinfo==""){
  //     wx.redirectTo({
  //       url: '/pages/login/login',
  //     });
  //   }else{
  //     const url = "/userinfo/" + userinfo.uid
  //     const method = 'POST'
  //     let data = {}
  //     utils.request(url, method, data)
  //     .then(res => {
  //       console.log(res)
  //       this.setData({
  //         userinfo: res.data
  //       });
  //     })
  //     .catch(err => {
  //       // 失败处理
  //     });
  //   }
  // },

  handleLogout : function(e){
    wx.setStorageSync("userinfo","")
    wx.setStorageSync("token","")
    wx.setStorageSync("curClass","")

    wx.showToast({
      title: "已退出登录",
      icon: 'success',
      duration: 2000
    })

    wx.redirectTo({
      url: '/pages/login/login',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo: userinfo
    });
    if (userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})