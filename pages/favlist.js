'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    favNone: false
  },
  onLoad: function onLoad() {
    var that = this;
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
      url: app.globalData.sUrl +'&part=fav_wzlist',
      data: {
        token: token
      },
      success: function success(res) {
        //console.log(res,'ffffff');
        if (res.data.code == 0) {
          that.setData({
            favlist: res.data.data.data,
            favListTime: res.data.data.fb_time.reverse()
          });
        } else {
          that.setData({
            favNone: true
          });
        }
      }
    });
  },
  getCenterTap: function getCenterTap(e) {
    var id = e.currentTarget.dataset.id;
   
    wx.navigateTo({
      url: '/pages/index?tid=' + id + '&type=' + 0
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  }
});