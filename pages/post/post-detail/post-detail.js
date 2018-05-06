import {DBPost} from '../../../db/DBPost'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var postId = options.id;
      console.log(postId);
      this.dbPost =new DBPost(postId);
      this.postData = this.dbPost.getPostItemById().data;
      console.log(this.postData);
      this.setData({
        post: this.postData
      })
  },
  onCollectionTap: function(e) {
    var that = this;
    var newData = this.dbPost.collect();
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    //应当有选择地更新部分数据
    that.setData({
      'post.collectionStatus' : newData.collectionStatus,
      'post.collectionNum': newData.collectionNum,
    })
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: 'success',
      mask: true
    })
  },
  onUpTap: function (e) {
    var that = this;
    var newData = this.dbPost.up();
    //重新绑定数据，注意不要将整个newData全部作为setData的参数
    //应当有选择地更新部分数据
    that.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum,
    })
    wx.showToast({
      title: newData.UupStatus ? "点赞成功" : "取消点赞",
      duration: 1000,
      icon: 'success',
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})