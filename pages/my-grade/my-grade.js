// pages/my-grade/my-grade.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    gradeData:"",
    username:""
  },

  getGradeList: function(uid){
    if (this.data.userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    let url = "/stu-grade/" + uid
    let method = "POST"
    let data = {}
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        this.setData({
        gradeData: res.data
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
      username: userinfo.username
    })

    console.log(options)
    let { uid,username } = options
    if(username && username!=""){
      this.setData({
        username: username
      })
    }
    if(!uid || uid==""){
      uid=this.data.userinfo.uid
    }
    this. getGradeList(uid)
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