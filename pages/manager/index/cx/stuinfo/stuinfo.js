var app = getApp(); // 获取小程序实例

var _page=0; // 当前分页页码

Page({
  data: {
    studentInfo: { // 学生信息对象
      amount: "0.0", // 余额
      status: "", // 登录状态，默认未登录
      student_name: "", // 学生姓名
      student_id: '', // 学生ID
      student_academy: '', // 学院
      buildingNumber: '', // 楼栋号
      dormNumber:'' // 宿舍号
    }
  },

  onShow: function () { // 页面显示时执行
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
              studentInfo: res.data.data, // 将返回的用户数据设置为学生信息
              'studentInfo.status': res.data.data.WaterCard.type // 更新学生状态
            });
            console.log('用户数据:',res.data.data); // 打印用户数据到控制台
          } else { // 如果响应状态码不为200
            wx.showToast({ // 显示消息提示框
              title: '获取学生信息失败', // 提示信息
              icon: 'none', // 图标为无
              duration: 2000 // 持续时间2秒
            });
          }
        },
        fail: (error) => { // 请求失败时的回调函数
          wx.showToast({ // 显示消息提示框
            title: '获取学生信息失败', // 提示信息
            icon: 'none', // 图标为无
            duration: 2000 // 持续时间2秒
          });
        }
      });
    }
  },

});