// 操作 localstorage

const AUTHOR_KEY = "user";

// 设置数据的方法
function setAuthor(data) {
  window.localStorage.setItem(AUTHOR_KEY, JSON.stringify(data));
}

// 取出数据的方法
function getAuthor() {
  return JSON.parse(window.localStorage.getItem(AUTHOR_KEY));
}

// 删除数据
function removeAuthor() {
  window.localStorage.removeItem(AUTHOR_KEY);
}

export { setAuthor, getAuthor, removeAuthor };
