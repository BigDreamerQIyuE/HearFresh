// pages/me/me.js
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

  },

  changePersonalInfo: function() {
    wx.navigateTo({
      url: 'changePersonalInfo/changePersonalInfo',
    })
  },

  address: function() {
    wx.navigateTo({
      url: 'address/address',
    })
  },
  coupon: function() {
    wx.navigateTo({
      url: 'coupon/coupon',
    })
  },
  collect: function() {
    wx.navigateTo({
      url: 'collect/collect',
    })
  },
  waitForDeliver: function() {
    wx.navigateTo({
      url: 'waitForDeliver/waitForDeliver',
    })
  },
  waitForSign: function() {
    wx.navigateTo({
      url: 'waitForSign/waitForSign',
    })
  },
  waitForComment: function() {
    wx.navigateTo({
      url: 'waitForComment/waitForComment',
    })
  },
  afterSaleService: function() {
    wx.navigateTo({
      url: 'afterSaleService/afterSaleService',
    })
  },
  logout: function() {
    wx.showToast({
      title: '注销成功！',
    })
  }

})