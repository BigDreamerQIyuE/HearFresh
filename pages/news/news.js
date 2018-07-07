// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530865249183&di=de492aa26f2188a97f03170e94b19097&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F6a63f6246b600c335704999f1d4c510fd9f9a16c.jpg',
        head: '听鲜牛逼',
        shead: '小程序开发，从入门到放弃',
        id: 1,
        mask: '../../image/mask.png'
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530857432416&di=52b05e662557823e9df23ec793843f2e&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsports%2Ftransform%2F215%2Fw650h365%2F20180701%2FNDhb-hespqrx7851675.jpg',
        head: '湖人总冠军',
        shead: '詹姆斯入驻湖人，假球迷的朋友圈狂欢',
        id: 2,
        mask: '../../image/mask.png'
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530857342284&di=e3afb669c234e8495b6379272ac71cfa&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fugc%2Fbaikepic2%2F17209%2F20180130142036-363599116_jpg_1920_1080_63038.jpg%2F0',
        head: '微软傻逼',
        shead: '修复了版本号过低的BUG',
        id: 3,
        mask: '../../image/mask.png'
      },
    ],


    article: [{
        url: '../../image/fuck0.png',
        head: '超然剪辑：用数码宝贝主题曲伴奏森林音乐会',
        time: 'null',
        readed: '9999'
      },
      {
        url: '../../image/fuck1.png',
        head: '当代阿炳：指挥家颜值占舞台效果比重探究',
        time: 'null',
        readed: '1233'
      },
      {
        url: '../../image/fuck2.png',
        head: '中毒污染：论舞池里放屁的严重性',
        time: 'null',
        readed: '10000'
      }
    ],

  },

  tapNews: function(event) {
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'newsdetail/newsdetail?id='+postId
    });
    console.log("postId: "+postId)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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