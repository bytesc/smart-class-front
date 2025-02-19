// pages/copilot/copilot.js
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:"",
    userinfo:{},
    className:"",
    question: "",
    answer: "",
    questionHistory:"",
    chatHistory: [],
  },

  bindInput: function(e) {
    this.setData({
      question: e.detail.value
    });
  },

  askAgent: function(){
    let newQuestion =  this.data.questionHistory + this.data.question;
    if (newQuestion === "") {
      wx.showToast({
        title: '请输入问题',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '问题提交成功',
      icon: 'none'
    });

    let url = "/ai-agent/"
    let method = "POST"
    let data = {question:newQuestion}
    utils.request(url, method, data)
    .then(res => {
        console.log(res)
        console.log(res.data.ans)
        this.setData({
          answer: res.data.ans,
          chatHistory: [...this.data.chatHistory, { question: this.data.question, answer: res.data.ans }],
          questionHistory: newQuestion
        });
        this.setData({
          question: ""
        });
    })
    .catch(err => {
      console.log(err)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
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
    
    if(userinfo.teacher_info){
      this.setData({
        role: "teacher"
      });
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

    // this.askAgent()

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