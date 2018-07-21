// pages/news/newsdetail/comment/comment.js
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
    var id = options.id,
      _this = this;
    wx.request({
      url: 'http://139.199.79.232/HearFresh/GetTheCommentList.php',
      method: 'POST',
      data: {
        newsId: id,
        userId: '5b39b27067f356003815884d',
        pageSize:3
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
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