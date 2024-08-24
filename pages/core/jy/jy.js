var app = getApp();var _page=0;//当前分页页码

// jy.js
Page({
  data: {
    buildingNumber: "", // 存储输入的楼栋号
    admins: [
      {
        admin_name:'',
        admin_id:'',
        admin_phone:'',
        working_time:""
      },
    ] // 存储管理员信息
  },

  inputChange: function (e) {
    const fieldName = e.currentTarget.dataset.name;  // 获取输入字段名
    this.setData({
      [fieldName]: e.detail.value  // 更新数据
    });
    console.log(fieldName)
  },

  // 查询按钮点击事件
  jy_8_8_click() {
    // 检查楼栋号是否为空
    if (this.data.buildingNumber === '') {
      wx.showToast({
        title: '请输入楼栋号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 调用后端接口查询管理员信息
    wx.request({
      url: 'https://blog.xiaordong.cn/admin/datalist',
      method: 'GET',
      data: {
        buildingNumber: this.data.buildingNumber
      },
      success: res => {
        if (res.data.status===10000) {
          // 查询成功，更新管理员信息
          this.setData({
            admins: res.data.data 
          });
          console.log(res.data.data)
        } else {
          console.log(res.data)
          // 后端返回查询失败的情况
          wx.showToast({
            title: '楼栋号输入错误',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        console.error('查询失败：', err);
        // 查询失败的情况
        wx.showToast({
          title: '查询失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});

