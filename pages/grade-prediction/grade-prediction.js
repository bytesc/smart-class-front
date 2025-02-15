// pages/grade-prediction/grade-prediction.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getGradePrediction: function(className, lessonId){
    let url = "/class-grade-prediction/"
    let method = "POST"
    let data = {
      class_name:className,
      lesson_id:lessonId
    }
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
      //   this.setData({
      //   gradeData: res.data
      // });
    })
    .catch(err => {
      console.log(err)
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGradePrediction("计211","DWDwwdwq")
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