// pages/me/collect/collect.js
var utils = require('../../../utils/util.js'),
  page = 1,
  pageSize = 10

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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheFavoriteNewsList.php',
      method: 'POST',
      data: {
        userId: '5b58394fee920a003ca68a9f',
        page: page,
        pageSize: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
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
          _this.setData(param)
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