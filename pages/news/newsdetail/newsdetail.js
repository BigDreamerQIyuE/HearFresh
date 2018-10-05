var util = require('../../../utils/util.js'),
  page = 1,
  pageSize = 10
Page({

  data: {

  },

  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载',
    })
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth
    this.setData({
      scrheight: scrwidth / 1.78,
      headTop: scrwidth / 1.78 * 0.75,
      sheadTop: scrwidth / 1.78 * 0.85,
    })
    var _this = this
    var id = '5b5014952f301e003bb8892a'; //更改初始获取的新闻Id
    //请求文章详细内容
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetNewsByObjectId',
      method: 'POST',
      data: {
        newsId: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var createdAt = res.data.data.createdAt * 1000,
          date = util.formatTime(new Date(createdAt))
        console.log(res.data)
        _this.setData({
          title: res.data.data.title,
          description: res.data.data.description,
          content: res.data.data.content,
          author: res.data.data.author,
          reading: res.data.data.reading,
          cover: res.data.data.cover,
          id: id,
          date: date
        })
      },
      fail: function() {
        wx.showActionSheet({
          itemList: ["fuck fail"],
        })
      }
    })

    //请求是否收藏数据
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/Collect',
      method: 'POST',
      data: {
        userId: '5b58394fee920a003ca68a9f', //应实现动态
        newsId: options.id,
        collectAction: false
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(collection) {
        console.log(collection.data.data.collection)
        _this.setData({
          collect: collection.data.data.collection
        })
        wx.hideLoading()
      },

      fail: function() {
        wx.showActionSheet({
          itemList: ["fuck fail"],
        })
      }
    })
    //请求第一页评论
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheCommentList',
      method: 'POST',
      data: {
        newsId: id,
        userId: '5b39b27067f356003815884d', //应动态实现，相关api不完善
        page: 1,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        if (res.data.data == null) {
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
          param[string] = res.data.data[i].commentId


          var string = "comment[" + i + "].like"
          param[string] = res.data.data[i].like


          var string = "comment[" + i + "].dislike"
          param[string] = res.data.data[i].dislike

          var string = "comment[" + i + "].replyNumber"
          param[string] = res.data.data[i].replyNumber

          if (res.data.data[i].replyComment != null) {

            var string = "comment[" + i + "].replyComment.content"
            param[string] = res.data.data[i].replyComment.content

            var string = "comment[" + i + "].replyComment.username"
            param[string] = res.data.data[i].replyComment.username
          }

          var string = "comment[" + i + "].commentId"
          param[string] = res.data.data[i].commentId
          _this.setData(param)

        }
      },
      complete: function() {
        wx.hideToast()
      }
    })


  },
  //评论页入口
  toComment: function(event) {

  },

  //收藏
  collect: function(res) {
    var _this = this
    _this.setData({
      collect: !_this.data.collect
    })
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/Collect',
      method: 'POST',
      data: {
        userId: '5b58394fee920a003ca68a9f',
        newsId: _this.data.id,
        collectAction: true
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        console.log("collect success")
      },

      fail: function() {
        wx.showActionSheet({
          itemList: ["连接错误"],
        })
      }
    })
  },

  message: function(res) {
    this.setData({
      content: res.detail.value
    })
  },
  //提交信息
  replySubmit: function(res) {
    if (this.data.content == false) {
      wx.showToast({
        title: '请输入信息!',
        icon: 'none'
      })
    } else {
      var _this = this
      wx.request({
        url: 'https://hearfresh.leanapp.cn/api/v1/CreateComment',
        method: 'POST',
        data: {
          content: _this.data.content,
          userId: '5b39b27067f356003815884d',
          newsId: _this.data.id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function() {
          var
            t = util.formatTime(new Date()),
            standerdTime = new Date(t),
            currentTime = standerdTime.getTime(),
            date = util.formatTime(new Date(currentTime))
          _this.setData({
            "fakeComment[0].date": date
          })
        }
      })

      console.log(_this.data.content)
      _this.setData({
        reset: '',
        sendButtonState: false,
        "fakeComment[0].content": _this.data.content,
        content: false,
      })

      console.log("fuck:" + _this.data.fakeComment[0].content)
      wx.showToast({
        title: '发送成功！',
      })
    }
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
      url: 'https://hearfresh.leanapp.cn/api/v1/LikeComment',
      method: 'POST',
      data: {
        userId: '5b39b27067f356003815884d',
        commentId: likeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("like success")
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
      url: 'https://hearfresh.leanapp.cn/api/v1/DislikeComment',
      method: 'POST',
      data: {
        userId: '5b39b27067f356003815884d',
        commentId: dislikeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("dislike success")
        /* name = "comment[" + fuck + "].dislike"
         param[name] = res.data.data.dislike
         _this.setData(param)*/
      }
    })
  },

  sendButtonShow: function() {
    this.setData({
      sendButtonState: true
    })
  },
  sendButtonHide: function() {
    this.setData({
      sendButtonState: false
    })
  },
  toReply: function(event) {
    var username = event.target.dataset.username,
      commentId = event.target.dataset.commentid,

      likeNumber = event.target.dataset.likenumber,
      date = event.target.dataset.date,
      content = event.target.dataset.content,
      like = event.target.dataset.like,
      replyNumber = event.target.dataset.replynumber,
      dislike = event.target.dataset.dislike;

    wx.navigateTo({
      url: 'reply/reply?commentId=' + commentId + '&username=' + username + '&likeNumber=' + likeNumber + '&date=' + date + '&content=' + content + '&like=' + like + '&dislike=' + dislike + '&replyNumber=' + replyNumber
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '正在加载',
    })
    page++
    var _this = this,
      id = _this.data.id,
      fuck = (page - 1) * pageSize
    console.log("fuck" + fuck)
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheCommentList',
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
        if (res.data.data == null) {
          _this.setData({
            reachBottom: true
          })
          page--
        } else {
          console.log("下拉成功")
          for (var i = 0; i < res.data.data.length; i++, fuck++) {
            var param = {},
              string = "comment[" + fuck + "].content"
            param[string] = res.data.data[i].content


            var string = "comment[" + fuck + "].username"
            param[string] = res.data.data[i].username


            var string = "comment[" + fuck + "].date",
              createdAt = res.data.data[i].createdAt * 1000,
              date = util.formatTime(new Date(createdAt))
            param[string] = date

            var string = "comment[" + fuck + "].likeNumber"
            param[string] = res.data.data[i].likeNumber

            var string = "comment[" + fuck + "].id"
            param[string] = res.data.data[i].commentId


            var string = "comment[" + fuck + "].like"
            param[string] = res.data.data[i].like

            var string = "comment[" + fuck + "].replyNumber"
            param[string] = res.data.data[i].replyNumber


            var string = "comment[" + fuck + "].dislike"
            param[string] = res.data.data[i].dislike

            if (res.data.data[i].replyComment != null) {

              var string = "comment[" + fuck + "].replyComment.content"
              param[string] = res.data.data[i].replyComment.content

              var string = "comment[" + fuck + "].replyComment.username"
              param[string] = res.data.data[i].replyComment.username
            }
            _this.setData(param)
          }
        }

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },


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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})