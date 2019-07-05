import VueAuthProvider from './VueAuthProvider';
import { Axios } from './Axios';
import { API_PATH } from './OriginName';
import { inTaskData } from "../utils/util";

function authsecApi(url, data, type) {
  return VueAuthProvider.getAccessToken().then(token => {
    return Axios(API_PATH + url, { type: 'bearer', value: token }, data, type);
  })
}

// 获取通过微信鉴权code获取用户是否存在
export const apiVueCheckCode = data => {
  return Axios(API_PATH + '/api/noauth/check/user/wxcode?wxcode=' + data, null, null, "GET");
}
// export const apiVueCheckCode = data => {
//   return authsecApi('/api//noauth/check/user/wxcode?', data, "GET");
// }
// admin 登录接口
export const apiLogin = data => VueAuthProvider.onLogin(data);
// 手机验证码
export const apiLoginSmsCode = data => Axios(API_PATH + '/api/noauth/register/user/verifycode', null, data, "POST");
// 微信注册用户
export const apiVueRegister = data => {
  return Axios(API_PATH + '/api/noauth/register/user', null, data, "POST");
}

// admin 获取当前用户信息 
export const apiGetUserInfo = data => {
  return authsecApi('/api/authsec/user/info', data, "GET");
}
// admin 获取当前用户信息 
export const apiGetUserInfoDetail = data => {
  return authsecApi('/api/authsec/user/info/detail', data, "GET");
}

// admin 修改个人信息
export const apiUpdateUserInfo = data => {
  return authsecApi('/api/authsec/user/info', data, "PUT");
}
// vue 用户获取任务列表
export const apiVueTaskList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/task/tasklist?page=${page - 1}&size=${size}`, rest, "POST");
}
// vue 用户获取历史任务列表
export const apiVueTaskHistoryList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/task/history/tasklist?page=${page - 1}&size=${size}`, rest, "POST");
}
// vue 用户获取任务详情
export const apiVueTaskDetail = data => {
  return authsecApi(`/api/authsec/task/detail?id=${data}`, null, "GET");
}
// vue 用户申请、取消申请任务
export const apiVueTaskOption = data => {
  return authsecApi(`/api/authsec/task/apply/action`, data, "POST");
}

// admin 获取人任务及报酬类型
export const apiGetTaskBill = data => {
  return authsecApi(`/api/authsec/sysdata/optionlist/task_bill`, data, "POST");
}