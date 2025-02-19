// pages/menu.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:"",
    userinfo:{},
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
    if (this.data.userinfo==""){
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
      const formattedList = classes.map((className, index) => {
        return {
          id: index,
          name: className
        };
      });
      if(formattedList.length>0){
        this.setData({
          classList: formattedList
        });
      }
      // console.log(this.data.currentClass)
      if(this.data.currentClass.id==""){
        this.setData({
          currentClass: formattedList[0],
        });
        wx.setStorageSync('curClass', classes[0])
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
    else if(userinfo.stu_info){
      this.setData({
        role: "stu"
      });
    }
    else{
      this.setData({
        role: ""
      });
    }
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
    this.onShow()

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