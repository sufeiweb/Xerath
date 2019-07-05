<template>
  <div class="salary_main layout">
    <div class="task_amin_form">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="名字" prop="name">
          <el-input v-model="formInline.name" placeholder="名字" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="opStatus">
          <el-select v-model="formInline.opStatus" placeholder="状态" clearable>
            <el-option label="未知" :value="0"></el-option>
            <el-option label="已发放" :value="1"></el-option>
            <el-option label="未发放" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formInline.type" placeholder="状态" clearable>
            <el-option label="所有行业" :value="-1"></el-option>
            <el-option label="其他" :value="0"></el-option>
            <el-option label="工资" :value="1"></el-option>
            <el-option label="服务费" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="10">
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="formInline.startTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-form-item prop="endTime">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                v-model="formInline.endTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="searchLoading" @click="resetForm('formInline')">重置</el-button>
          <el-button :loading="searchLoading" type="primary" @click="submitForm('formInline')">查询</el-button>
          <el-link class="header_footer_btn" :href="PriceUrl" type="primary" target="_blank">下载模板</el-link>
        </el-form-item>
      </el-form>
      <div class="header_footer">
        <el-upload
          class="upload-demo"
          :headers="updateHeader"
          action="/api/authsec/admin/bill/salary/import/upload"
          :on-success="handlePreviewSuccess"
          :on-error="handlePreviewError"
          multipart
          accept="application/vnd.ms-excel"
        >
          <el-button type="primary">导入</el-button>
        </el-upload>
      </div>
    </div>
    <el-table :data="salayList" name="salayList" border>
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="批次" prop="batchCode" width="160"></el-table-column>
      <el-table-column label="发放时间" prop="opDate" width="160"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex == 1 ? "男" : scope.row.sex == 2 ? "女" : "未知"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type">
        <template slot-scope="scope">
          <span>{{scope.row.type | salayType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="amount"></el-table-column>
      <el-table-column label="号码" prop="phone" width="120"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.opStatus == 1 ? "已发放" : scope.row.opStatus == 2 ? "未发放" : "未知"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            :disabled="searchLoading"
            @click.stop="editSalary(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click.stop="deteleSalary(scope.row.id)"
            style="color:red"
          >删除</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="dialogFormValue">
        <el-form-item label="批次" label-width="120px">
          <el-input v-model="dialogFormValue.batchCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发放时间" label-width="120px">
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model="dialogFormValue.opDate"
            style="width: 100%;"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="dialogFormValue.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-select style="width:100%" v-model="dialogFormValue.type" placeholder="请选择类型">
            <el-option label="未知" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" label-width="120px">
          <el-input v-model="dialogFormValue.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="dialogFormValue.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
          <el-select style="width:100%" v-model="dialogFormValue.type" placeholder="请选择类型">
            <el-option label="其他" value="0"></el-option>
            <el-option label="工资" :value="1"></el-option>
            <el-option label="服务费" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-select style="width:100%" v-model="dialogFormValue.opStatus" placeholder="请选择状态">
            <el-option label="未知" :value="0"></el-option>
            <el-option label="已发放" :value="1"></el-option>
            <el-option label="未发放" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="updateLoading" @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="updateLoading" type="primary" @click="updateSalary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  apiUploadFile,
  apiGetSalayDetail,
  apiUpdateSalayDetail,
  apiDeleteSalayDetail,
  apiSalayList
} from "../fetch/AdminApi";
import { getCookie, inSetDataValue, insetDate } from "../utils/util";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formInline: {},
      salayList: [],
      searchLoading: false,
      updateLoading: false,
      updateHeader: {
        Authorization: "bearer " + getCookie("access_token")
      },
      dialogFormValue: {},
      dialogFormVisible: false,
      pageInfo: {
        currentPage: 0, //-- 当前页数
        totalPage: 0, //-- 总页数
        pageSize: 10, //-- 单页记录数量
        totalRecords: 0 //-- 总记录条数
      }
    };
  },
  mounted() {
    this.getSalayList(1);
  },
  methods: {
    updateSalary() {
      this.updateLoading = true;
      let {
        dialogFormValue,
        pageInfo: { currentPage }
      } = this;
      let formValue = { ...dialogFormValue };
      apiUpdateSalayDetail(inSetDataValue(formValue)).then(res => {
        this.updateLoading = false;
        if (res.data.code === "100") {
          this.$message.success("修改成功");
          this.getSalayList(currentPage + 1);
          this.dialogFormVisible = false;
        } else {
        }
      });
    },

    submitForm(formName) {
      this.getSalayList(1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSalayList(1);
    },
    getSalayList(page) {
      this.searchLoading = true;
      let { formInline, pageInfo } = this;
      let formValue = { ...formInline };
      let data = {
        ...inSetDataValue(formValue),
        page: page || pageInfo.currentPage + 1,
        size: pageInfo.pageSize
      };
      apiSalayList(data)
        .then(res => {
          this.searchLoading = false;
          if (res.data.code == "100") {
            this.pageInfo = res.data.pageInfo;
            this.salayList = res.data.content;
          }
        })
        .catch(req => {
          this.searchLoading = false;
        });
    },
    changePage(e) {
      this.getSalayList(e);
    },
    handlePreviewSuccess(file, fileList) {
      if (fileList.response) {
        if (fileList.response.code === "100") {
          this.$message.success("上传成功");
          this.getSalayList(1);
        } else {
          this.$message.error(fileList.response.description);
        }
      }
    },
    handlePreviewError(file, fileList) {
      this.$message.error("上传失败，重新上传");
    },
    editSalary(value) {
      this.dialogFormVisible = true;
      this.dialogFormValue = value;
    },
    deteleSalary(id) {
      this.$confirm("确认删除？")
        .then(_ => {
          apiDeleteSalayDetail(id).then(res => {
            if (res.data.code === "100") {
              this.$message.success("删除成功");
              this.getSalayList(this.pageInfo.currentPage + 1);
            } else {
              this.$message.error(res.data.description);
            }
          });
        })
        .catch(_ => {
          this.$message.info("取消操作");
        });
    }
  },
  computed: {
    ...mapGetters(["PriceUrl"])
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
.header_footer {
  margin-bottom: 20px;
}
.header_footer_btn {
  width: 100px;
  margin-left: 20px;
}
</style>

