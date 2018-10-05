// pages/news/news.js
//初始页面1   页面容量10
var app = getApp(),
  page = 1,
  pageSize = 10,
  utils = require('../../utils/util.js')

function judge(differTime) {
  if (differTime < 60) {
    return differTime + "秒前"
  } else if (differTime < 3600) {
    return parseInt(differTime / 60) + "分钟前"
  } else if (differTime < 86400) {
    return parseInt(differTime / 3600) + "小时前"
  } else if (differTime < 604800) {
    return parseInt(differTime / 86400) + "天前"
  } else if (differTime < 2592000) {
    return parseInt(differTime / 604800) + "周前"
  } else if (differTime < 31536000) {
    return parseInt(differTime / 2592000) + "月前"
  } else {
    return parseInt(differTime / 31536000) + "年前"
  }
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    reachBottom: false,
    headLine: [{
      id: '',
      title: '',
      cover: '',
      description: ''
    }],

    article: [{
      id: '',
      title: '',
      cover: '',
      read: '',
      time: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth
    this.setData({
      scrheight: scrwidth / 1.78,
      headTop: scrwidth / 1.78 * 0.73,
      sheadTop: scrwidth / 1.78 * 0.85,
      maskHeight: scrwidth / 1.78 + 2
    })
    wx.showLoading({
      title: '加载中',
    })
    var _this = this
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheNewsList',
      method: 'POST',
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.data.headLine.headLineId) {
          _this.setData({
            'headLine[0].id': res.data.data.headLine.headLineId,
            'headLine[0].title': res.data.data.headLine.title,
            'headLine[0].cover': res.data.data.headLine.cover,
            'headLine[0].description': res.data.data.headLine.description,
          })
        }
        for (var i = 0; i < res.data.data.news.length; i++) {
          var param = {};
          var string = "article[" + i + "].id";
          param[string] = res.data.data.news[i].newsId;
          var string = "article[" + i + "].title";
          param[string] = res.data.data.news[i].title;

          var string = "article[" + i + "].time",
            createdAt = res.data.data.news[i].createdAt,
            t = utils.formatTime(new Date()),
            standerdTime = new Date(t),
            currentTime = standerdTime.getTime() / 1000,
            differTime = currentTime - createdAt,
            date = judge(differTime)
          param[string] = date
          var string = "article[" + i + "].read";
          param[string] = res.data.data.news[i].reading;
          var string = "article[" + i + "].cover";
          param[string] = res.data.data.news[i].cover;
          _this.setData(param);
        }
        wx.hideLoading()
      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["连接失败"],
        })
      }
    });


  },




  tapNews: function(event) {
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'newsdetail/newsdetail?id=' + postId
    });
    console.log("postId: " + postId)
    console.log(event)
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
    page = 1
    this.data.article.splice(0, this.data.article.length);
    this.data.headLine.splice(0, this.data.headLine.length);
    this.setData({
      article: this.data.article,
      headLine: this.data.headLine,
      reachBottom: false
    })

    var _this = this
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheNewsList',
      method: 'POST',
      data: {
        page: 1,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        wx.stopPullDownRefresh()
        _this.setData({
          'headLine[0].id': res.data.data.headLine.headLineId,
          'headLine[0].title': res.data.data.headLine.title,
          'headLine[0].cover': res.data.data.headLine.cover,
          'headLine[0].description': res.data.data.headLine.description,
        })
        for (var i = 0; i < res.data.data.news.length; i++) {
          var param = {},
            time;
          var string = "article[" + i + "].id";
          param[string] = res.data.data.news[i].newsId;

          var string = "article[" + i + "].title";
          param[string] = res.data.data.news[i].title;

          var string = "article[" + i + "].time",
            createdAt = res.data.data.news[i].createdAt,
            t = utils.formatTime(new Date()),
            standerdTime = new Date(t),
            currentTime = standerdTime.getTime() / 1000,
            differTime = currentTime - createdAt,
            date = judge(differTime)
          param[string] = date


          var string = "article[" + i + "].read";
          param[string] = res.data.data.news[i].reading;


          var string = "article[" + i + "].cover";
          param[string] = res.data.data.news[i].cover;
          _this.setData(param);
        }
      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["fuck,connection fail"],
        })
      }
    })
  },



  onReachBottom: function() {
    page++
    var _this = this
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v1/GetTheNewsList',
      method: 'POST',
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        if (res.data.data.news.length == 0) {
          _this.setData({
            reachBottom: true
          })
          page--
        } else {
          console.log(res.data);
          var fuck = (page - 1) * pageSize - 1
          for (var i = 0; i < res.data.data.news.length; i++, fuck++) {
            var param = {};
            var string = "article[" + fuck + "].id";
            param[string] = res.data.data.news[i].newsId;
            var string = "article[" + fuck + "].title";
            param[string] = res.data.data.news[i].title;
            var string = "article[" + fuck + "].time",
              createdAt = res.data.data.news[i].createdAt,
              t = utils.formatTime(new Date()),
              standerdTime = new Date(t),
              currentTime = standerdTime.getTime() / 1000,
              differTime = currentTime - createdAt,
              date = judge(differTime)
            param[string] = date
            var string = "article[" + fuck + "].read";
            param[string] = res.data.data.news[i].reading;
            var string = "article[" + fuck + "].cover";
            param[string] = res.data.data.news[i].cover;
            _this.setData(param);
          }
        }
      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["fuck"],
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})