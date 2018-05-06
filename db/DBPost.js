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
  //更新本地的点赞、评论信息、收藏、阅读量
  updatePostData(category) {
    var that = this;
    var itemData = that.getPostItemById(),
        postData = itemData.data,
        allPostData = that.getAllPostData();
    switch(category) {
      case 'collect':
          //处理收藏
          if(!postData.collectionStatus) {
            //如果当前状态是未收藏
            postData.collectionNum++;
            postData.collectionStatus = true;
          } else {
            postData.collectionNum--;
            postData.collectionStatus = false;
          }
          break;
      case 'up':
        //文章点赞功能
        if (!postData.upStatus) {
          //如果当前状态是未收藏
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        break;
      default:
          break;
    }
    //更新缓存数据库
    allPostData[itemData.index] = postData;
    that.execSetStorageSync(allPostData);
    return postData;
  }

  //收藏文章
  collect() {
    return this.updatePostData('collect');
  }

  //点赞或取消点赞
  up() {
    var data = this.updatePostData('up');
    return data;
  }
}

export {DBPost}