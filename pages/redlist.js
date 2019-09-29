'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    favNone: false,
    loginMask: false
  },
  onLoad: function onLoad() {
    var that = this;
   
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
      url: app.globalData.sUrl +'&part=see_wzlist',
      data: {
        token: token
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
          that.setData({
            seelist: res.data.data.data,
            seeListTime: res.data.data.fb_time.reverse()
          });
        } else {
          that.setData({
            seeNone: true
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
  checkin: function (e) {
    //console.log(e, '-------------')
    app.vPush.addFormId(e);
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  }
});