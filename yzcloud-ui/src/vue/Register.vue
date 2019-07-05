<template>
  <div class="vue_register">
    <div class="demo-registerForm">
      <wv-input label="姓名" placeholder="请输入姓名" v-model="registerForm.name" required></wv-input>
      <wv-cell
        title="性别"
        is-link
        :value="sexValue[0] ? sexValue[0].name :''"
        @click.native="sexPickerShow = true"
      />
      <wv-cell
        title="出生日期"
        is-link
        :value="birthdayValue.join('-')"
        @click.native="birthdayPickerShow = true"
      />
      <wv-input label="手机号码" placeholder="请输入号码" v-model="registerForm.phone" required></wv-input>
      <wv-input label="验证码" placeholder="请输入验证码" v-model="registerForm.verifyCode">
        <button
          class="getCodeBtn weui-vcode-btn"
          :disabled="codeDisabled"
          @click="getVerifyCode"
          slot="ft"
        >{{getCodeTxt}}</button>
      </wv-input>
      <wv-checklist
        :options="[{
        label:'服务协议',
        value:true
      }]"
        v-model="checked"
      ></wv-checklist>
      <wv-button class="submit_register" type="primary" @click="onSubmit">注册</wv-button>
    </div>
    <div>
      <wv-picker
        :visible.sync="sexPickerShow"
        :columns="sexColumns"
        value-key="name"
        @confirm="confirmSex"
      />
      <wv-picker
        :visible.sync="birthdayPickerShow"
        :columns="birthdayColumns"
        @confirm="confirmBirthday"
        @change="changeBirthday"
      />
    </div>
  </div>
</template>
<script>
import { apiVueRegister,apiLogin,apiLoginSmsCode } from "../fetch/VueApi";
import { md5Mobile, insetDate, fullZero } from "../utils/util";
import { Toast } from "we-vue";
export default {
  data() {
    return {
      sexPickerShow: false, // 性别picker
      birthdayPickerShow: false, // 出生日期picker
      registerForm: {},
      sexValue: [],
      birthdayValue: [],
      sexColumns: [
        {
          values: [
            {
              name: "男",
              sex: 1
            },
            {
              name: "女",
              sex: 2
            }
          ]
        }
      ],
      birthdayColumns: [],
      checked: [],
      codeDisabled: false,
      getCodeTxt: "获取验证码"
    };
  },
  mounted() {
    this.setDate();
    this.registerForm.openid = this.$route.params.openid;
  },
  methods: {
    confirmSex(picker, value) {
      this.$nextTick(() => {
        this.sexValue = picker.getValues();
        this.registerForm.sex = picker.getValues()[0].sex;
      });
    },
    confirmBirthday(picker, value) {
      this.birthdayValue = picker.getValues().map(fullZero);
      this.registerForm.birthday = picker
        .getValues()
        .map(fullZero)
        .join("-");
    },
    changeBirthday(picker, value) {
      let y = picker.getValues()[0];
      let m = picker.getValues()[1];
      let Day = "";
      let run = y % 4;
      switch (m) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          Day = 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          Day = 30;
          break;
        default:
          if (!run) {
            Day = 28;
          } else {
            Day = 29;
          }
          break;
      }
      this.setDate(Day);
    },
    setDate(day) {
      let birthday = [
        {
          values: [],
          defaultIndex: 0
        },
        {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          defaultIndex: 0
        },
        {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          defaultIndex: 0
        }
      ];
      let odate = new Date();
      let Y = odate.getFullYear();
      for (let i = 0; i < 100; i++) {
        birthday[0].values.push(Y - i);
      }
      if (day) {
        birthday[2].values = [];
        for (let i = 0; i < day; i++) {
          birthday[2].values.unshift(day - i);
        }
      }
      this.birthdayColumns = birthday;
    },
    getVerifyCode() {
      let _this = this;
      if (_this.registerForm.phone && _this.registerForm.phone.length === 11) {
        _this.codeDisabled = true;
        _this.count_down(60000);
        apiLoginSmsCode({
          key: md5Mobile(_this.registerForm.phone),
          phone: _this.registerForm.phone
        }).then(res => {
          if (res.data.code !== "100") {
            Toast.text(res.data.description);
          }
        });
      } else {
        _this.codeDisabled = false;
        Toast.text("请填写正确的手机号码");
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
    },
    onSubmit() {
      let data = this.registerForm;
      let { birthday, name, openid, phone, sex, verifyCode } = data;
      if (!birthday || !name || !openid || !phone || !sex || !verifyCode) {
        Toast.text("请完善注册信息");
        return;
      }
      if (this.checked[0]) {
        apiVueRegister(data).then(res => {
          if (res.data.code === "100") {
            let params = {
              grant_type: "password",
              username: `wx_${this.registerForm.openid}`,
              password: "abcd1234"
            };
            apiLogin(params).then(res => {
              if (res.status === 200) {
                this.$router.replace("/vue/home");
              }
            });
          } else {
            Toast.text(res.data.description);
          }
        });
      } else {
        Toast.text("请勾选服务协议");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.vue_register {
  background: #fff;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 100px 20px 0;
  .getCodeBtn {
    width: 90px;
    color: #00d69e;
    font-size: 14px;
  }
  .submit_register {
    margin-top: 40px;
  }
  // .demo-registerForm {
  //   > div {
  //     position: relative;
  //   }
  // }
}
</style>
