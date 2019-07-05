<template>
  <div class="user_info_main layout">
    <el-form
      status-icon
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
      class="demo-formLabelAlign"
      label-width="100px"
    >
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formLabelAlign.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formLabelAlign.sex">
          <el-option label="未知" :value="0"></el-option>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="formLabelAlign.birthday"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCardNo">
        <el-input v-model="formLabelAlign.idCardNo"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formLabelAlign.email"></el-input>
      </el-form-item>
      <el-form-item label="常住地址" prop="address">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('formLabelAlign')">重置数据</el-button>
        <el-button type="primary" @click="submitForm('formLabelAlign')">更新信息</el-button>
      </el-form-item>
    </el-form>
    <div v-if="phoneSmsCodeModal" class="phoneSmsCodeModal">
      <el-form
        status-icon
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAligns"
        class="formLabelAlign"
      >
        <el-form-item>
          <template>
            <el-col :span="12">
              <el-form-item>
                <el-input
                  type="number"
                  placeholder="请输入验证码"
                  v-model="formLabelAlign.verifyCode"
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
        <el-form-item>
          <el-button
            :loading="smsCodeSubmitLoding"
            class="formLabelAlign_btn"
            @click.stop="smsCodeSubmit"
            type="primary"
          >确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  apiGetUserInfoDetail,
  apiUpdateUserInfo,
  apiCheckUser,
  apiLoginSmsCode
} from "../fetch/AdminApi";
import { sendEvent,md5Mobile } from "../utils/util";
export default {
  data() {
    return {
      formLabelAlign: {
        address: undefined,
        birthday: undefined,
        email: undefined,
        idCardNo: undefined,
        name: undefined,
        nickName: undefined,
        phone: undefined,
        sex: undefined,
        verifyCode: undefined
      },
      codeDisabled: false,
      getCodeTxt: "获取验证码",
      oldPhone: "",
      phoneSmsCodeModal: false,
      smsCodeSubmitLoding: false,
      rules: {
        address: [
          {
            required: true,
            message: "请输入常住地址",
            trigger: ["blur", "change"]
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: ["blur", "change"]
          }
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["blur", "change"]
          }
        ],
        birthday: [
          {
            required: true,
            message: "请选择出生日期",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        idCardNo: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      apiGetUserInfoDetail().then(res => {
        if (res.data.code === "100") {
          this.formLabelAlign = res.data.content;
          let { nickName, name, phone } = res.data.content;
          this.oldPhone = phone;
          sendEvent("ShowUserInfo", nickName || name || phone);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.oldPhone != _this.formLabelAlign.phone) {
            this.phoneSmsCodeModal = true;
          } else {
            _this.pushData(_this.formLabelAlign,()=>{});
          }
        } else {
          return false;
        }
      });
    },
    pushData(val, callback) {
      apiUpdateUserInfo(val).then(res => {
        if (res.data.code === "100") {
          this.$message.success("更新成功");
          this.getUserInfo();
        } else {
          this.$message.error(res.data.description);
        }
        callback(res);
      });
    },
    smsCodeSubmit() {
      if (this.formLabelAlign.verifyCode) {
        this.smsCodeSubmitLoding = true;
        this.pushData(this.formLabelAlign, () => {
          this.smsCodeSubmitLoding = false;
          this.phoneSmsCodeModal = false;
        });
      }
    },
    getVerifyCode() {
      let _this = this;
      if (
        _this.formLabelAlign.phone &&
        _this.formLabelAlign.phone.length === 11
      ) {
        _this.codeDisabled = true;
        apiCheckUser({
          phone: _this.formLabelAlign.phone,
          username: _this.formLabelAlign.name
        })
          .then(res => {
            if (res.data.code === "100") {
              _this.count_down(60000);
              apiLoginSmsCode({
                key: md5Mobile(_this.formLabelAlign.phone),
                phone: _this.formLabelAlign.phone
              }).then(res => {
                if (res.data.code !== "100") {
                  _this.$message.error(res.data.description);
                }
              });
            } else {
              _this.codeDisabled = false;
              _this.phoneSmsCodeModal = false;
              _this.$message.error(res.data.description);
            }
          })
          .catch(req => {
            _this.codeDisabled = false;
            _this.phoneSmsCodeModal = false;
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
  }
};
</script>
<style lang="scss" scoped>

.verify_code {
  display: flex;
  justify-content: flex-end;
  > button {
    width: 120px;
  }
}
.phoneSmsCodeModal {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
}
.formLabelAlign {
  width: 20%;
  padding: 20px 20px 0;
  border-radius: 6px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.formLabelAlign_btn {
  width: 100%;
}
</style>

