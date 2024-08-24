//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    studentInfo: [],
    S_amount:0,
    D_amount:0,
    last_time:'',
    core: [
      { id: 'xf', name: '余额充值', disabled: false, teacher_disabled: true },
      { id: 'sdf', name: '水电费', disabled: false, teacher_disabled: true },
      { id: 'jy', name: '管理员', disabled: false, teacher_disabled: false },
      { id: 'bx', name: '物业报修', disabled: false, teacher_disabled: false }
    ],
    currentTab:0, //预设当前项的值
    scrollLeft:0, //tab标题的滚动条位置
    card: {
      'ykt': {
        show: false,
        data: {
          'last_time': '',
          'balance': 0,
          'cost_status': false,
          'today_cost': {
            value: [],
            total: 0
          }
        }
      },
    },
    // 这里假设使用了一个名为 notice 的数据对象来存储通知公告的内容和相关信息
    notice: {
    },
    user: {},
    disabledItemTap: false //点击了不可用的页面
  },
  // 滚动切换标签样式
  switchTab:function(e){
    this.setData({
        currentTab: e.detail.current // 更新当前标签页
    });
    this.checkCor(); // 调用函数检查滚动位置
},
// 点击标题切换当前页时改变样式
swichNav:function(e){
    var cur = e.target.dataset.current; // 获取当前点击的标签索引
    if(this.data.currentTab == cur){ // 如果点击的是当前标签页，则返回
        return false;
    } else {
        this.setData({
            currentTab: cur // 更新当前标签页
        });
    }
},
  //下拉更新
  onPullDownRefresh: function(){
    if(app._user.is_bind){
      this.getCardData();
    }
  },

  onShow: function () { // 页面显示时执行
    // Example usage:
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
  
    // Add leading zero if month or day is less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    this.setData({
      last_time:formattedDate
    })

    const aToken=wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌  
    if (aToken) { // 如果存在访问令牌
      wx.request({
        url: 'https://blog.xiaordong.cn/user/data', // 请求用户数据的URL
        method: 'GET', // 请求方法为GET
        header:{
          'Authorization':`${aToken}` // 在请求头中添加令牌
        },
        success: (res) => { // 请求成功时的回调函数
          if (res.statusCode === 200) { // 如果响应状态码为200
            this.setData({ // 更新页面数据
              studentInfo: res.data.data, 
              S_amount:parseInt(res.data.data.water_fee),
              D_amount:parseInt(res.data.data.electricity_fee),
            });
            wx.setStorageSync('student_db', this.data.studentInfo.buildingNumber+this.data.studentInfo.dormNumber)
            console.log('用户数据:',res.data.data); 
          } else { // 如果响应状态码不为200
            wx.showToast({ // 显示消息提示框
              title: '请先登录！', // 提示信息
              icon: 'none', // 图标为无
              duration: 2000 // 持续时间2秒
            });
          }
        },
      });
    }
  },

  main_click(event) {
    const aToken = wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌
    if (!aToken) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none', // 图标为无
        duration: 2000 // 持续时间2秒
      });
      return; // 在未登录时阻止跳转
    } else {
      console.log('登录成功！');
      // 如果已登录，可以继续执行跳转
      const url = event.currentTarget.dataset.url; // 获取点击的链接
      wx.navigateTo({
        url: url
      });
    }
  },
  
  onLoad: function(){
    this.login();
  },
  
  login: function(){
    var _this = this;
    //如果有缓存
    if(!!app.cache){
      try{
        _this.response();
      }catch(e){
        //报错则清除缓存
        wx.removeStorage({ key: 'cache' });
      }
    }
    //然后通过登录用户, 如果缓存更新将执行该回调函数
    app.getUser(_this.response);
  },
  response: function(){
    var _this = this;
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if(!app._user.is_bind){
      _this.setData({
        'remind': '未绑定'
      });
    }else{
      _this.setData({
        'remind': '加载中'
      });
      _this.getCardData();
    }
  },
  disabled_item: function(){
    var _this = this;
    if(!_this.data.disabledItemTap){
      _this.setData({
        disabledItemTap: true
      });
      setTimeout(function(){
        _this.setData({
          disabledItemTap: false
        });
      }, 2000);
    }
  },
  // 滚动切换标签样式
  switchTab:function(e){
    this.setData({
        currentTab: e.detail.current // 更新当前标签页
    });
    this.checkCor(); // 调用函数检查滚动位置
},
// 点击标题切换当前页时改变样式
swichNav:function(e){
    var cur = e.target.dataset.current; // 获取当前点击的标签索引
    if(this.data.currentTab == cur){ // 如果点击的是当前标签页，则返回
        return false;
    } else {
        this.setData({
            currentTab: cur // 更新当前标签页
        });
    }
},
// 判断当前滚动超过一屏时，设置tab标题滚动条。
checkCor:function(){
    if (this.data.currentTab > 1){ // 如果当前标签页超过一屏
        this.setData({
            scrollLeft: 150 // 设置滚动条位置
        });
    } else {
        this.setData({
            scrollLeft: 0 // 滚动条位置归零
        });
    }
},
onLoad: function() {  
    var that = this; 
    wx.getSystemInfo({  
        success: function(res) {  
            var clientHeight = res.windowHeight, // 获取窗口高度
                clientWidth = res.windowWidth, // 获取窗口宽度
                rpxR = 750 / clientWidth; // rpx与px的换算比例
            var calc = clientHeight * rpxR - 180; // 计算得到内容区高度
            console.log(calc);
            that.setData({  
                winHeight: calc  // 更新数据
            });  
        }  
    });
},  
footerTap: app.footerTap // 调用全局的底部导航函数
});