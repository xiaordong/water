var app = getApp();var _page=0;//当前分页页码

Page({
  data: {
    student_id: '',  // 学号
    password: '',  // 密码
  },

  // 输入框内容变化事件
  handleInput: function (e) {
    const fieldName = e.currentTarget.dataset.name;
    this.setData({
      [fieldName]: e.detail.value
    });
  },

  // 登录操作
  login: function () {
    // 向后端发送请求验证学号和密码
    console.log(this.data)
    wx.request({
      url: 'https://xiaordong.cn/user/login',
      method: 'GET',
      data: {
        student_id: parseInt(this.data.student_id),
        password: this.data.password
      },
      success: (res) => {
        if (res.statusCode===200) {
          const aToken = res.data.aToken
          // 登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            success: function () {
              // 将学号存储到缓存中
              //wx.setStorageSync('student_id', this.data.student_id);
              
              try{
                wx.setStorageSync('aToken', aToken);
                console.log('aToken已保存到本地缓存');
                // 跳转到指定页面
                wx.redirectTo({
                  url: '/pages/index/index'
                });
              }catch(e){
                console.error('保存aToken到本地缓存失败：',e)
              } 
            }
          });
        } else {
          // 登录失败，显示错误信息
          wx.showToast({
            title: '账户或密码错误',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (error) => {
        // 请求失败，显示错误信息
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});