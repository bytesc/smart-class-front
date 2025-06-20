// pages/login/login.js
import utils from '../../utils/util.js';
let md5 = require('md5')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoginForm: function(e) {
    let {uid, password} = e.detail.value;
    const method = 'POST';

  // 验证手机号码长度
  if (uid.length != 11) {
    wx.showToast({
      title: '手机号码长度必须等于11位',
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
    const data = { uid, password };
    const url = "/login/"

    wx.showLoading({
      title: '登录中',
      mask: true
    });

    utils.request(url, method, data)
      .then(res => {
        console.log(res)
        wx.hideLoading();
        if(res.code===200){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          const userinfo = res.data
          console.log(res.data)
          wx.setStorageSync('userinfo', userinfo);
          if (userinfo.stu_info && userinfo.stu_info.class_name){
            wx.setStorageSync('curClass', userinfo.stu_info.class_name);
          }

          // wx.showLoading({
          //   title: '绑定中',
          //   mask: true
          // });
          // wx.login({
          //   success:(res)=>{
          //     console.log(res);
          //     let code=res.code
          //     let url = "/set-openid/"
          //     let method = "POST"
          //     let data = {uid:userinfo.uid, code:code}
          //     utils.request(url, method, data)
          //     .then(res => {
          //       wx.hideLoading();
          //       console.log(res)
          //     })
          //     .catch(err => {
          //       wx.hideLoading();
          //       console.log(err)
          //     });
          //   }
          // })

          wx.switchTab({
            url: '/pages/menu/menu',
          })
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