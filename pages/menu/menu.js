// pages/menu.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:"",
    userinfo:"",
    classList:"",
    currentClass: { name: '请选择班级', id: '' }
  },

  classChange: function(e) {
    const index = e.detail.value;
    const selectedClass = this.data.classList[index];
    this.setData({
      currentClass: selectedClass
    });
    wx.setStorageSync('curClass', selectedClass.name)
  },

  getTeacherClassList: function() {
    if (userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    let userinfo = wx.getStorageSync("userinfo")

    const url = "/teacher-class/" + userinfo.uid
    const method = 'POST'
    let data = {}
    utils.request(url, method, data)
    .then(res => {
      console.log(res)
      let classes = res.data.class_list
      if(classes.length>0){
        wx.setStorageSync('curClass', classes[0])
      }
      const formattedList = classes.map((className, index) => {
        return {
          id: index,
          name: className
        };
      });
      if(formattedList.length>0){
        this.setData({
          currentClass: formattedList[0],
          classList: formattedList
        });
      }
      
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
    this.setData({
      userinfo: userinfo
    });
    if(userinfo.teacher_info){
      this.setData({
        role: "teacher"
      });
      this.getTeacherClassList()
    }
    if(userinfo.stu_info){
      this.setData({
        role: "stu"
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
    let userinfo = wx.getStorageSync("userinfo")
    this.setData({
      userinfo: userinfo
    })
    if(userinfo.teacher_info){
      this.setData({
        role: "teacher"
      });
      this.getTeacherClassList()
    }
    if(userinfo.stu_info){
      this.setData({
        role: "stu"
      });
    }
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