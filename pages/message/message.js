// pages/message/message.js
import utils from '../../utils/util.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    message_list:"",
    openedMessages: []
  },

  getMessageList: function(){
    if (this.data.userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    let url = "/message-list/"+this.data.userinfo.uid
    let method = "POST"
    let data = {}
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        const openedMessages = new Array(res.data.message_list.length).fill(false)
        this.setData({
          openedMessages: openedMessages,
          message_list: res.data.message_list
      });
    })
    .catch(err => {
      console.log(err)
    });
  
  },

  toggleMessage: function(e) {
    const index = e.currentTarget.dataset.index;
    const newOpenedMessages = [...this.data.openedMessages];
    newOpenedMessages[index] = !newOpenedMessages[index];
    this.setData({
      openedMessages: newOpenedMessages
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
    this.getMessageList()
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