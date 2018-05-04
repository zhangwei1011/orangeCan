// var DBPost = function() {
//   this.storageKeyName = 'postList'; // 所有的文章本地缓存存储键值
//   this.postId = postId;
// }
// DBPost.prototype = {
//   //得到全部文章信息
//   getAllPostData:function() {
//     var res = wx.getStorageSync(this.storageKeyName);
//     if(!res) {
//       res = require('../data/data.js').postList;
//       this.execSetStorageSync(res);
//     }
//     return res;
//   },

//   //本地缓存，保存/更新
//   execSetStorageSync:function(data) {
//     wx.setStorageSync(this.storageKeyName, data);
//   },

//   // 获取指定id号的文章数据
//   getPostItemById:function() {
//     var postsData = this.getAllPostData();
//     var len = postsData.length;
//     for(var i=0;i<len;i++) {
//       if(postsData[i].postId == this.postId) {
//         return {
//           index: i,
//           data: postsData[i]
//         }
//       }
//     }
//   }
// }
// module.exports = {
//   DBPost: DBPost
// }

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList'; // 所有的文章本地缓存存储键
    this.postId = postId;
  }
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  //本地缓存，保存/更新
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  // 获取指定id号的文章数据
  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }
}

export {DBPost}