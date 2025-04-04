// pages/change-pwd/change-pwd.js
import utils from '../../utils/util.js';
let md5 = require('md5')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
  },


  onChangePwdForm: function(e) {
    let {oldPwd, newPwd, confirmNewPwd } = e.detail.value;
    const method = 'POST';

        // 验证密码长度
        if (newPwd.length < 6) {
          wx.showToast({
            title: '密码长度不能小于6位',
            icon: 'none',
            duration: 2000
          });
          return;
        }

    // 验证两次输入的密码是否一致
    if (newPwd !== confirmNewPwd) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
        duration: 2000
      });
      return;
    }


    let new_password =  md5(newPwd);
    let old_password =  md5(oldPwd);

    const uid = this.data.userinfo.uid
    const data = { uid, old_password, new_password };
    const url = "/change-pwd/"
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

      });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo: userinfo
    })

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