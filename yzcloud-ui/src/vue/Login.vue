<template>
  <div class="vue_login">
    <i class="start_text">爱云职</i>
  </div>
</template>
<script>
import { getUrlParam, APPID, inSetTime } from "../utils/util";
import { apiVueCheckCode, apiLogin } from "../fetch/VueApi";
export default {
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      let access_token = sessionStorage.getItem;
      if (!access_token || access_token !== "wait") {
        const code = getUrlParam("code");
        const local = window.location.href;
        if (code == null || code === "") {
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            APPID +
            "&redirect_uri=" +
            encodeURIComponent(local) +
            "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
          // this.checkCode(code);
        } else {
          this.checkCode(code);
        }
      } else {
        this.$router.replace("/vue/home");
      }
    },
    checkCode(code) {
      let _this = this;
      apiVueCheckCode(code).then(res => {
        if (res.data.code === "100") {
          // 处理登录；
          let { username } = res.data.content;
          let params = {
            grant_type: "password",
            username,
            password: "abcd1234"
          };
          apiLogin(params).then(res => {
            if (res.status === 200) {
              _this.$router.replace("/vue/home");
            } else {
              Toast.text("登录失败,请刷新重试");
            }
          });
        } else if (res.data.code === "03800404") {
          let { openid } = res.data.content;
          _this.$router.replace("/vue/register/" + openid);
        } else {
          Toast.text(res.data.description);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.vue_login {
  height: 100%;
  background: url("../assets/images/start_bg.png") no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 34px;
  line-height: 1.5em;
  font-weight: bolder;
}
</style>
