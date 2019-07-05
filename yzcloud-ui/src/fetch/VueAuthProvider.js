import { Axios } from './Axios';

import { sendEvent } from '../utils/util';


import { API_PATH } from './OriginName';

class VueAuthProvider {
  constructor() { };
  onLogin({ username, password, imageCode, sessionkey }) {
    const _this = this;
    const url = `${API_PATH}/api/oauth/token`;
    const param = imageCode ? `&imageCode=${imageCode}&sessionKey=${sessionkey}` : '';
    return Axios(url, { type: 'Basic', value: 'eGluZ3Fpbmd3eDpheXpoNQ==' }, `grant_type=password&username=${username}&password=${password}${param}`, 'POST')
      .then(res => {
        if (res.status === 200) {
          _this.saveTokens(res.data.access_token, res.data.refresh_token, res.data.expires_in);
        }
        return res;
      }).catch(reject => {
        return 'error'
      })
  }

  setWait() {
    sessionStorage.setItem('access_token', 'wait');
  }

  saveTokens(access_token, refresh_token, expires_in) {
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
    var exp = Date.now();
    var expires_ins = exp + expires_in * 1000 - 30000;
    sessionStorage.setItem('expires_ins', expires_ins);
  }

  onRefreshToken() {
    const refreshToken = sessionStorage.getItem('refresh_token');
    const url = API_PATH + '/api/oauth/token';
    this.setWait();
    return Axios(url, { type: 'Basic', value: 'eGluZ3Fpbmd3eDpheXpoNQ==' }, `grant_type=refresh_token&refresh_token=${refreshToken}`, 'POST')
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          if (data.access_token != undefined) {
            this.saveTokens(data.access_token, data.refresh_token, data.expires_in)
          }
          return data.access_token
        }
      }).catch(req => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('expires_ins');
        sendEvent('VUE_LOGIN_401', "VUE_LOGIN_401");
      })
  }

  getAccessToken() {
    let dt = Date.now();
    let expires_in = sessionStorage.getItem('expires_ins');
    let access_token = sessionStorage.getItem('access_token');
    let _this = this;
    if ((!expires_in || dt >= expires_in) && access_token) {
      return _this.onRefreshToken();
    } else if (access_token === 'wait') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          _this.getAccessToken().then(res => {
            resolve(res);
          });
        }, 2000);
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(access_token)
      })
    }
  }
}

export default new VueAuthProvider();