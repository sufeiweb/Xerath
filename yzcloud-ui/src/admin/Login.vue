<template>
  <div class="login_main">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="forgetHere">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <router-link class="forgetHere_password" to="/admin/register/update">忘记密码</router-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="confirm_btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <div class="register_footer">
          <router-link class="forgetHere_password" to="/admin/register">注册账号</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { apiLogin } from "../fetch/AdminApi";
import AuthProvider from "../fetch/AuthProvider";
import { sendEvent } from "../utils/util";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        grant_type: "password",
        username: "",
        password: ""
      },
      checked: false,
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiLogin(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.$router.push("/admin/task");
            } else {
              this.$message({
                message: res.data.description,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "请确保数据填写完整",
            type: "error"
          });
          return false;
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("usermessage")) {
      this.ruleForm = JSON.parse(localStorage.getItem("usermessage"));
      this.checked = true;
    } else {
      this.checked = false;
    }
    if (
      AuthProvider.getCookie("access_token") &&
      AuthProvider.getCookie("access_token") !== "wait"
    ) {
      this.$router.replace("/admin/task");
    }
  },
  watch: {
    checked: function(val) {
      if (val) {
        localStorage.setItem("usermessage", JSON.stringify(this.ruleForm));
      } else {
        localStorage.removeItem("usermessage");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login_main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  background: -webkit-linear-gradient();
  .demo-ruleForm {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 350px;
    max-height: 200px;
    .confirm_btn {
      width: 100%;
    }
  }
  .forgetHere {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .register_footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
