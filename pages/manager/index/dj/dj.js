var app = getApp();var _page=0;//当前分页页码

Page({  
  /**
   * 页面的初始数据
   */
  data: {  
    dj_6:'写当前时间',//
 
    //系统默认参数
    clientHeight:0,//滑动门计算高度使用
    apiUrl:'',//后端接口地址
    id:'',//传值使用,方便存在本地的locakStorage  
    del_id:'',//方便存在本地的locakStorage  
    response:'' //存取返回数据  
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //app.checkLogin();//检查登录
    //app.getLaction();//得到gps

    //检测有没有传入id参数
    if (options.id != null && options.id !=""){
      this.setData({
        id: options.id
      })
    }   
    //执行初始化,需要用的时候，可以把注释取掉
    //this.dataRefresh("init");

    //滑动门自适应swiper高度
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示 需要用的时候，可以把注释取掉
   */
  onShow: function () {
	//刷新页面
	//this.dataRefresh("init");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作,需要用的时候，可以把注释取掉
   */
  onPullDownRefresh: function () {
    //// 显示顶部刷新图标  
    //_page=0;
    //wx.showNavigationBarLoading();  
    //this.dataRefresh("init");
  },

  /**
   * 页面上拉触底事件的处理函数,需要用的时候，可以把注释取掉
   */
  onReachBottom: function () {
    //var that = this;
    //// 显示加载图标  
    //wx.showLoading({
    //  title: '玩命加载中',
    //})
    //// 页数+1  
    //_page = parseInt(_page) + 1;  

    //this.dataRefresh("init");
  },


  /**
   * ---------------------------------------
   */

  /**
* input处理函数
*/
dj_6_input:function(e){
    this.setData({  
      6: e.detail.value
    })  
    console.log(e.detail.value)  
},

/**
* dj_7_7处理函数
* 数据绑定  data-index="{{index}}" 
* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.data.list_cata_list[index];
*/
dj_7_7_click:function(e){

},

/**
* dj_11_11处理函数
* 数据绑定  data-index="{{index}}" 
* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.data.list_cata_list[index];
*/
dj_11_11_click:function(e){

},

/**
* dj_17_17处理函数
* 数据绑定  data-index="{{index}}" 
* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.data.list_cata_list[index];
*/
dj_17_17_click:function(e){

},


 
  /**
   * ---------------------------------------
   */

  //刷新数据
  dataRefresh:function(_action) {
    //提交到服务器
    var that = this
    wx.request({
      url: this.data.apiUrl+'{server_code_file_path}',//后端接口地址，需要改成自己的接口地址
      data: {
      },
      method: 'GET',
      success: function (res) {//后端返回数据
        console.log(res.data);
        var tmp = res.data;

        //初始化，对页面上的控件进行赋值操作
        if(_action=="init"){
		that.setData({

			response: res
		})
	}
	//如果后端有返回消息，则弹出消息提示
	if (tmp.message != null && tmp.message != "") {
          wx.showToast({
            title: tmp.message,
            icon: 'none',
            duration: 2000
          })
        }
        
	//如果后端有返回页码，则更改当前页码
	if(tmp._page!=null && tmp._page!=""){
	  _page=tmp._page;
	}
	
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();  

        // 隐藏加载框  
        wx.hideLoading();  

      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })
  },

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})  

