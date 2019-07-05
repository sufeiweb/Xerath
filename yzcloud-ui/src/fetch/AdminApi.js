import AuthProvider from './AuthProvider';
import { Axios, UploadFile } from './Axios';
import { API_PATH } from './OriginName';
import { inTaskData } from "../utils/util";

function authsecApi(url, data, type) {
  return AuthProvider.getAccessToken().then(token => {
    return Axios(API_PATH + url, { type: 'bearer', value: token }, data, type);
  })
}
// admin 登录接口
export const apiLogin = data => AuthProvider.onLogin(data);

// admin 注册接口
export const apiRegister = data => Axios(API_PATH + '/api/noauth/register/admin/user', null, data, "POST");

// 手机验证码
export const apiLoginSmsCode = data => Axios(API_PATH + '/api/noauth/register/user/verifycode', null, data, "POST");
// 校验用户是否能用
export const apiCheckUser = data => Axios(API_PATH + '/api/noauth/check/user/loginname', null, data, "POST");
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

// admin 修改企业信息
export const apiUpdateCompanyInfo = data => {
  return authsecApi('/api/authsec/user/company/info', data, "PUT");
}
// admin 获取企业信息
export const apiGetCompanyInfo = data => {
  return authsecApi('/api/authsec/user/company/info', data, "GET");
}

// admin 获取任务列表
export const apiGetTaskList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/admin/task/tasklist?page=${page - 1}&size=${size}`, rest, "POST");
}

// admin 新建任务
export const apiCreateTask = data => {
  return authsecApi('/api/authsec/admin/task', inTaskData(data), "POST");
}
// admin 删除任务
export const apiDeleteTask = data => {
  return authsecApi('/api/authsec/admin/task?id=' + data, null, "DELETE");
}
// admin 发布任务，取消发布
export const apiCancelTask = ({ id, type }) => {
  return authsecApi(`/api/authsec/admin/task/publish?id=${id}&type=${type}`, null, "PUT");
}
// admin 获取任务详情
export const apiGetTaskDetail = data => {
  return authsecApi(`/api/authsec/admin/task/detail?id=${data}`, null, "GET");
}

// admin 更新任务
export const apiUpdateTaskDetail = data => {
  return authsecApi(`/api/authsec/admin/task`, inTaskData(data), "PUT");
}

// admin 获取所有任务申请审核列表
export const apiAllTaskApplyList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/admin/task/apply/users?page=${page - 1}&size=${size}`, rest, "POST");
}

// admin 获取指定任务申请审核列表
export const apiAlongTaskApplyList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/admin/task/detail/apply/users?page=${page - 1}&size=${size}`, rest, "POST");
}

// admin 任务申请审核列表操作
export const apiTaskApplyOpreation = data => {
  return authsecApi(`/api/authsec/admin/task/apply/action`, data, "PUT");
}

// admin 获取人任务及报酬类型
export const apiGetTaskBill = data => {
  return authsecApi(`/api/authsec/sysdata/optionlist/task_bill`, data, "POST");
}
// admin 获取历史雇员接口
export const apiGetApplyUsers = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/admin/task/apply/history/users?page=${page - 1}&size=${size}`, rest, "POST");
}

export const apiLoginOut = data => {
  return authsecApi(`/api/authsec/user/logout`, data, "GET");
}


export const apiSalayList = data => {
  let { page, size, ...rest } = data;
  return authsecApi(`/api/authsec/admin/bill/salary/salarylist?page=${page - 1}&size=${size}`, rest, "POST");
}
export const apiUpdateSalayDetail = data => {
  return authsecApi(`/api/authsec/admin/bill/salary`, data, "PUT");
}
export const apiDeleteSalayDetail = data => {
  return authsecApi(`/api/authsec/admin/bill/salary?id=${data}`, null, "DELETE");
}
export const apiGetSalayDetail = data => {
  return authsecApi(`/api/authsec/admin/bill/salary/detail?id=${data}`, null, "GET");
}
export const apiUploadFile = data => {
  return AuthProvider.getAccessToken().then(token => {
    return UploadFile(API_PATH + url, { type: 'bearer', value: token }, data)
  })
}