// pages/announcement-list/announcement-list.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    announcement_list:""
  },


  getAnnouncementList: function(){
    let url = "/announcement-list/"+this.data.className
    let method = "POST"
    let data = {}
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        this.setData({
          announcement_list: res.data.announcement_list
      });
    })
    .catch(err => {
      console.log(err)
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
    })
    this.getAnnouncementList()
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
    this.onLoad(this.options)
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