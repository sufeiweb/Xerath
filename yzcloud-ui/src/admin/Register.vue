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
        <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model="ruleForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input type="number" placeholder="请输入手机号" v-model="ruleForm.phoneNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机验证码" require>
        <template>
          <el-col :span="12">
            <el-form-item prop="code">
              <el-input
                type="number"
                placeholder="请输入验证码"
                v-model="ruleForm.code"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="verify_code">
            <el-button
              :loading="codeDisabled"
              :disabled="codeDisabled"
              @click.stop="getVerifyCode"
              v-html="getCodeTxt"
            ></el-button>
          </el-col>
        </template>
      </el-form-item>
      <!-- <el-form-item>
        <div class="forgetHere">
          <el-checkbox v-model="checked">同意并接受服务协议</el-checkbox>
          <router-link class="forgetHere_password" to="/admin/agreement">服务协议</router-link>
        </div>
      </el-form-item>-->
      <el-form-item>
        <el-button
          class="confirm_btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{forgetStatus ? "修改密码" : "注册"}}</el-button>
      </el-form-item>
      <el-form-item>
        <div class="register_footer">
          <router-link class="forgetHere_password" to="/admin/login">已有账号，直接登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { apiRegister, apiLoginSmsCode, apiCheckUser } from "../fetch/AdminApi";
import { md5Mobile } from "../utils/util";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePhoneNum = (rule, value, callback) => {
      if (value === "" || value.length !== 11) {
        callback(new Error("请输入手机号码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPassword: "",
        phoneNum: "",
        code: ""
        // checked: false
      },
      forgetStatus: null,
      checked: false,
      codeDisabled: false,
      getCodeTxt: "获取验证码",
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
        phoneNum: [{ validator: validatePhoneNum, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { username, password, code, phoneNum } = this.ruleForm;
          let data = {
            username,
            password,
            verifyCode: code,
            phone: phoneNum
          };
          apiRegister(data).then(res => {
            if (res.data.code) {
              this.$message.success("注册成功");
              this.$router.replace("/admin/login");
            } else {
              this.$message.error(res.data.description);
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
    },
    getVerifyCode() {
      let _this = this;
      if (_this.ruleForm.phoneNum && _this.ruleForm.phoneNum.length === 11) {
        _this.codeDisabled = true;
        apiCheckUser({
          phone: _this.ruleForm.phoneNum,
          username: _this.ruleForm.username
        })
          .then(res => {
            if (res.data.code === "100") {
              _this.count_down(60000);
              apiLoginSmsCode({
                key: md5Mobile(_this.ruleForm.phoneNum),
                phone: _this.ruleForm.phoneNum
              }).then(res => {
                if (res.data.code !== "100") {
                  _this.$message.error(res.data.description);
                }
              });
            } else {
              _this.codeDisabled = false;
              _this.$message.error(res.data.description);
            }
          })
          .catch(req => {
            _this.codeDisabled = false;
          });
      } else {
        _this.codeDisabled = false;
        _this.$message.error("请填写正确的手机号码");
      }
    },
    count_down(total_micro_second) {
      let _this = this;
      if (total_micro_second <= 0) {
        _this.getCodeTxt = "再次获取";
        _this.codeDisabled = false;
        return;
      }
      _this.getCodeTxt =
        _this.formatZero(_this.date_format(total_micro_second)) + "s";
      setTimeout(function() {
        total_micro_second -= 10;
        _this.count_down(total_micro_second);
      }, 10);
    },
    date_format(micro_second) {
      var second = Math.floor(micro_second / 1000);
      // 小时位
      var hr = Math.floor(second / 3600);
      // 分钟位
      var min = Math.floor((second - hr * 3600) / 60);
      // 秒位
      var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;
      // 毫秒位，保留2位
      var micro_sec = Math.floor((micro_second % 1000) / 10);
      return sec;
    },
    formatZero(str) {
      return str < 10 ? "0" + str : str;
    }
  },
  mounted() {
    this.forgetStatus = this.$route.params.type;
  },
  watch: {
    // checked: function(val) {
    //   if (val) {
    //     localStorage.setItem("usermessage", JSON.stringify(this.ruleForm));
    //   } else {
    //     localStorage.removeItem("usermessage");
    //   }
    // }
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
    width: 400px;
    height: 500px;
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
  .verify_code {
    display: flex;
    justify-content: flex-end;
    > button {
      width: 120px;
    }
  }
}
</style>