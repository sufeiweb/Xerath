import { Axios } from './Axios';

import { sendEvent } from '../utils/util';


import { API_PATH } from './OriginName';

class AuthProvider {
  constructor() { };
  onLogin({ username, password, imageCode, sessionkey }) {
    const _this = this;
    const url = `${API_PATH}/api/oauth/token`;
    const param = imageCode ? `&imageCode=${imageCode}&sessionKey=${sessionkey}` : '';
    return Axios(url, { type: 'Basic', value: 'eGluZ3Fpbmc6YXl6' }, `grant_type=password&username=${username}&password=${password}${param}`, 'POST')
      .then(res => {
        if (res.status === 200) {
          _this.saveTokens(res.data.access_token, res.data.refresh_token, res.data.expires_in);
        }
        sendEvent("InitData", "InitData");
        return res;
      }).catch(reject => {
        return 'error'
      })
  }

  setWait() {
    let exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 5);
    document.cookie = `access_token=${escape('wait')};expires=${exp.toGMTString()};path=/`;
  }

  saveTokens(access_token, refresh_token, expires_in) {
    let exp = new Date();
    exp.setTime(exp.getTime() + expires_in * 1000 - 30000)
    document.cookie = `access_token=${escape(access_token)};expires=${exp.toGMTString()};path=/`;
    document.cookie = `refresh_token=${escape(refresh_token)};path=/`;
  }

  onRefreshToken() {
    const refreshToken = this.getCookie('refresh_token');
    const url = API_PATH + '/api/oauth/token';
    this.setWait();
    return Axios(url, { type: 'Basic', value: 'eGluZ3Fpbmc6YXl6' }, `grant_type=refresh_token&refresh_token=${refreshToken}`, 'POST')
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          if (data.access_token != undefined) {
            this.saveTokens(data.access_token, data.refresh_token, data.expires_in)
          }
          return data.access_token
        }
      }).catch(req => {
        this.deleteCookie('access_token');
        this.deleteCookie('refresh_token');
        this.deleteCookie('webclient_id');
        sendEvent('ADMIN_LOGIN_401', "VUE_LOGIN_401");
      })
  }

  getCookie(key) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
      let aCrumb = aCookie[i].split("=");
      if (key == aCrumb[0]) {
        return unescape(aCrumb[1]);
      }
    }
    return null;
  }

  getAccessToken() {
    let _this = this;
    if (!_this.getCookie('access_token')) {
      return _this.onRefreshToken();
    } else if (_this.getCookie('access_token') == 'wait') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          _this.getAccessToken().then(res => {
            resolve(res);
          });
        }, 2000);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.getCookie('access_token'));
      })
    }
  }

  deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
}

export default new AuthProvider();