// pages/news/news.js
//初始页面1   页面容量30
var app = getApp(),
  page = 1,
  pageSize = 30,
  utils = require('../../utils/util.js')

function judge(differTime) { //判断发布时间距离现在时间间隔
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
  data: {
    reachBottom: false,
    headLine: [{
      airicleObjectId: '',
      title: '',
      description: '',
      author: '',
      cover: '',
      content: '',
      updatedAt: ''
    }],
    article: [{
      airicleObjectId: '',
      title: '',
      description: '',
      author: '',
      cover: '',
      content: '',
      reading: '',
      supdatedAt: '', //标准时间格式
      updatedAt: '' //距离现在时间的距离  ex：3年前
    }]
  },

  onLoad: function(options) {
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth
    this.setData({
      scrheight: scrwidth / 1.78,
      headTop: scrwidth / 1.78 * 0.73,
      sheadTop: scrwidth / 1.78 * 0.85,
      maskHeight: scrwidth / 1.78 + 2
    }) //计算headline的cover大小

    wx.showLoading({
      title: '加载中',
    })
    var _this = this

    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v2/news',
      method: 'GET',
      data: {
        page: page,
        per_page: pageSize
      },
      success: function(res) {
        console.log(res.data);

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].headLine == true) {
            _this.setData({
              'headLine[0].articleObjectId': res.data[i].objectId,
              'headLine[0].title': res.data[i].title,
              'headLine[0].description': res.data[i].description,
              'headLine[0].content': res.data[i].content,
              'headLine[0].cover': res.data[i].cover,
              'headLine[0].reading': res.data[i].reading,
              'headLine[0].supdatedAt': res.data[i].updatedAt.date.substring(0, 19)
            })
          }

          var param = {};
          var string = "article[" + i + "].articleObjectId";
          param[string] = res.data[i].objectId;
          var string = "article[" + i + "].title";
          param[string] = res.data[i].title;
          var string = "article[" + i + "].description";
          param[string] = res.data[i].description;
          var string = "article[" + i + "].author";
          param[string] = res.data[i].author.username;
          var string = "article[" + i + "].cover";
          param[string] = res.data[i].cover;
          var string = "article[" + i + "].content";
          param[string] = res.data[i].content;
          var string = "article[" + i + "].reading";
          param[string] = res.data[i].reading;
          var string = "article[" + i + "].supdatedAt";
          param[string] = res.data[i].updatedAt.date.substring(0, 19);

          var string = "article[" + i + "].updatedAt",
            t = utils.formatTime(new Date()), //2018/10/26 22:55:13
            standerdTime = new Date(t), //标准时间格式
            currentTime = standerdTime.getTime() / 1000, //时间戳
            createdAt = res.data[i].updatedAt.date.substring(0, 19), //从服务器获取的时间 2018/10/26 22:55:13.000000 并截取到秒级
            stime = new Date(createdAt), //将秒级时间转化为标准时间格式
            createdTime = stime.getTime() / 1000, //转化为时间戳
            differTime = currentTime - createdTime,
            date = judge(differTime)
          param[string] = date

          _this.setData(param);
        }
        wx.hideLoading()

        console.log(_this.data.headLine[0].supdatedAt)
      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["连接失败"],
        })
      }
    });
  },

  tapNews: function(event) { //跳转到新闻详细界面
wx.setStorageSync('content',event .target.dataset.postcontent)

    wx.navigateTo({
      url: 'newsdetail/newsdetail?articleObjectId=' + event.target.dataset.postarticleobjectid + '&title=' + event.target.dataset.posttitle + '&description=' + event.target.dataset.postdescription + '&author=' + event.target.dataset.postauthor + '&cover=' + event.target.dataset.postcover + '&content=' + event.target.dataset.postcontent + '&updatedAt=' + event.target.dataset.postsupdatedat
    });
    console.log(event)
  },

  onPullDownRefresh: function() {
    page = 1
    this.data.article.splice(0, this.data.article.length);
    this.data.headLine.splice(0, this.data.headLine.length);
    this.setData({
      article: this.data.article,
      headLine: this.data.headLine,
      reachBottom: false
    })

    this.onLoad()
    wx.stopPullDownRefresh()
  },



  onReachBottom: function() {
    page++
    var _this = this
    wx.request({
      url: 'https://hearfresh.leanapp.cn/api/v2/news',
      method: 'GET',
      data: {
        page: page,
        per_page: pageSize
      },
      success: function(res) {
        if (res.data.length == 0) {
          _this.setData({
            reachBottom: true
          })
          page--
        } else {
          console.log(res.data);
          var fuck = (page - 1) * pageSize - 1
          for (var i = 0; i < res.data.length; i++, fuck++) { //i定义本次获取数据的角标，fuck定义总角标
            var param = {};
            var string = "article[" + fuck + "].articleObjectId";
            param[string] = res.data[i].objectId;
            var string = "article[" + fuck + "].title";
            param[string] = res.data[i].title;
            var string = "article[" + fuck + "].description";
            param[string] = res.data[i].description;
            var string = "article[" + fuck + "].author";
            param[string] = res.data[i].author.username;
            var string = "article[" + fuck + "].cover";
            param[string] = res.data[i].cover;
            var string = "article[" + fuck + "].content";
            param[string] = res.data[i].content;
            var string = "article[" + fuck + "].reading";
            param[string] = res.data[i].reading;
            var string = "article[" + fuck + "].supdatedAt";
            param[string] = res.data[i].updatedAt.date.substring(0, 19);

            var string = "article[" + fuck + "].updatedAt",
              t = utils.formatTime(new Date()), //2018/10/26 22:55:13
              standerdTime = new Date(t), //标准时间格式
              currentTime = standerdTime.getTime() / 1000, //时间戳
              createdAt = res.data[i].updatedAt.date.substring(0, 19), //从服务器获取的时间 2018/10/26 22:55:13.000000 并截取到秒级
              stime = new Date(createdAt), //将秒级时间转化为标准时间格式
              createdTime = stime.getTime() / 1000, //转化为时间戳
              differTime = currentTime - createdTime,
              date = judge(differTime)
            param[string] = date

            _this.setData(param);
          }
        }
      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["连接失败"],
        })
      }
    });
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})