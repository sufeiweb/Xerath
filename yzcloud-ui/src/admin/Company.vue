<template>
  <div class="company layout">
    <el-form
      label-position="top"
      status-icon
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
      class="demo-ruleForm"
    >
      <el-form-item v-if="false" label="企业Logo" prop="companyLogo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formLabelAlign.companyLogo" :src="formLabelAlign.companyLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="formLabelAlign.companyName"></el-input>
      </el-form-item>
      <el-form-item label="企业网址" prop="companySite">
        <el-input v-model="formLabelAlign.companySite"></el-input>
      </el-form-item>
      <el-form-item label="企业电话" prop="companyPhone">
        <el-input v-model="formLabelAlign.companyPhone"></el-input>
      </el-form-item>
      <el-form-item label="企业邮箱" prop="companyEmail">
        <el-input v-model="formLabelAlign.companyEmail"></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="companyAddress">
        <el-input v-model="formLabelAlign.companyAddress"></el-input>
      </el-form-item>
      <el-form-item label="企业法人" prop="owner">
        <el-input v-model="formLabelAlign.owner"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="socialCreditCode">
        <el-input v-model="formLabelAlign.socialCreditCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('formLabelAlign')">重置数据</el-button>
        <el-button type="primary" @click="submitForm('formLabelAlign')">更新企业信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { apiGetCompanyInfo, apiUpdateCompanyInfo } from "../fetch/AdminApi";
export default {
  data() {
    return {
      formLabelAlign: {
        companyName: undefined,
        companySite: undefined,
        companyPhone: undefined,
        companyEmail: undefined,
        companyAddress: undefined,
        owner: undefined,
        socialCreditCode: undefined
        // companyLogo: undefined
      },
      rules: {
        companyLogo: [
          {
            required: true,
            message: "请上传企业logo",
            trigger: ["blur", "change"]
          }
        ],
        companyName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"]
          }
        ],
        companySite: [
          {
            required: true,
            message: "请输入企业网址",
            trigger: ["blur", "change"]
          }
        ],
        companyPhone: [
          {
            required: true,
            message: "请输入企业电话",
            trigger: ["blur", "change"]
          }
        ],
        companyEmail: [
          {
            required: true,
            message: "请输入企业邮箱",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        companyAddress: [
          {
            required: true,
            message: "请输入企业地址",
            trigger: ["blur", "change"]
          }
        ],
        owner: [
          {
            required: true,
            message: "请输入企业法人",
            trigger: ["blur", "change"]
          }
        ],
        socialCreditCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    apiGetCompanyInfo().then(res => {
      if (res.data.code === "100") {
        this.formLabelAlign = res.data.content;
      } else {
        this.$message.error(res.data.description);
      }
    });
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiUpdateCompanyInfo(this.formLabelAlign).then(res => {
            if (res.data.code === "100") {
              this.$message.success("更新成功");
            } else {
              this.$message.error(res.data.description);
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.formLabelAlign.companyLogo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-ruleForm {
  min-width: 640px;
  width: 80%;
}
</style>


