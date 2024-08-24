//xf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    dormbuilding:'',
    ElectricFee:0,
    WaterFee:0,

    Amount:'',

    currentimage1:'/images/core/sdf/huan.png',
    currentimage2:'/images/core/sdf/huan.png'
  },

  onShow: function () { // 页面显示时执行
    const aToken=wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌  
    const student_db=wx.getStorageSync('student_db')
    this.setData({ // 更新页面数据
      dormbuilding: student_db, // 得到楼栋/宿舍号
    });
    console.log(student_db)
    console.log(this.data.dormbuilding)
    if (aToken) { // 如果存在访问令牌
      wx.request({
        url: 'https://blog.xiaordong.cn/user/fees', // 请求用户数据的URL
        method: 'GET', // 请求方法为GET
        header:{
          'Authorization':`${aToken}` // 在请求头中添加令牌
        },
        success: (res) => { // 请求成功时的回调函数
          if (res.statusCode === 200) { // 如果响应状态码为200
            this.setData({ // 更新页面数据
              ElectricFee:parseInt(res.data.data.ElectricFee),
              WaterFee:parseInt(res.data.data.WaterFee),
            });
            console.log('用户数据:',res.data.data); // 打印用户数据到控制台
          } else { // 如果响应状态码不为200
            wx.showToast({ // 显示消息提示框
              title: '获取水电费信息失败', // 提示信息
              icon: 'none', // 图标为无
              duration: 2000 // 持续时间2秒
            });
          }
        },
      });
    }
  },

  sdf_45_45_click(){
    const imageList = ['/images/core/sdf/huan.png', '/images/core/xf/gou(1).png'];
    const index = (this.data.currentimage1 === imageList[0]) ? 1 : 0;
    this.setData({
      currentimage1: imageList[index]
    });
  },

  sdf_47_47_click(){
    const imageList = ['/images/core/sdf/huan.png', '/images/core/xf/gou(1).png'];
    const index = (this.data.currentimage2 === imageList[0]) ? 1 : 0;
    this.setData({
      currentimage2: imageList[index]
    });
  },

  handleInput: function (e) {
    const name = e.currentTarget.dataset.name;
    // 在这里进行数据过滤和验证，确保数据的安全性
    this.setData({
        [name]: e.detail.value
    });
    console.log(name)
},
handlePayment: function () {
  const aToken=wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌
    // 检查所有字段是否填写
    if (!this.data.Amount) {
      wx.showToast({
        title: '请输入缴费金额',  // 提示用户填写完整信息
        icon: 'none'
      });
      return;
    }
    wx.request({
        url: 'https://blog.xiaordong.cn/user/pay',
        method: 'POST',
        header:{
          'Authorization':`${aToken}` // 在请求头中添加令牌
        },
        data: {
          Amount:this.data.Amount,
          type:'水电缴费'
        },
        success: function (res) {
          // 处理成功响应
          if (res.statusCode===200)
          {
            console.log(res.data); 
            wx.showToast({
              title: '缴费成功', 
              icon: 'success',
            });
          }else{
            // 处理失败响应
            console.error(res.data); 
            wx.showToast({
            title: '缴费失败，请重试', 
            icon: 'none'
          });
          }
        },
    });
  }
});