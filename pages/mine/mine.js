// pages/mine/mine.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  getUserInfo: function(){
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }else{
      const url = "/userinfo/" + userInfo.uid
      const method = 'POST'
      let data = {}
      utils.request(url, method, data)
      .then(res => {
        console.log(res)
        this.setData({
          userInfo: res.data
        });
      })
      .catch(err => {
        // 失败处理
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
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
    this.getUserInfo()
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