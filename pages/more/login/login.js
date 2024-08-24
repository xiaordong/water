var app = getApp();  // 获取小程序实例

var _page = 0;  // 当前分页页码

// index.js

Page({
  data: {
    student_id:"",  // 学号
    student_name:"",  // 姓名
    student_academy:'',
    buildingNumber: "",  // 楼号
    dormNumber: "",  // 寝室号
    password: "",  // 密码
    confirmPassword: ""  // 确认密码
  },

  handleInput: function (e) {
    const fieldName = e.currentTarget.dataset.name;  // 获取输入字段名
    this.setData({
      [fieldName]: e.detail.value  // 更新数据
    });
  },

  register: function () {
    console.log(this.data)
    // 检查所有字段是否填写
    if (!this.data.student_id || !this.data.student_name || !this.data.student_academy || !this.data.buildingNumber || !this.data.dormNumber || !this.data.password || !this.data.confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',  // 提示用户填写完整信息
        icon: 'none'
      });
      return;
    }

    // 检查密码是否匹配
    if (this.data.password !== this.data.confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',  // 提示用户密码输入不一致
        icon: 'none'
      });
      return;
    }

    // 发送数据到后端
    wx.request({
      url: 'https://blog.xiaordong.cn/user/register',  // 后端接口地址
      method: 'POST',  // 请求方法为POST
      data: {
        student_id: parseInt(this.data.student_id),
        student_name: this.data.student_name,
        student_academy:this.data.student_academy,
        buildingNumber: this.data.buildingNumber,
        dormNumber: this.data.dormNumber,
        password: this.data.password
      },
      success: function (res) {
        // 处理成功响应
        if (res.statusCode===200)
        {
          console.log(res.data);  // 打印响应数据到控制台
          wx.showToast({
            title: '注册成功',  // 提示用户注册成功
            icon: 'success',
            success: function () {
              // 注册成功后跳转到登录页面
              wx.navigateBack({
                delta: 1  // 返回页面数，这里表示返回上一级页面
              });
            }
          });
        }else{
          // 处理失败响应
          console.error(res.data);  // 打印错误信息到控制台
          wx.showToast({
          title: '注册失败，请重试',  // 提示用户注册失败
          icon: 'none'
        });
        }
      },
      
    });
  }
});