// 封装所有的文章相关的请求

import request from "@/utils/request.js";

// 封装请求文章的方法
function getArticle({ channel_id, timestamp, with_top }) {
  return request({
    url: "v1_1/articles",
    method: "GET",
    params: {
      channel_id: channel_id,
      timestamp: timestamp,
      with_top: with_top
    }
  });
}

// 对文章不喜欢
function disLikeArticle(artId) {
  return request({
    url: "v1_0/article/dislikes",
    method: "POST",
    data: {
      target: artId
    }
  });
}

// 拉黑作者
function setBlacklist(aurId) {
  return request({
    url: "v1_0/user/blacklists",
    method: "POST",
    data: {
      target: aurId
    }
  });
}

// 举报文章
function reportArticle({ artId, type }) {
  return request({
    url: "v1_0/article/reports",
    method: "POST",
    data: {
      target: artId,
      type: type,
      remark: '看他不爽就是要举报'
    }
  });
}

// 联想
function thinkArticle(key) {
  return request({
    url: "v1_0/suggestion",
    method: "GET",
    params: {
      q: key
    }
  });
}

// 根据关键字获取分页的数据
function getSearchPage({page,per_page,key}){
  return request({
    url:'v1_0/search',
    method:"GET",
    params:{
      page:page,
      per_page:per_page,
      q:key
    }
  })
}
// 新闻文章详情
function getArticleDetail(artId){
  return request({
    url:`v1_0/articles/${artId}`,
    method:"GET"
  })
}
// get
//  params
// post
//  data

// 暴露方法
export { getArticle, disLikeArticle, setBlacklist, reportArticle, thinkArticle,getSearchPage,getArticleDetail};
