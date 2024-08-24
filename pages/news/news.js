// transaction.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    startDateIndexInit: '',
    checkMaxDate: '',
    startDateIndex: '',

    endDateIndexInit: '',
    checkMinDate: '',
    endDateIndex: '',

    transaction: [], // 存储交易记录的数组
    yue:''
  },

  // 在入住日期 picker 组件的 bindchange 事件回调函数中更新入住日期的值，并根据当前选择的日期设置离开日期的最小可选日期
  bindCheckinDateChange: function (e) {
    const checkinDate = e.detail.value;
    const todayStr = new Date(checkinDate);
    const td = new Date(todayStr);

    td.setDate(td.getDate() + 1);
    // const td = td.toISOString().substring(0, 10);

    // const  new Date(checkinDate).getTime() + 24 * 60 * 60 * 1000
    console.dir('In ======> '+ td.toISOString().substring(0, 10));
    this.setData({
      startDateIndex: checkinDate,
      checkMinDate: td.toISOString().substring(0, 10)
    });
  },

  // 在离开日期 picker 组件的 bindchange 事件回调函数中更新离开日期的值，并根据当前选择的日期设置入住日期的最大可选日期
  bindCheckoutDateChange: function (e) {
    const checkoutDate = e.detail.value;

    const yesterdayStr = new Date(checkoutDate);
    const yd = new Date(yesterdayStr);

    yd.setDate(yd.getDate() - 1);

    // console.dir(checkoutDate); 
    console.dir('Out ======> '+ yd.toISOString().substring(0, 10));
    if (checkoutDate <= this.data.startDateIndex) {
      wx.showToast({
        title: '离开日期必须晚于入住日期',
        icon: 'none'
      });
      return;
    }
    // new Date(checkoutDate).getTime() - 24 * 60 * 60 * 1000
    this.setData({
      endDateIndex: checkoutDate,
      checkMaxDate: yd.toISOString().substring(0, 10)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    console.dir("today ==== "+ today);
    console.dir("tomorrow ==== "+ tomorrow.toLocaleDateString().substring(0, 10));
    this.setData({
      // startDateIndexInit: today.getTime(),
      checkMaxDate: today.toISOString().substring(0, 10),
      startDateIndex: today.toISOString().substring(0, 10),

      checkMinDate: tomorrow.toISOString().substring(0, 10),
      // endDateIndexInit: tomorrow.getTime(), // 设置为明天的日期
      endDateIndex: tomorrow.toISOString().substring(0, 10),
    });
  },

  
  // 查询交易记录的函数
  handlePayment: function () {
    const aToken=wx.getStorageSync('aToken'); 
    // 用实际的后端调用替换 'fetchTransactionRecords'
    if(aToken){
      wx.request({
        url: 'https://blog.xiaordong.cn/consumption/datalist', 
        method: 'GET',
        header:{
          'Authorization':`${aToken}`
        },
        data: {
          start_time: this.data.startDateIndex,
          end_time: this.data.endDateIndex
        },
        success: res => {
          const transactions = res.data.data;
          console.log(transactions)
          // 更新数据中的 transactionRecords
          this.setData({
            transaction: transactions 
          });
          console.log(this.data)
        },
        fail: err => {
          console.error('获取交易记录时出错:', err);
        }
      });
    }
  },
  
})