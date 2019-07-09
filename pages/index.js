'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WxParse = require('../wxParse/wxParse.js');
var _utils = require('../static/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    height: wx.DEFAULT_CONTENT_HEIGHT,
    current: 0,
    show: false,
    menuSta: true,
    menushow: false,
    loginMask: false,
    showMask: false,
    shareMask: false,
    imageMask: false,
    longtime: true,
    headtap: true,
    tabcurrent: 0,
    songFavSta: 0,
    dsenFavSta: 0,
    dartFavSta: 0,
    darticleSee:0,
    poptabStyle: {
      'font-size': '32rpx',
      'padding': '20rpx 0',
      'font-weight': '300',
      'color': '#999999',
      'width:': '80px'
    },
    popactiveTabStyle: {
      'color': '#333333',
      'font-weight': '500',
      'border-right': '0px solid #333333'
    },
    customStyle: {
      'background-color': 'rgba(255, 255, 255, 0.8)'
    },
    tabStyle: {
      'font-size': '32rpx',
      'flex': '0 0 40px',
      'padding': '10rpx 0',
      'margin-left': '20rpx',
      'margin-right': '20rpx',
      'color': '#999999',
      'font-weight': '300'
    },
    activeTabStyle2: {
      'color': '#333333',
      'border-bottom': '1px solid #333333'
    },
    maskStyle: {
      'background-color': 'transparent'
    },
    menuMaskStyle: {
      'background-color': 'rgba(255,255,255,.9)'
    },
    muiscImgPlayer: '',
    dateobj: {}
  },
  onShow:function onshow(e){
    if (e == undefined){
      e=''
    }
    this.onLoad(e)
  },
  onLoad: function onLoad(e) {
    var that = this;
    if (e.scene) {
      var scene = decodeURIComponent(e.scene);
      var scarr = scene.split(',');
      var dilist = [];
      for (var i = 0; i < scarr.length; i++) {
        dilist.push(scarr[i].split('='));
      }
      if (dilist.length > 0) {
        var dict = {};
        for (var j = 0; j < dilist.length; j++) {
          dict[dilist[j][0]] = dilist[j][1];
        }
        that.peaceread(dict.tid);
        that.setData({
          current: dict.type
        });
      }
    } else {
      if (e.tid) {
        var id = e.tid;
        var type = e.type;
        that.peaceread(id);
        that.setData({
          current: type
        });
      } else {
        that.peaceread();
      }
    }
    
    var token = wx.getStorageSync('__appUserInfo').token;
    if (!token) {
      setTimeout(function () {
        if (app.globalData.userinfo == 1e4) {
          that.setData({ loginMask: true });
        }
      }, 1000);
    };
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({ WIN_HEIGHT: res.windowHeight });
      }
    });
    
    wx.request({
      url: app.globalData.sUrl + '&part=date_all',
      data: {},
      success: function success(res) {

        if (res.data.code == 0) {
          //console.log(res.data.data)
          that.setData({
            dumonth: res.data.data
          });
          var monthData = []
          wx.request({
            url: app.globalData.sUrl + '&part=mon_get_day',
            data: {
              year: res.data.data[0][2],
              mon: res.data.data[0][0]
            },
            success: function success(res) {
              //console.log(res.data.data)
              if (res.data.code == 0) {
                that.setData({
                  monthData: res.data.data
                });
              }
            }
          });
        }
      }
    });
    
  },
  scrollRightTap: function scrollRightTap(e) {
    console.log(e);
  },
  
  getArticleTap: function getArticleTap(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.peaceread(id);
   
    that.setData({
      show: false,
      headtap: true,
      current: 0,
    });
  },
  peaceread: function peaceread(e) {
    
    var that = this;
    if (e) {
      wx.request({
        url: app.globalData.sUrl+'&part=wz_details',
        data: {
          id: e
        },
        success: function success(res) {
          
          if (res.data.code == 0) {
            var time = res.data.data[0].fb_time;
            var timeArr = time.split('-');
            var montArr = {
              '1': 'Jan',
              '2': 'Feb',
              '3': 'Mar',
              '4': 'Apr',
              '5': 'May',
              '6': 'Jun',
              '7': 'Jul',
              '8': 'Aug',
              '9': 'Sep',
              '10': 'Oct',
              '11': 'Nov',
              '12': 'Dec'
            };
            that.setData({
              date: timeArr[2],
              month: montArr[timeArr[1]],
              year: timeArr[0],
              newoneId: res.data.data[0].id,
              //rsongImg: res.data.data[0].pic.replace(/http:/g, 'https:'),
              //dsongImg: res.data.data[0].link,
              //dsongTit: res.data.data[0].m_name,
              //dsongSin: res.data.data[0].m_author,
              //dsongFav: res.data.data[0].mfav,
              //dsongShr: res.data.data[0].m_share,
              dsentTit: res.data.data[0].title,
              //dsentenc: res.data.data[0].contents,
              //darticle: res.data.data[0].w_contents,
              //dsentencAur: res.data.data[0].j_author,
              //dsentencFav: res.data.data[0].favs,
              //dsentencShr: res.data.data[0].shares,
              //dsentencSee: res.data.data[0].sees,
              //darticleTit: res.data.data[0].ntitle,
              darticleAur: 'w_author',//res.data.data[0].w_author,
              //darticleImg: res.data.data[0].pic_w.replace(/http:/g, 'https:'),
              darticleFav: res.data.data[0].favs,
              darticleShr: res.data.data[0].shares,
              darticleSee: res.data.data[0].sees
            });
            WxParse.wxParse('article', 'html', res.data.data[0].contents, that, 5);
            WxParse.wxParse('rticle', 'html', res.data.data[0].content, that, 5);
          }
        }
      });
    } else {
      wx.request({
        
        url: app.globalData.sUrl+'&part=get_newone',
        success: function success(res) {
          
          if (res.data.code == 0) {
            var time = res.data.data[0].fb_time;
            var timeArr = time.split('-');
            
            var montArr = {
              '1': 'Jan',
              '2': 'Feb',
              '3': 'Mar',
              '4': 'Apr',
              '5': 'May',
              '6': 'Jun',
              '7': 'Jul',
              '8': 'Aug',
              '9': 'Sep',
              '10': 'Oct',
              '11': 'Nov',
              '12': 'Dec'
            };
            that.setData({
              date: timeArr[2],
              month: montArr[timeArr[1]],
              year: timeArr[0],
              newoneId: res.data.data[0].id,
              //rsongImg: res.data.data[0].pic.replace(/http:/g, 'https:'),
              //dsongImg: res.data.data[0].link,
              //dsongTit: res.data.data[0].m_name,
              //dsongSin: res.data.data[0].m_author,
              //dsongFav: res.data.data[0].mfav,
              //dsongShr: res.data.data[0].m_share,
              dsentTit: res.data.data[0].title,
              //dsentenc: res.data.data[0].contents,
              //darticle: res.data.data[0].w_contents,
              //dsentencAur: res.data.data[0].j_author,
              //dsentencFav: res.data.data[0].favs,
              //dsentencShr: res.data.data[0].shares,
              //dsentencSee: res.data.data[0].sees,
              //darticleTit: res.data.data[0].ntitle,
              darticleAur: 'w_author',//res.data.data[0].w_author,
              //darticleImg: res.data.data[0].pic_w.replace(/http:/g, 'https:'),
              darticleFav: res.data.data[0].favs,
              darticleShr: res.data.data[0].shares,
              darticleSee: res.data.data[0].sees
            });
            WxParse.wxParse('article', 'html', res.data.data[0].contents, that, 5);
            WxParse.wxParse('rticle', 'html', res.data.data[0].content, that, 5);
          }
        }
      });
    }
    setTimeout(function () {
      that.getFavStar();
    }, 1100);
    setTimeout(function () {
      that.getSeeStar();
    }, 1100);
    //that.getSeeStar();
  },
  getFavStar: function getFavStar() {
    var that = this;
    
    var id = that.data.newoneId;
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
     
      url: app.globalData.sUrl+'&part=fav_wzstatus',
      data: {
        id: id,
        token: token
      },
      success: function success(res) {
        //console.log(res)
        if (res.data.code == 0) {
          that.setData({
            songFavSta: 0,
            dsenFavSta: 0,
            dartFavSta:res.data.data.status,
            darticleFav:res.data.data.amounts,
          });
        }
      }
    });
  },
  getSeeStar: function getSeeStar() {
    var that = this;
    var id = that.data.newoneId;
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
      url: app.globalData.sUrl+'&part=wz_see',
      data: {
        id: id,
        token: token
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
          that.setData({
            songFavSta: 0,
            dsenFavSta: 0,
            //dartSeeSta: res.data.data.status,
            darticleSee: res.data.data.amounts,
          });
        }
      }
    });
  },
  getMonthTap: function getMonthTap(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var year = e.currentTarget.dataset.year;
    var month = e.currentTarget.dataset.month;
    wx.request({
      url: app.globalData.sUrl+'&part=mon_get_day',
      data: {
        year: year,
        mon: id
      },
      success: function success(res) {
        if (res.data.code == 0) {
          that.setData({
            monthData: res.data.data
          });
        }
      }
    });
  },
  getShareSongTap: function getShareSongTap(e) {
    var that = this;
    var shid = e.currentTarget.dataset.id;
    that.setData({
      shareMask: true,
      shareNumber: shid
    });
    /*if (shid == 0) {
      that.setData({
        shareMask: true,
        shareNumber: 0
      });
    }
    if (shid == 1) {
      that.setData({
        shareMask: true,
        shareNumber: 1
      });
    }*/
    
      
    
  },
  closeShareHaibaoTap: function closeShareHaibaoTap() {
    this.setData({
      imageMask: false
    });
  },
  getShareHaibaoTap: function getShareHaibaoTap(e) {
    var that = this;
    var tid = that.data.newoneId;
    var shre = e.currentTarget.dataset.id;
    
    
      //生成文章海报图片
      wx.request({
       
        url: app.globalData.sUrl+'&part=wz_share',
        data: {
          id: tid,
          type: 0
        },
        success: function success(res) {
          if (res.data.code == 0) {
            var share = that.data.darticleShr + 1;
            that.setData({
              darticleShr: share
            });
          }
        }
      });
      wx.showLoading({ title: '\u751F\u6210\u56FE\u7247\u4E2D', mask: true });
      wx.request({
        
        url: app.globalData.sUrl+'&part=get_qrcode',
        data: {
          scene: 'tid=' + tid + ',type=' + 0,
          page: 'pages/index'
        },
        success: function success(res) {
          if (res.data.code == 0) {
            var qrcode = res.data.data;
            wx.downloadFile({
              url: qrcode,
              success: function success(qr) {
                if (res.statusCode === 200) {
                  var ctx = wx.createCanvasContext('shareCanvas');
                  var dat = that.data.date;
                  var mon = that.data.month;
                  var yer = that.data.year;
                  var tmg = that.data.darticleImg;
                  var tit = that.data.darticleTit;
                  var tsp = tit.split('');
                  if (tsp.length > 18) {
                    var tit = tit.slice(0, 18) + '...';
                  }
                  var use = that.data.darticleAur;
                  var acr = that.data.darticle;
                  var acp = acr.replace(/\n\n/g, '');
                  var acs = acp.split('');
                  var acm = '';
                  var row = [];
                  for (var a = 0; a < acs.length; a++) {
                    if (ctx.measureText(acm).width < 320) {
                      acm += acs[a];
                    } else {
                      a--;
                      row.push(acm);
                      acm = '';
                    }
                  }
                  row.push(acm);
                  wx.getImageInfo({
                    src: tmg,
                    success: function success(res) {
                      ctx.setFillStyle('#ffffff');
                      ctx.fillRect(0, 0, 400, 800);
                      ctx.drawImage('../images/logo_share.png', 20, 30, 80, 80);
                      ctx.setFillStyle('#333333');
                      ctx.setFontSize(18);
                      ctx.fillText('道术斋', 108, 63);
                      ctx.setFillStyle('#999999');
                      ctx.setFontSize(14);
                      ctx.fillText('道之本源，术之方法', 108, 92);
                      ctx.strokeStyle = "#eee";
                      ctx.lineWidth = 0.5;
                      ctx.beginPath();
                      ctx.moveTo(20, 130);
                      ctx.lineTo(380, 130);
                      ctx.stroke();
                      ctx.drawImage(res.path, 20, 145, 360, 180);
                      ctx.setFillStyle('#333333');
                      ctx.setFontSize(18);
                      ctx.fillText(tit, 20, 355);
                      ctx.setFillStyle('#999999');
                      ctx.setFontSize(13);
                      ctx.fillText(use, 20, 380);
                      ctx.setFillStyle('#666666');
                      ctx.setFontSize(15);
                      if (row.length > 4) {
                        var rowCut = row.slice(0, 4);
                        var rowPart = rowCut[1];
                        var test = '';
                        var empty = [];
                        for (var a = 0; a < rowPart.length; a++) {
                          if (ctx.measureText(test).width < 300) {
                            test += rowPart[a];
                          } else {
                            break;
                          }
                        }
                        empty.push(test);
                        var group = empty[0] + ".......";
                        rowCut.splice(4, 1, group);
                        row = rowCut;
                      }
                      for (var b = 0; b < row.length; b++) {
                        ctx.fillText(row[b], 20, 410 + b * 30, 360);
                      }
                      ctx.strokeStyle = "#eee";
                      ctx.lineWidth = 0.5;
                      ctx.beginPath();
                      ctx.moveTo(20, 550);
                      ctx.lineTo(380, 550);
                      ctx.stroke();
                      ctx.drawImage(qr.tempFilePath, 240, 565, 120, 120);
                      ctx.setFillStyle('#333333');
                      ctx.setFontSize(40);
                      ctx.fillText(dat, 50, 636);
                      ctx.setFontSize(22);
                      ctx.fillText(mon + '.' + yer, 96, 636);
                      ctx.save();
                      ctx.draw();
                      setTimeout(function () {
                        wx.canvasToTempFilePath({
                          x: 0,
                          y: 0,
                          width: 400,
                          height: 700,
                          canvasId: 'shareCanvas',
                          success: function success(res) {
                            wx.hideLoading();
                            that.setData({
                              shareImg: res.tempFilePath,
                              shareMask: false,
                              imageMask: true
                            });
                          }
                        });
                      }, 500);
                    }
                  });
                }
              }
            });
          }
        }
      });
    
  },
  saveShareImgTap: function saveShareImgTap() {
    var that = this;
    var imgs = that.data.shareImg;
    wx.saveImageToPhotosAlbum({
      filePath: imgs,
      success: function success(res) {
        wx.showToast({
          title: '\u4FDD\u5B58\u6210\u529F',
          icon: 'none',
          duration: 2000
        });
      }
    });
    that.setData({ imageMask: false });
  },
  previewImage: function previewImage(e) {
    var img = e.currentTarget.dataset.img;
    wx.previewImage({
      urls: [img]
    });
  },
  onShareAppMessage: function onShareAppMessage(res) {
    var that = this;
    var tid = that.data.newoneId;
    if (res.from === 'button') {
      var id = res.target.dataset.id;
      
      
        var darticleTit = that.data.darticleTit;
        var darticleAur = that.data.darticleAur;
        var darticleImg = that.data.darticleImg;
        wx.request({
          
          url: app.globalData.sUrl+'&part=wz_share',
          data: {
            id: tid,
            type: 0
          },
          success: function success(res) {
            if (res.data.code == 0) {
              var share = that.data.darticleShr + 1;
              that.setData({
                darticleShr: share
              });
            }
          }
        });
        return {
          title: darticleTit + '-' + darticleAur,
          path: 'pages/index?tid=' + tid + '&type=' + id,
          imageUrl: darticleImg
        };
      
    } else {
      return {
        title: '道术斋 - 道之本源，术之方法',
        path: '/pages/index'
      };
    }
  },
  openPopup: function openPopup(e) {
    var that = this;
    if (app.globalData.userinfo == 1e4) {
      that.setData({ loginMask: true });
      return;
    }
    var show = e.currentTarget.dataset.show;
    if (show == true) {
      this.setData({
        show: true,
        headtap: false
      });
    } else {
      this.setData({
        show: false,
        headtap: true
      });
    }
  },
  handleMenuMask: function handleMenuMask(e) {
    var that = this;
    var show = e.currentTarget.dataset.show;
    if (show == true) {
      that.setData({
        menushow: true,
        menuSta: false
      });
    } else {
      that.setData({
        menushow: false,
        menuSta: true
      });
    }
  },
  handleChangeTap: function handleChangeTap(e) {
    var index = e.detail.index;
    this.setData({
      tabcurrent: index
    });
  },
  playerMusic: function playerMusic(e) {
    var that = this;
    var music = that.data.dsongImg;
    var title = that.data.dsongTit;
    var image = that.data.dsongSin;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.playBackgroundAudio({
        dataUrl: music,
        title: title,
        coverImgUrl: image
      });
      that.setData({
        musicPlay: id,
        muiscImgPlayer: 'music-img'
      });
    } else {
      wx.pauseBackgroundAudio();
      that.setData({
        musicPlay: '',
        muiscImgPlayer: ''
      });
    }
  },
  handleChange: function handleChange(e) {
    var index = e.detail.index;
    this.setData({
      current: index
    });
  },
  handleContentChange: function handleContentChange(e) {
    var that = this;
    var current = e.detail.current;
    that.setData({
      current: current
    });
  },
  userlogin: function userlogin(e) {
    var that = this;
    var iv = e.detail.iv;
    var rawData = e.detail.rawData;
    var signature = e.detail.signature;
    var encryptedData = e.detail.encryptedData;
    wx.login({
      success: function success(wxs) {
        wx.request({
          url: app.globalData.sUrl+'&part=register',
          data: {
            iv: iv,
            code: wxs.code,
            rawData: rawData,
            signature: signature,
            encryptedData: encryptedData
          },
          success: function success(res) {
            if (res.data.code != 0) {
              wx.showConfirm({
                content: '\u9700\u8981\u60A8\u7684\u6388\u6743\uFF0C\u624D\u80FD\u6B63\u5E38\u4F7F\u7528\u54E6\uFF5E',
                showCancel: false,
                confirmColor: '#ffd305',
                confirmText: '\u91CD\u65B0\u6388\u6743',
                success: function success(res) {}
              });
              return;
            } else {
              that.setData({ showMask: false });
              app.login();
              wx.showToast({ title: '\u5FAE\u4FE1\u6388\u6743\u6210\u529F', icon: 'none' });
              app.globalData.userinfo = 0;
            }
          }
        });
      }
    });
  },
  getFavSongTap: function getFavSongTap(e) {
    var that = this;
    var tpid = e.currentTarget.dataset.id;
    
    if (app.globalData.userinfo == 1e4) {
      that.setData({ loginMask: true });
      return;
    }
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
      
      url: app.globalData.sUrl+'&part=fav_wzadd',
      data: {
        id: tpid,
        token: token
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
            var darticleFav = that.data.darticleFav + 1;
            that.setData({
              darticleFav: darticleFav,
              dartFavSta: 1
            });
        }
      }
    });
  },
  delFavSongTap: function delFavSongTap(e) {
    var that = this;
    var tpid = e.currentTarget.dataset.id;
    
    var token = wx.getStorageSync('__appUserInfo').token;
    wx.request({
      
      url: app.globalData.sUrl+'&part=fav_wzdel',
      data: {
        id: tpid,
        token: token
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
            var darticleFav = that.data.darticleFav - 1;
            that.setData({
              darticleFav: darticleFav,
              dartFavSta: 0
            });
          
        }
      }
    });
  },
  getCopyWechat: function getCopyWechat() {
    wx.setClipboardData({
      data: 'totorohost',
      success: function success(res) {
        wx.showToast({
          title: '\u5FAE\u4FE1\u53F7\u590D\u5236\u6210\u529F',
          icon: 'none',
          duration: 500
        });
      }
    });
  },
  getCopyjdWechat: function getCopyjdWechat() {
    wx.setClipboardData({
      data: 'huangyjwx',
      success: function success(res) {
        wx.showToast({
          title: '\u5FAE\u4FE1\u53F7\u590D\u5236\u6210\u529F',
          icon: 'none',
          duration: 500
        });
      }
    });
  }
});