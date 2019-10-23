// 封装所有操作频道的方法

import request from "@/utils/request";

// 获取用户频道数据
function getChannel() {
  return request({
    url: "v1_0/user/channels",
    method: "GET"
  });
}

// 获取所有频道数据
function getAllChannel() {
  return request({
    url: "v1_0/channels",
    method: "GET"
  });
}

// 修改频道信息
function setChannel({ channels }) {
  return request({
    url: "v1_0/user/channels",
    method: "PUT",
    data: {
      channels: channels
    }
  });
}

export { getChannel, getAllChannel, setChannel };
