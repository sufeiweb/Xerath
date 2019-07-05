<template>
  <div class="vue_user_info layout_mv">
    <MvHeader />
    <div class="vue_user_info_content">
      <div class="content_body">
        <wv-input label="姓名" placeholder="请输入姓名" v-model="userInfo.name" required></wv-input>
        <wv-cell
          title="性别"
          is-link
          :value="sexValue[0] ? sexValue[0].name :''"
          @click.native="sexPickerShow = true"
        />
        <wv-cell
          title="出生日期"
          is-link
          :value="birthdayValue"
          @click.native="birthdayPickerShow = true"
        />
        <wv-input label="手机号码" placeholder="请输入号码" v-model="userInfo.phone" required></wv-input>
        <wv-input
          v-if="smsCodeModal"
          label="验证码"
          placeholder="请输入验证码"
          v-model="userInfo.verifyCode"
        >
          <button
            class="getCodeBtn weui-vcode-btn"
            :disabled="codeDisabled"
            @click="getVerifyCode"
            slot="ft"
          >{{getCodeTxt}}</button>
        </wv-input>
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
        <section class="card_item card_item_btn">
          <wv-button @click="goback" type="primary" :plain="true" :mini="true">取消</wv-button>
          <wv-button @click="submitInfo" type="primary" :mini="true">保存</wv-button>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import {
  apiLoginSmsCode,
  apiLogin,
  apiUpdateUserInfo,
  apiGetUserInfoDetail
} from "../fetch/VueApi";

import { md5Mobile, insetDate, fullZero } from "../utils/util";
import { Toast, Dialog } from "we-vue";
import MvHeader from "../components/Mv_header";
export default {
  data() {
    return {
      sexPickerShow: false, // 性别picker
      birthdayPickerShow: false, // 出生日期picker
      userInfo: {},
      sexValue: [],
      birthdayValue: '',
      sexColumns: [
        {
          values: [
            {
              name: "未知",
              sex: 0
            },
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
      codeDisabled: false,
      getCodeTxt: "获取验证码",
      smsCodeModal: false
    };
  },
  mounted() {
    this.setDate();
    apiGetUserInfoDetail().then(res => {
      if (res.data.code === "100") {
        this.userInfo = res.data.content;
        this.birthdayValue = res.data.content.birthday;
        this.oldPhone = res.data.content.phone;
        this.sexValue = this.sexColumns[0].values.filter(
          item => item.sex === res.data.content.sex
        );
      } else {
        Toast.text("获取个人信息失败，请返回首页刷新");
      }
    });
  },
  methods: {
    goback() {
      Dialog.confirm({
        title: "操作",
        message: "确定取消修改个人信息？",
        skin: "ios",
        showCancelButton: true
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
          Toast.text("取消操作！");
        });
    },
    confirmSex(picker, value) {
      this.$nextTick(() => {
        this.sexValue = picker.getValues();
        this.userInfo.sex = picker.getValues()[0].sex;
      });
    },
    confirmBirthday(picker, value) {
      this.birthdayValue = picker.getValues().map(fullZero).join('-');
      this.userInfo.birthday = picker.getValues().map(fullZero).join('-');
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
      if (_this.userInfo.phone && _this.userInfo.phone.length === 11) {
        _this.codeDisabled = true;
        _this.count_down(60000);
        apiLoginSmsCode({
          key: md5Mobile(_this.userInfo.phone),
          phone: _this.userInfo.phone
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
    submitInfo() {
      let data = this.userInfo;
      // if (this.userInfo.birthday && typeof this.userInfo.birthday == "object") {
      //   data.birthday = this.userInfo.birthday.map(fullZero).join("-");
      // }
      let { birthday, name, openid, phone, sex, verifyCode } = data;
      if (!birthday || !name || !phone || !sex) {
        Toast.text("请完善信息");
        return;
      }
      if (this.oldPhone !== phone && !verifyCode) {
        Toast.text("请输入验证码");
        this.smsCodeModal = true;
        return;
      }
      apiUpdateUserInfo(data).then(res => {
        if (res.data.code === "100") {
          let params = {
            grant_type: "password",
            username: phone,
            password: "abcd1234"
          };
          apiLogin(params).then(res => {
            this.$router.go(-1);
          });
        } else {
          Toast.text(res.data.description);
        }
      });
    }
  },
  components: {
    MvHeader
  }
};
</script>
<style lang="scss" scoped>
.vue_user_info_content {
  height: calc(100% - 40px);
  overflow-y: auto;
  .content_body {
    padding: 40px 0 20px;
    background: #fff;
  }
  .card_item_btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 40px 0 0;
    > button {
      margin: 0;
      height: 40px;
      font-size: 14px;
      width: 100px;
    }
  }
  .getCodeBtn {
    width: 90px;
    color: #00d69e;
    font-size: 14px;
  }
}
</style>
