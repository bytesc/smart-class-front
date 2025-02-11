// pages/register/register.js
import utils from '../../utils/util.js';
let md5 = require('md5')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onRegisterForm: function(e) {
    let { uid, username, email, password, confirmPassword } = e.detail.value;
    const method = 'POST';

      // 验证用户名长度
    if (username.length < 1 || username.length > 50) {
      wx.showToast({
        title: '用户名长度必须在1到50个字符之间',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 验证手机号码长度
    if (uid.length != 11) {
      wx.showToast({
        title: '手机号码长度必须等于11位',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 验证两次输入的密码是否一致
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 验证密码长度
    if (password.length < 6) {
      wx.showToast({
        title: '密码长度不能小于6位',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    password =  md5(password);
    const data = { uid, username, email, password };
    const url = "/register/"
    utils.request(url, method, data)
      .then(res => {
        console.log(res)
        if(res.code===200){
          wx.redirectTo({
            url: '/pages/login/login',
          });
        }else{

        }
      })
      .catch(err => {
        // 注册失败处理
      });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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