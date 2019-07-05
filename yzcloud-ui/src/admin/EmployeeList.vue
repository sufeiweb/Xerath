<template>
  <div class="employeelist_main layout">
    <div class="task_amin_form">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="名字" prop="name">
          <el-input v-model="formInline.name" placeholder="名字" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formInline.nickName" placeholder="昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="occupation">
          <el-input v-model="formInline.occupation" placeholder="职业" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formInline.phone" placeholder="手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formInline.sex" placeholder="性别" clearable>
            <el-option label="全部" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="searchLoading" @click="resetForm('formInline')">重置</el-button>
          <el-button :loading="searchLoading" type="primary" @click="submitForm('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="applyUserList" name="applyUserList" border>
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="号码" prop="phone"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex == 1 ? "男" : scope.row.sex == 2 ? "女" : "不限制"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="职业" prop="occupation"></el-table-column>
    </el-table>
    <div class="apply_task_main_pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageInfo.currentPage + 1"
        :total="pageInfo.totalRecords"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { apiGetApplyUsers } from "../fetch/AdminApi";
export default {
  data() {
    return {
      formInline: {},
      applyUserList: [],
      searchLoading: false,
      pageInfo: {
        currentPage: 0, //-- 当前页数
        totalPage: 0, //-- 总页数
        pageSize: 10, //-- 单页记录数量
        totalRecords: 0 //-- 总记录条数
      }
    };
  },
  mounted() {
    this.getApplyUsers(1);
  },
  methods: {
    submitForm(formName) {
      this.getApplyUsers(1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getApplyUsers(1);
    },
    getApplyUsers(page) {
      this.searchLoading = true;
      let { formInline, pageInfo } = this;
      let data = {
        ...formInline,
        page: page || pageInfo.currentPage + 1,
        size: pageInfo.pageSize
      };
      apiGetApplyUsers(data)
        .then(res => {
          this.searchLoading = false;
          if (res.data.code == "100") {
            this.pageInfo = res.data.pageInfo;
            this.applyUserList = res.data.content;
          }
        })
        .catch(req => {
          this.searchLoading = false;
        });
    },
    changePage(e) {
      this.getApplyUsers(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.apply_task_main_pagination {
  width: 100%;
  margin-top: 20px;
  text-align: right;
}
.apply_task_main_footer {
  margin-bottom: 10px;
}
</style>
