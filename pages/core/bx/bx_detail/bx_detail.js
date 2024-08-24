var app = getApp(); // 获取小程序实例
var _page=0; // 当前分页页码

Page({
  data: {
    datalist:[],
    student_name:''
  },

  onShow: function () { // 页面显示时执行
    const aToken=wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌  
    const item_x=wx.getStorageSync('item_x')
    this.setData({
      datalist:item_x
    })
    console.log(this.data.datalist)
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
              student_name: res.data.data.student_name, 
            });
          } else { 
            wx.showToast({ // 显示消息提示框
              title: '获取学生信息失败', // 提示信息
              icon: 'none', // 图标为无
              duration: 2000 // 持续时间2秒
            });
          }
        },
      });
    }
  },
});