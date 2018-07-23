// pages/news/news.js
var app = getApp(),
  page = 1,
  pageSize = 14
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var _this = this
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheNewsList.php',
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
          // console.log(res.data.data.news[i].newsId)
          //_this.setData(param);

          var string = "article[" + i + "].title";
          param[string] = res.data.data.news[i].title;
          // console.log(res.data.data.news[i].title)
          // _this.setData(param);

          var string = "article[" + i + "].time";
          param[string] = res.data.data.news[i].createdAt.date;
          //console.log(res.data.data.news[i].createdAt.data)
          // _this.setData(param);

          var string = "article[" + i + "].read";
          param[string] = res.data.data.news[i].reading;
          //console.log(res.data.data.news[i].reading)
          //_this.setData(param);

          var string = "article[" + i + "].cover";
          param[string] = res.data.data.news[i].cover;
          // console.log(res.data.data.news[i].cover)
          _this.setData(param);
        }

      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["fuck"],
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

  iLoad: function(e) {
    var a = wx.getSystemInfoSync();
    var scrwidth = a.windowWidth,
      imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    this.setData({
      scrheight: scrwidth / ratio
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
   /* page++
    console.log("page:"+page+"pageSize:"+pageSize)

    var _this = this
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheNewsList.php',
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
        var fuck=(page-1)*3-1
        for (var i = 0; i < res.data.data.news.length; i++) {
          var param = {};
          var string = "article[" + fuck + "].id";
          param[string] = res.data.data.news[i].newsId;
          // console.log(res.data.data.news[i].newsId)
          //_this.setData(param);

          var string = "article[" + fuck + "].title";
          param[string] = res.data.data.news[i].title;
          // console.log(res.data.data.news[i].title)
          // _this.setData(param);

          var string = "article[" + fuck + "].time";
          param[string] = res.data.data.news[i].createdAt.date;
          //console.log(res.data.data.news[i].createdAt.data)
          // _this.setData(param);

          var string = "article[" + fuck + "].read";
          param[string] = res.data.data.news[i].reading;
          //console.log(res.data.data.news[i].reading)
          //_this.setData(param);

          var string = "article[" + fuck + "].cover";
          param[string] = res.data.data.news[i].cover;
          // console.log(res.data.data.news[i].cover)
          _this.setData(param);
        }

      },
      fail: function(e) {
        wx.showActionSheet({
          itemList: ["fuck"],
        })
      }
    });
*/
  },



  onReachBottom: function() {


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})