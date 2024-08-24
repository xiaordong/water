Page({
  data: {
    dorm_number: '',  // 寝室号
    dormbuilding:""
  },

  // 输入框内容变化事件
  onAccountInput: function (e) {
    this.setData({
      dorm_number: e.detail.value
    });
  },

  // 登录操作
  onLogin: function () {
    const dormNumber = this.data.dorm_number;

    // 检查是否填写了寝室号
    if (!dormNumber) {
      wx.showToast({
        title: '请填写寝室号',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 向后端发送请求验证寝室号
    wx.request({
      url: 'https://your-backend-url.com/verify-dorm',
      method: 'POST',
      data: {
        dorm_number: dormNumber
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = res.data;

          if (data.valid) {  // 后端返回的信息表示寝室号有效
            // 将寝室号存储到缓存中
            try {
              wx.setStorageSync('dorm_number', dormNumber);
              console.log('寝室号已保存到本地缓存');
              // 跳转到指定页面
              wx.redirectTo({
                url: 'pages/manager/index/cx/qs/qs'
              });
            } catch (e) {
              console.error('保存寝室号到本地缓存失败：', e);
            }
          } else {
            // 寝室号信息填写不正确
            wx.showToast({
              title: '寝室号信息填写不正确',
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          // 请求失败，显示错误信息
          wx.showToast({
            title: '请求失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (error) => {
        // 请求失败，显示错误信息
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});