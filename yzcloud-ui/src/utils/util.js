import md5 from 'md5';

export function inTaskData(value) {
  value.startTime = value.startTime ? formatTimeAll(value.startTime) : undefined;
  value.endTime = value.endTime ? formatTimeAll(value.endTime) : undefined
  if (value.taskPersonType !== 'FIXED') {
    value.totalPeople = -1;
  }
  if (!value.limitAddress) {
    value.address = '';
    value.latitude = '';
    value.longitude = '';
  }
  delete value.taskPersonType;
  return value;
}
export function outTaskData(value) {
  value.startTime = new Date(value.startTime);
  value.endTime = new Date(value.endTime);
  if (value.totalPeople != -1) {
    value.taskPersonType = 'FIXED'
  } else {
    value.taskPersonType = '-1'
  }
  return value;
}

export function inSetTime(value) {
  value.startTime = value.startTime ? formatTimeAll(value.startTime) : undefined;
  value.endTime = value.endTime ? formatTimeAll(value.endTime) : undefined;
  return value;
}
export function inSetDataValue(value) {
  if (value.opDate) {
    value.opDate = insetDate(value.opDate);
  }
  if (value.startTime) {
    value.startTime = insetDate(value.startTime);
  }
  if (value.endTime) {
    value.endTime = insetDate(value.endTime);
  }
  return value;
}

export const formatTimeAll = (num) => {
  let date = new Date(num);
  let Y = date.getFullYear();//年
  let M = date.getMonth() + 1;//月
  let D = date.getDate();//日
  let h = date.getHours();//时
  let m = date.getMinutes();//分
  let s = date.getSeconds();//秒
  return [Y, M, D].map(fullZero).join('-') + ' ' + [h, m, s].map(fullZero).join(':');
}

export function fullZero(num) {
  num = parseInt(num);
  let n = num.toString();
  return n[1] ? n : '0' + n;
}

export function insetDate(num) {
  let date = new Date(num);
  let Y = date.getFullYear();//年
  let M = date.getMonth() + 1;//月
  let D = date.getDate();//日
  return [Y, M, D].map(fullZero).join('-');
}
export const md5Mobile = (mobile) => {
  let start = mobile.substr(0, 4);
  let end = mobile.substr(-4);
  return `${md5(start + end)}`
}

export const checkBilltypeF = (value, arr) => {
  let onArr = arr.filter(item => item.id == value);
  if (onArr.length) {
    return onArr[0].name
  }
}
export const checkTasktypeF = (value, arr) => {
  let onArr = arr.filter(item => item.id == value);
  if (onArr.length) {
    return onArr[0].name
  }
}
export const taskStatusF = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '草稿';
    case '1':
    case 1:
      return '已发布';
    case '2':
    case 2:
      return '进行中';
    case '3':
    case 3:
      return '已满员';
    case '4':
    case 4:
      return '已结束';
    default:
      return "未知";
  }
}
// 事件发射器
export function sendEvent(key, value) {
  const event = new Event(key);
  event.newValue = value;
  window.dispatchEvent(event);
}
export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export const APPID = 'wx03491f8901b54c2c'; // appid



export function wxShare({ title, desc, link, imgUrl }) {
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // 设置成功
      }
    });
    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // 设置成功
      }
    })
  });
}

export function detectmob() {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true; // 移动端
  }
  else {
    return false; // pc端
  }
}

export function login401() {
  if (detectmob()) {
    sendEvent('VUE_LOGIN_401', "VUE_LOGIN_401");
  } else {
    sendEvent('ADMIN_LOGIN_401', "VUE_LOGIN_401");
  }
}

export function saveCookie(cookieName, cookieValue, cookieDates) {
  var d = new Date();
  d.setDate(d.getDate() + cookieDates);
  document.cookie = cookieName + "=" + cookieValue + ";expires=" + d.toGMTString();
}

export function getCookie(key) {
  let aCookie = document.cookie.split("; ");
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split("=");
    if (key == aCrumb[0]) {
      return unescape(aCrumb[1]);
    }
  }
  return null;
}