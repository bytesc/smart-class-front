// pages/lesson-grade/lesson-grade.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    grade_list:"",
    result_img: "",
    openedLessons: []
  },

  getLessonGradeList: function(className){
    if (this.data.userinfo==""){
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    let url = "/lesson-grade/" + className
    let method = "POST"
    let data = {}
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        const openedLessons = new Array(res.data.lesson_grade_list.length).fill(false)
        this.setData({
          grade_list: res.data,
          result_img: res.data.img_path,
          openedLessons: openedLessons
      });
    })
    .catch(err => {
      console.log(err)
    });
    
    
  },


  toggleLesson: function(e) {
    const index = e.currentTarget.dataset.index;
    const newOpenedLessons = [...this.data.openedLessons];
    newOpenedLessons[index] = !newOpenedLessons[index];
    this.setData({
      openedLessons: newOpenedLessons
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
      userinfo: userinfo
    })
    this.getLessonGradeList(className)
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
    this.onLoad()
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