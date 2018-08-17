// pages/news/newsdetail/comment/reply/reply.js
var util = require('../../../../../utils/util.js'),
  page = 1,
  pageSize = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheReplyList.php',
      method: 'POST',
      data: {
        commentId: options.commentId,
        userId: '5b39b27067f356003815884d',
        page: page,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.data.length < pageSize) {
          _this.setData({
            reachBottom: true
          })
        }
        console.log(res.data)
        var time;

        for (var i = 0; i < res.data.data.length; i++) {
          var param = {}
          var string = "comment[" + i + "].content"
          param[string] = res.data.data[i].content


          var string = "comment[" + i + "].username"
          param[string] = res.data.data[i].username


          var string = "comment[" + i + "].date",
            createdAt = res.data.data[i].createdAt * 1000,
            date = util.formatTime(new Date(createdAt))
          param[string] = date

          var string = "comment[" + i + "].likeNumber"
          param[string] = res.data.data[i].likeNumber

          var string = "comment[" + i + "].id"
          param[string] = res.data.data[i].replyId


          var string = "comment[" + i + "].like"
          param[string] = res.data.data[i].like


          var string = "comment[" + i + "].dislike"
          param[string] = res.data.data[i].dislike

          var string = "comment[" + i + "].targetUsername"
          param[string] = res.data.data[i].targetUsername
          _this.setData(param)

        }
        wx.hideToast();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})