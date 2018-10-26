var util = require('../../../utils/util.js'),
  page = 1,
  pageSize = 10
Page({

  data: {
    commentInputStatus: false,
    inputContent: null,
    contentLength: 0,
    reset: '',
    inputCommentId:null,
    inputPlaceHolder:'来谈谈你的看法吧！'
  },

  onLoad: function(options) {
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth
    this.setData({
      scrheight: scrwidth / 1.78,
      headTop: scrwidth / 1.78 * 0.75,
      sheadTop: scrwidth / 1.78 * 0.85,

      newsId: options.articleObjectId,   //'5b5014952f301e003bb8892a' //改为options.id
      title: options.title,
      description: options.description,
      author: options.author,
      cover: options.cover,
      content: options.content,
      updatedAt: options.updatedAt
    })
    
    var _this = this
    _this.requestFirstComment()

    //请求是否收藏数据
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/Collect',
      method: 'POST',
      data: {
        userId: '5b58394fee920a003ca68a9f', //应实现动态
        newsId: _this.data.newsId,
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
  },

  requestFirstComment: function() {//请求第一页评论，当用户提交评论后刷新第一页
    var _this = this
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheCommentList',
      method: 'POST',
      data: {
        newsId: _this.data.newsId,
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
      }
    })
  },

  //评论相关

  //评论入口
  commentInputStatus: function(event) {
    console.log(event.target.dataset.inputcommentid)
    if(event.target.dataset.inputcommentid!=null){
      this.setData({
        inputCommentId: event.target.dataset.inputcommentid,
        inputPlaceHolder: '引用 @'+event.target.dataset.inputplaceholder+' 的评论：'
      })
    }
    this.setData({
      commentInputStatus: true
    })
  },
  commentInputStatusOff: function() {
    this.setData({
      commentInputStatus: false
    })
  },
  message: function(res) {
    this.setData({
      inputContent: res.detail.value,
      contentLength: res.detail.value.length
    })
  },
  //提交信息
  replySubmit: function(res) {
    console.log(this.data.inputCommentId)
    if (this.data.contentLength==0) {
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
          content: _this.data.inputContent,
          userId: '5b39b27067f356003815884d',
          newsId: _this.data.newsId,
          replyCommentId:_this.data.inputCommentId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function() {
          _this.commentInputStatusOff()
          _this.setData({
            reset: '',
            inputContent: null,
            contentLength:0,
            inputCommentId:null,
            inputPlaceHolder:'来谈谈你的看法吧！'
          })
          wx.showToast({
            title: '发送成功！',
          })
          _this.requestFirstComment()
        }
      })
    }
  },

//reply详细界面
  toReply: function(event) {
    var username = event.target.dataset.username,
      commentId = event.target.dataset.commentid,
      likeNumber = event.target.dataset.likenumber,
      date = event.target.dataset.date,
      content = event.target.dataset.content,
      like = event.target.dataset.like,
      replyNumber = event.target.dataset.replynumber,
      dislike = event.target.dataset.dislike;
    console.log("wocaocaocao" + commentId)
    wx.navigateTo({
      url: 'reply/reply?commentId=' + commentId + '&username=' + username + '&likeNumber=' + likeNumber + '&date=' + date + '&content=' + content + '&like=' + like + '&dislike=' + dislike + '&replyNumber=' + replyNumber + '&newsId=' + this.data.newsId
    })

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    wx.showLoading({
      title: '正在加载',
    })
    page++
    var _this = this,
      id = _this.data.newsId,
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
          wx.showToast({
            title: '没有更多内容了',
          })
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