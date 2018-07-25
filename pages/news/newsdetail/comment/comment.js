// pages/news/newsdetail/comment/comment.js
var page = 1,
  pageSize = 10

Page({
  data: {
    reachBottom: false,
    reset: '',

  },

  onLoad: function(options) {
    console.log("page=" + page)
    var id = options.id,
      _this = this;
    _this.setData({
      id: id
    })
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheCommentList.php',
      method: 'POST',
      data: {
        newsId: id,
        userId: '5b39b27067f356003815884d',
        page: 1,
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
        for (var i = 0; i < res.data.data.length; i++) {
          var param = {}
          var string = "comment[" + i + "].content"
          param[string] = res.data.data[i].content


          var string = "comment[" + i + "].username"
          param[string] = res.data.data[i].username


          var string = "comment[" + i + "].date"
          param[string] = res.data.data[i].createdAt.date

          var string = "comment[" + i + "].likeNumber"
          param[string] = res.data.data[i].likeNumber

          var string = "comment[" + i + "].id"
          param[string] = res.data.data[i].commentId


          var string = "comment[" + i + "].like"
          param[string] = res.data.data[i].like


          var string = "comment[" + i + "].dislike"
          param[string] = res.data.data[i].dislike
          _this.setData(param)

        }
      }
    })
  },

  message: function(res) {
    this.setData({
      content: res.detail.value
    })
  },

  replySubmit: function(res) {
    var _this = this
    wx.request({
      url: 'http://139.199.79.232/HearFresh/CreateComment.php',
      method: 'POST',
      data: {
        content: _this.data.content,
        userId: '5b39b27067f356003815884d',
        newsId: _this.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

    })

    console.log(_this.data.content)
    _this.setData({
      reset: '',
      "fakeComment[0].content": _this.data.content
    })

    console.log("fuck:" + _this.data.fakeComment[0].content)
    wx.showToast({
      title: '发送成功！',
    })

  },

  likeComment: function(event) {
    var _this = this,
      likeId = event.target.dataset.likeid
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
      success: function() {
        var fuck;
        for (var i = 0; i < 100; i++) {
          if (likeId == _this.data.comment[i].id) {
            fuck = i;
            i = 101;
          }
        }
        var param = {}
        var string = "comment[" + fuck + "].like"
        param[string] = !_this.data.comment[fuck].like
        _this.setData(param)
        if (_this.data.comment[fuck].like == true) {
          var likeNumber = "comment[" + fuck + "]likeNumber"
          param[likeNumber] = _this.data.comment[fuck].likeNumber + 1
          _this.setData(param)
        } else {
          var likeNumber = "comment[" + fuck + "]likeNumber"
          param[likeNumber] = _this.data.comment[fuck].likeNumber - 1
          _this.setData(param)
        }
      }
    })
  },

  dislikeComment: function(event) {
    var _this = this,
      dislikeId = event.target.dataset.dislikeid
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
      success: function() {
        var fuck;
        for (var i = 0; i < 100; i++) {
          if (dislikeId == _this.data.comment[i].id) {
            fuck = i;
            i = 101;
          }
        }
        var param = {}
        var string = "comment[" + fuck + "].dislike"
        param[string] = !_this.data.comment[fuck].dislike
        _this.setData(param)
      }
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page++
    var _this = this,
      id = _this.data.id,
      fuck = (page - 1) * pageSize
    console.log("fuck" + fuck)
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheCommentList.php',
      method: 'POST',
      data: {
        newsId: id,
        userId: '5b39b27067f356003815884d',
        page: page,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        console.log(res.data)
        if (res.data.data.length == 0) {
          _this.setData({
            reachBottom: true
          })
          page--
        } else {
          console.log("下拉成功")
          for (var i = 0; i < res.data.data.length; i++, fuck++) {
            var param = {}
            var string = "comment[" + fuck + "].content"
            param[string] = res.data.data[i].content


            var string = "comment[" + fuck + "].username"
            param[string] = res.data.data[i].username


            var string = "comment[" + fuck + "].date"
            param[string] = res.data.data[i].createdAt.date

            var string = "comment[" + fuck + "].likeNumber"
            param[string] = res.data.data[i].likeNumber

            var string = "comment[" + fuck + "].id"
            param[string] = res.data.data[i].commentId


            var string = "comment[" + fuck + "].like"
            param[string] = res.data.data[i].like


            var string = "comment[" + fuck + "].dislike"
            param[string] = res.data.data[i].dislike
            _this.setData(param)

          }
        }
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
    page = 1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})