// pages/grade-prediction/grade-prediction.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    className:"",
    predictable_lessons:"",
    prediction_result:"",
    lessonList: [],
    selectedLessonId: "", // 选中的课程ID
    selectedLessonName: "请点击选择课程" // 选中的课程名称
  },

  getGradePrediction: function(className, lessonId){
    let url = "/class-grade-prediction/"
    let method = "POST"
    let data = {
      class_name:className,
      lesson_id:lessonId
    }
    wx.showLoading({
      title: '登录中',
      mask: true
    });
    utils.request(url, method, data)
    .then(res => {
      wx.hideLoading();
        console.log(res)
        this.setData({
          prediction_result: res.data.result
      });
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
    
  },


  getPredictiableLessons: function(){
    let url = "/check-predictable-lessons/"
    let method = "POST"
    let data = {
    }
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        let lessonList = res.data.dataset_length_list.map(item => {
          return {
            id: item.lesson_id,
            name: item.lesson_name
          };
        });
        this.setData({
          predictable_lessons: res.data.dataset_length_list,
          lessonList: lessonList
      });
    })
    .catch(err => {
      console.log(err)
    });
    
  },


  onLessonChange: function(e) {
    let index = e.detail.value;
    let selectedLesson = this.data.lessonList[index];
    this.setData({
      selectedLessonId: selectedLesson.id,
      selectedLessonName: selectedLesson.name
    });

    this.getGradePrediction(this.data.className, this.data.selectedLessonId);
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
    this.getPredictiableLessons()
    // this.getGradePrediction("计211","DWDwwdwq")
    
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
    if(this.data.selectedLessonId!=""){
      this.getGradePrediction(this.data.className, this.data.selectedLessonId);
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