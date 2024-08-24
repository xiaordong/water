var app = getApp();var _page=0;//当前分页页码

Page({
  data: {
    type: '',
    detail: '',
    dormBuilding: '',
    telephone: '',
    appointmentTime: '',
    appointmentDate:'',
    status:''
  },

  // 输入框内容变化事件
  handleInput: function (e) {
    const fieldName = e.currentTarget.dataset.name;
    this.setData({
      [fieldName]: e.detail.value
    });
  },

  // 提交表单事件处理函数
  bx_26_26_click() {
    // 获取表单数据
    const formData = {
      type: this.data.type,
      detail: this.data.detail,
      dormBuilding: this.data.dormBuilding,
      telephone: this.data.telephone,
      Time: this.data.appointmentDate+this.data.appointmentTime
    };
    console.log(formData)
    // Perform any validation here before submitting
    if (formData.type === '' || formData.detail === '' || formData.dormBuilding=== '' || formData.telephone === '' || formData.Time === '') {
      wx.showToast({
        title: '请将报修申请填写完整',
        icon: 'none'
      });
      return;
    }
    console.log(formData)
    const aToken=wx.getStorageSync('aToken'); 
    // 提交表单数据到后端
    wx.request({
      url: 'https://blog.xiaordong.cn/application/new', 
      method: 'POST',
      header:{
        'Authorization':`${aToken}`
      },
      data: formData,
      success: (res) => {
        // 处理后端返回的成功响应
        console.log(res.data);
        // 提交成功后清空表单数据
        this.setData({
          type: '',
          detail: '',
          dormBuilding: '',
          telephone: '',
          appointmentTime: '',
          appointmentDate: ''
        });
        wx.showToast({
          title: '报修申请成功',  // 提示用户注册成功
        });
      },
      fail: function (err) {
        // 处理后端返回的错误响应
        console.error(err);
      }
    });
  },
});  

