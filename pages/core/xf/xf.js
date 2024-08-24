//xf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    Amount: "", // 余额
    student_name: "", // 学生姓名
    student_id: '', // 学生ID
    dormbuilding:'',

    currentimage1:'/images/core/xf/gou.png',
    currentimage2:'/images/core/xf/gou.png',
    color20:'#ffffff',
    color50:'#ffffff',
    color100:'#ffffff',
  },

  tap_20(){
    this.data.Amount='20';
    const colorList = ['#ffffff', '#ffaec9'];
    const index = (this.data.color20 === colorList[0]) ? 1 : 0;
    this.setData({
      color20: colorList[index]
    });
  },
  tap_100(){
    this.data.Amount='100';
    const colorList = ['#ffffff', '#ffaec9'];
    const index = (this.data.color100 === colorList[0]) ? 1 : 0;
    this.setData({
      color100: colorList[index]
    });
  },
  tap_50(){
    this.data.Amount='50';
    const colorList = ['#ffffff', '#ffaec9'];
    const index = (this.data.color50 === colorList[0]) ? 1 : 0;
    this.setData({
      color50: colorList[index]
    });
  },

  xf_16_16_click(){
    const imageList = ['/images/core/xf/gou.png', '/images/core/xf/gou(1).png'];
    const index = (this.data.currentimage1 === imageList[0]) ? 1 : 0;
    this.setData({
      currentimage1: imageList[index]
    });
  },

  xf_20_20_click(){
    const imageList = ['/images/core/xf/gou.png', '/images/core/xf/gou(1).png'];
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
    console.log(e.detail.value)
},
handlePayment: function () {
    // 检查所有字段是否填写
    if (!this.data.student_id || !this.data.student_name || !this.data.dormbuilding || !this.data.Amount) {
      wx.showToast({
        title: '请填写完整信息',  // 提示用户填写完整信息
        icon: 'none'
      });
      return;
    }
    // 将student_id转换为整数
    wx.request({
        url: 'https://blog.xiaordong.cn/consumption/new',
        method: 'POST',
        data: {
          student_id: this.data.student_id,
          student_name: this.data.student_name,
          dormbuilding: this.data.dormbuilding,
          Amount:this.data.Amount,
          type:'充值'
        },
        success: function (res) {
          // 处理成功响应
          if (res.statusCode===200)
          {
            console.log(res.data); 
            wx.showToast({
              title: '充值成功', 
              icon: 'success',
            });
          }else{
            // 处理失败响应
            console.error(res.data); 
            wx.showToast({
              title: '充值失败，请重试', 
              icon: 'none'
            });
          }
        },
    });
  }
});