'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    sUrl:'https://dsz.janedao.cn/api?viewid=home'
  },
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
    this.login();
  },
  login: function login() {
    var that = this;
    var token = that.globalData.token;
    if (token) {
      wx.request({
        url: that.globalData.sUrl+'part=checktoken',
        data: {
          token: token
        },
        success: function success(res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          }
        }
      });
      return;
    }
    wx.login({
      success: function success(res) {
        wx.request({
          url: that.globalData.sUrl +'&part=login',
          data: {
            code: res.code
          },
          success: function success(res) {
            
            if (res.data.code == 1e4) {
              that.globalData.userinfo = 1e4;
              return;
            }
            if (res.data.code != 0) {
              wx.showConfirm({
                content: '\u5C0F\u7A0B\u5E8F\u79D8\u94A5\u4FE1\u606F\u672A\u914D\u7F6E\u6216\u8005\u914D\u7F6E\u4E0D\u6B63\u786E\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5',
                showCancel: false,
                confirmColor: '#ffd305',
                confirmText: '\u6211\u77E5\u9053\u4E86',
                success: function success(res) {}
              });
              return;
            }
            wx.setStorage({ key: "__appUserInfo", data: { uid: res.data.data.uid, token: res.data.data.token } });
          }
        });
      }
    });
  }
});