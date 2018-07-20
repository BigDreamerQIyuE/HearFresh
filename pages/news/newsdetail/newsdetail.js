Page({

  data: {
    title: '',
    description: '',
    content: '',
    author: '',
    reading: '',
    date: ''
  },

  onLoad: function(options) {
    var _this = this
    console.log(options.id)
    var id = options.id;
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
        console.log(res.data)
        _this.setData({
          title: res.data.data.title,
          description: res.data.data.description,
          content: res.data.data.content,
          author: res.data.data.author,
          date: res.data.data.createdAt.date,
          reading: res.data.data.reading,
          cover: res.data.data.cover
        })
      },
      fail: function() {
        wx.showActionSheet({
          itemList: ["fuck fail"],
        })
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