// pages/my-class/my-class.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_name:"",
    class_data:""
  },

  getUserInfo: function(){
    if(this.data.class_name != ""){
      let url = "/my-class/" + this.data.class_name
      let method = "POST"
      let data = {}
      utils.request(url, method, data)
      .then(res => {
        console.log(res)
        this.setData({
          class_data: res.data
        });
        // console.log(this.data.class_data)
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
    if (userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    let userinfo = wx.getStorageSync("userinfo")
    if (userinfo.stu_info && userinfo.stu_info.class_name){
      this.setData({
        class_name: userinfo.stu_info.class_name
      });
      // console.log(this.data.class_name)
      this.getUserInfo()
    }
    // if (userinfo.teacher_info && userinfo.stu_info.class_name){
    //   this.setData({
    //     class_name: userinfo.stu_info.class_name
    //   });
    //   // console.log(this.data.class_name)
    //   this.getUserInfo()
    // }
    
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