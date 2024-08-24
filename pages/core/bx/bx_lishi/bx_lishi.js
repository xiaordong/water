var app = getApp();var _page=0;//当前分页页码

Page({
  data: {
    bx_lishi:[]
  },

  // 显示报修历史的函数
  onShow: function () {
    const aToken=wx.getStorageSync('aToken'); 
    if(aToken){
      wx.request({
        url: 'https://blog.xiaordong.cn/application/datalist', 
        method: 'GET',
        header:{
          'Authorization':`${aToken}`
        },
        success: (res) => { // 请求成功时的回调函数
          if (res.statusCode === 200) { 
            const history=res.data.data;
            console.log(history)
            this.setData({ // 更新页面数据
              bx_lishi:history
            });
            console.log(this.data); 
          } else { // 如果响应状态码不为200
            wx.showToast({ // 显示消息提示框
              title: '获取报修历史失败', // 提示信息
              icon: 'none', // 图标为无
              duration: 2000 // 持续时间2秒
            });
          }
        }
      });
    }
  },

  bx_lishi_2_2_click: function (event) {
    const item = event.currentTarget.dataset.item;
    const itemId = item.ID;
    wx.setStorageSync('item_x', item);
    console.log("当前点击的是第 " + itemId + " 项");
    // 在这里可以进行其他操作，如页面跳转等
  }
});  

