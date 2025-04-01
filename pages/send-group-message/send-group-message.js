// pages/send-group-message/send-group-message.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    receiver:""
  },


  onSendForm: function(e) {
    const method = 'POST';
    const { content } = e.detail.value; 
    let class_name = this.data.receiver
    const data = { class_name, content };
    const url = "/send-class-message/"

    wx.showLoading({
      title: '发送中',
      mask: true
    });

    utils.request(url, method, data)
      .then(res => {
        wx.hideLoading();
        console.log(res)
        if(res.code===200){
          wx.navigateBack()
        }else{

        }

      })
      .catch(err => {
        wx.hideLoading();
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userinfo = wx.getStorageSync("userinfo")
    let className = wx.getStorageSync("curClass")
    this.setData({
      className: className,
      userinfo: userinfo,
      receiver: className
    })

    if (this.data.userinfo==""){
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