<template>
  <div id="vue">
    <div class="mv_main">
      <router-view />
      <div v-if="showFooter" class="mv_main_footer">
        <router-link
          to="/vue/home"
          replace
          :class="active ? 'btn_footer activeColor':'btn_footer'"
          tag="div"
        >
          <i class="el-icon-s-home i_footer"></i>
          <span>首页</span>
        </router-link>
        <router-link
          to="/vue/user"
          replace
          :class="!active ? 'btn_footer activeColor':'btn_footer'"
          tag="div"
        >
          <i class="el-icon-user-solid i_footer"></i>
          <span>我的</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vue",
  data() {
    return {
      nickName: undefined,
      active: false,
      showFooter: false
    };
  },
  mounted() {
    if (
      this.$router.history &&
      this.$router.history.current &&
      this.$router.history.current.path
    ) {
      let newPath = this.$router.history.current.path;
      if (newPath.indexOf("vue/user") > -1) {
        this.active = false;
      } else if (newPath.indexOf("vue/home") > -1) {
        this.active = true;
      }
      if (
        newPath.indexOf("vue/register") > -1 ||
        newPath.indexOf("vue/start") > -1
      ) {
        this.showFooter = false;
      } else if (newPath.indexOf("admin") == -1) {
        this.showFooter = true;
      }
    }
    let _this = this;
    window.addEventListener("VUE_LOGIN_401", function() {
      _this.$router.replace("/vue/home");
    });
  },
  watch: {
    $route(to, from) {
      if (to.path.indexOf("vue/user") > -1) {
        this.active = false;
      } else if (to.path.indexOf("vue/home") > -1) {
        this.active = true;
      }
      if (to.path.indexOf("vue/register") > -1) {
        this.showFooter = false;
      } else if (to.path.indexOf("admin") == -1) {
        this.showFooter = true;
      }
    }
  }
};
</script>

<style>
#vue,
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
.task_status_color,
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
.weui-picker__action,
.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {
  color: #00d69e !important;
}
.weui-picker__action:first-child {
  color: #888 !important;
}
.list_empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.list_empty_content {
  font-size: 60px;
  color: #00d69e;
}
</style>
