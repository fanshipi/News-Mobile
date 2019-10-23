import request from "@/utils/request";

// 添加评论或评论回复
function setComment({ target, content, art_id }) {
  return request({
    url: "v1_0/comments",
    method: "POST",
    data: {
      target: target,
      content: content,
      art_id: art_id || null
    }
  });
}
// 获取评论或评论回复
function getComment({ type, source, offset, limit }) {
  return request({
    url: "v1_0/comments",
    method: "GET",
    params: {
      type,
      source,
      offset: offset || null,
      limit: limit || null
    }
  });
}
export { setComment, getComment };
