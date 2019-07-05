<template>
  <div id="app">
    <div class="app">
      <SaasNavbar />
      <div class="app_content">
        <div class="app_content_header">
          <el-popover placement="bottom" width="100" trigger="hover">
            <div class="app_content_header_user">
              <el-button type="text" @click.stop="go2UserInfo">修改信息</el-button>
              <el-button type="text" @click.stop="goOut">退出登录</el-button>
            </div>
            <el-button type="text" slot="reference">{{nickName}}</el-button>
          </el-popover>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SaasNavbar from "../components/SaasNavbar";
import {
  apiGetTaskBill,
  apiGetUserInfo,
  apiLoginOut
} from "../fetch/AdminApi";
import AuthProvider from "../fetch/AuthProvider";
import { mapGetters } from "vuex";
import { sendEvent } from "../utils/util";
export default {
  name: "App",
  data() {
    return {
      nickName: undefined,
    };
  },
  components: {
    SaasNavbar
  },
  mounted() {
    let _this = this;
    window.addEventListener("InitData", function() {
      if (AuthProvider.getCookie("access_token")) {
        if (JSON.stringify(_this.BillType) === "[]") {
          apiGetTaskBill().then(res => {
            if (res.data.code === "100") {
              _this.$store.commit("SAVE_TASK_BILL", res.data.content);
            }
          });
        }
        if (!_this.nickName) {
          apiGetUserInfo().then(res => {
            if (res.data.code === "100") {
              _this.nickName =
                res.data.content.nickName ||
                res.data.content.name ||
                res.data.content.phone;
            }
          });
        }
      }
    });
    window.addEventListener("ShowUserInfo", function(e) {
      _this.nickName = e.newValue;
    });
    window.addEventListener("ADMIN_LOGIN_401", function() {
      _this.$router.replace("/admin/login");
    });
    sendEvent("InitData", "InitData");
  },
  methods: {
    go2UserInfo() {
      this.$router.push("/admin/userinfo");
    },
    goOut() {
      apiLoginOut().then(res => {
        if (res.data.code === "100") {
          AuthProvider.deleteCookie("access_token");
          AuthProvider.deleteCookie("refresh_token");
          this.$router.replace("/admin/login");
        } else {
          this.$message.error(res.data.description);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["BillType"])
  }
};
</script>

<style>
.app {
  height: 100%;
  display: flex;
}
#app,
html,
body {
  height: 100%;
}
.app_content {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
a,
img {
  display: block;
}
a {
  text-decoration: none;
  color: #01aaef;
}
* {
  margin: 0;
  padding: 0;
}
.layout {
  height: calc(100% - 60px);
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
}
.mv_main {
  height: 100%;
}
.mv_main_footer {
  height: 60px;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
}
.mv_main_footer .i_footer {
  font-size: 24px;
  margin-bottom: 4px;
}
.btn_footer {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}
.btn_footer.activeColor {
  color: #00d69e;
}
.layout_mv {
  height: calc(100% - 61px);
  overflow-y: auto;
  box-sizing: border-box;
  background: #f5f6f7;
}
.app_content_header {
  height: 60px;
  box-shadow: 0 0 8px rgb(84, 92, 100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}
.app_content_header_user {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.app_content_header_user button {
  margin-left: 0 !important;
}
.weui-btn_primary {
  background: #00d69e !important;
}
.weui-btn_plain-primary {
  color: #00d69e !important;
  border-color: #00d69e !important;
}
</style>
