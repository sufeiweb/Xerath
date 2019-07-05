
import * as types from './types';

export default {
  [types.LOGINSTATE_TRUE]: (state) => {
    state.loginState = true;
  },
  [types.LOGINSTATE_FALSE]: (state) => {
    state.loginState = false;
  },
  [types.ERRORSTATE_TRUE]: (state) => {
    state.errorState = true;
  },
  [types.ERRORSTATE_FALSE]: (state) => {
    state.errorState = false;
  },
  [types.COUNTDOWNSTATE_TRUE]: (state) => {
    state.countDownState = true;
  },
  [types.COUNTDOWNSTATE_FALSE]: (state) => {
    state.countDownState = false;
  },
  [types.CHANGE_TOOLBAR]: (state, e) => {
    switch (e) {
      case 'getMeStatus':
        state.getMeStatus = true;
        state.getLoanStatus = false;
        break;
      case 'getLoanStatus':
        state.getMeStatus = false;
        state.getLoanStatus = true;
        break;
    }
  },
  [types.SAVE_CONSTANT]: (state, value) => {
    state[value.key] = value.code;
  },
  [types.SAVE_TASK_BILL]: (state, {billType,taskType}) => {
    state.billType = billType;
    state.taskType = taskType;
  },
  [types.LOGIN_STATUS]: (state, value) => {
    state.loginStatus = value;
  },
}