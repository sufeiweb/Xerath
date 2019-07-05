import * as types from './types';
// import * as NativeFun from '../services/NativeFun';
// import * as services from '../services/index';

export default {
  loginStateTrue: ({
    commit, state
  }) => {
    commit(types.LOGINSTATE_TRUE);
  },//登录
  loginStateFalse: ({
    commit, state
  }) => {
    commit(types.LOGINSTATE_FALSE);
  },//退出
  errorStateTrue: ({
    commit, state
  }) => {
    commit(types.ERRORSTATE_TRUE)
  },//显示错误信息
  errorStateFalse: ({
    commit, state
  }) => {
    commit(types.ERRORSTATE_FALSE)
  },//隐藏错误信息
  changeToolbar: ({
    commit, state
  }, value) => {
    commit(types.CHANGE_TOOLBAR, value)
  },
}