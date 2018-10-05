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
    this.setData({
      username: options.username,
      likeNumber: options.likeNumber,
      date: options.date,
      content: options.content,
      like: options.like,
      dislike: options.dislike,
      id: options.commentId
    })
    var _this = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    console.log(options.commentId)

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
      },
      complete: function() {
        wx.hideToast();
      }
    })
  },

  //点赞
  likeComment: function(event) {
    var _this = this,
      likeId = event.target.dataset.likeid,
      param = {},
      fuck;
    for (var i = 0; i < 100; i++) {
      if (likeId == _this.data.comment[i].id) {
        fuck = i;
        i = 101;
      }
    }
    if (_this.data.comment[fuck].like == false) {
      var likeNumber = "comment[" + fuck + "]likeNumber"
      param[likeNumber] = _this.data.comment[fuck].likeNumber + 1
      var string = "comment[" + fuck + "].like"
      param[string] = !_this.data.comment[fuck].like
      _this.setData(param)
    } else {
      var likeNumber = "comment[" + fuck + "]likeNumber"
      param[likeNumber] = _this.data.comment[fuck].likeNumber - 1
      var string = "comment[" + fuck + "].like"
      param[string] = !_this.data.comment[fuck].like
      _this.setData(param)
    }
    wx.request({
      url: 'http://139.199.79.232/HearFresh/LikeComment.php',
      method: 'POST',
      data: {
        userId: '5b39b27067f356003815884d',
        commentId: likeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        /*  var confirmData = "comment[" + fuck + "].like"
          param[confirmData] = res.data.data.like
          _this.setData(param)*/
      }
    })
  },

  //点踩
  dislikeComment: function(event) {
    var _this = this,
      dislikeId = event.target.dataset.dislikeid,
      param = {},
      fuck;
    for (var i = 0; i < 100; i++) {
      if (dislikeId == _this.data.comment[i].id) {
        fuck = i;
        i = 101;
      }
    }
    var name = "comment[" + fuck + "].dislike"
    param[name] = !_this.data.comment[fuck].dislike
    _this.setData(param)
    wx.request({
      url: 'http://139.199.79.232/HearFresh/DislikeComment.php',
      method: 'POST',
      data: {
        userId: '5b39b27067f356003815884d',
        commentId: dislikeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        /* name = "comment[" + fuck + "].dislike"
         param[name] = res.data.data.dislike
         _this.setData(param)*/
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