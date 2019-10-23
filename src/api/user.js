// 封装所有与 user 相关的请求 API

// 引入 request
import request from "@/utils/request";

// 请求登录 API 的方法
function userLogin({ mobile, code }) {
  return request({
    url: "v1_0/authorizations",
    method: "POST",
    data: {
      mobile: mobile,
      code: code
    }
  });
}

// 关注用户
function followUser(aut_id) {
  return request({
    url: "v1_0/user/followings",
    method: "POST",
    data: {
      target: aut_id
    }
  });
}
function unfollowUser(aut_id) {
  return request({
    url: `v1_0/user/followings/${aut_id}`,
    method: "DELETE"
  });
}

// 对文章不喜欢
function dislikeArt(art_id) {
  return request({
    url: "v1_0/article/dislikes",
    method: "POST",
    data: {
      target: art_id
    }
  });
}

// 取消对文章不喜欢
function undislikeArt(art_id) {
  return request({
    url: `v1_0/article/dislikes/${art_id}`,
    method: "DELETE"
  });
}

// 对文章点赞
function likings(art_id) {
  return request({
    url: "v1_0/article/likings",
    method: "POST",
    data: {
      target: art_id
    }
  });
}
// 取消对文章点赞
function unlikings(art_id) {
  return request({
    url: `v1_0/article/likings/${art_id}`,
    method: "DELETE"
  });
}
// 获取用户个人资料
function userProfile() {
  return request({
    url: "v1_0/user/profile",
    method: "GET"
  });
}
// 修改用户个人信息
function updateUser({
  name,
  photo,
  gender,
  birthday
  // real_name,
  // id_number,
  // id_card_front,
  // id_card_back,
  // id_card_handheld,
  // intro
}) {
  return request({
    url: "v1_0/user/profile",
    method: "PATCH",
    data: {
      name,
      photo,
      gender,
      birthday
    }
  });
}
// 编辑用户照片资料
function userPhotoupDate(photo){
  let fs = new FormData()
  fs.append("photo",photo)
  return request({
    url:"v1_0/user/photo",
    method:"PATCH",
    data:fs
  })
}

// 暴露
export {
  userLogin,
  followUser,
  unfollowUser,
  dislikeArt,
  undislikeArt,
  likings,
  unlikings,
  userProfile,
  updateUser,
  userPhotoupDate
};
