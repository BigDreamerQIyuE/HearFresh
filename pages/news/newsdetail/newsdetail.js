var util = require('../../../utils/util.js')
Page({

  data: {

  },

  onLoad: function(options) {
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth
    this.setData({
      scrheight: scrwidth / 1.78,
 
      headTop: scrwidth / 1.78 * 0.7,
      left: scrwidth / 20,
      sheadTop: scrwidth / 1.78 * 0.85,
      headSize: scrwidth / 1.78 / 11.81,
      sheadSize: scrwidth / 1.78 / 16
    })
    var _this = this
    var id = options.id;
    //请求文章详细内容
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetNewsByObjectId.php',
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
      url: 'http://139.199.79.232/HearFresh/Collect.php',
      method: 'POST',
      data: {
        userId: '5b58394fee920a003ca68a9f',  //应实现动态
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
      },

      fail: function() {
        wx.showActionSheet({
          itemList: ["fuck fail"],
        })
      }
    })


  },
  //评论页入口
  toComment: function(event) {
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'comment/comment?id=' + postId
    });
  },

  //收藏
  collect: function(res) {
    var _this = this
    _this.setData({
      collect: !_this.data.collect
    })
    wx.request({
      url: 'http://139.199.79.232/HearFresh/Collect.php',
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

  iLoad: function(e) {

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