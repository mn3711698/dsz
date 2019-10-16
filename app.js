'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);
const vPush = require('./libs/pushpy.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    sUrl:'https://dsz.janedao.cn/api?viewid=home',
  },
  vPush: new vPush('https://push.yjyzj.cn/api/1?'),
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
    this.login();
  },
  login: function login() {
    var that = this;
    var token = wx.getStorageSync('__appUserInfo').token;
    if (token) {
      wx.request({
        url: that.globalData.sUrl+'&part=checktoken',
        data: {
          token: token
        },
        success: function success(res) {
          //console.log(res,'00000')
          if (res.data.code == 10000) {
            that.globalData.token = null;
            that.globalData.userinfo = 10000;
            wx.setStorage({ key: "__appUserInfo", data: {} });
          } else if (res.data.code == 901) {
            that.get_token()
          }
        }
      });
      return;
    }
    that.get_token()
    
  },
  get_token: function get_token() {
    var that = this;
    wx.login({
      success: function success(res) {
        wx.request({
          url: that.globalData.sUrl + '&part=login',
          data: {
            code: res.code
          },
          success: function success(res) {
            //console.log(res,'aaaaaaaaaaa')
            if (res.data.code == 10000) {
              that.globalData.userinfo = 10000;
              return;
            }
            if (res.data.code != 0) {
              wx.showConfirm({
                content: res.data.msg,
                showCancel: false,
                confirmColor: '#ffd305',
                confirmText: '\u6211\u77E5\u9053\u4E86',
                success: function success(res) { }
              });
              return;
            }

            wx.setStorage({ key: "__appUserInfo", data: { uid: res.data.data.uid, token: res.data.data.token } });
            that.globalData.userinfo = 0;
          }
        });
      }
    });
  }
});