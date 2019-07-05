<template>
  <div class="task_amin layout">
    <div class="task_amin_form">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="formInline.title" placeholder="任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="任务状态" prop="taskStatus">
          <el-select v-model="formInline.status" placeholder="任务状态" clearable>
            <el-option label="草稿" value="0"></el-option>
            <el-option label="️已发布" value="1"></el-option>
            <el-option label="已满员" value="2"></el-option>
            <el-option label="进行中" value="3"></el-option>
            <el-option label="已结束" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-select disabled v-model="formInline.address" placeholder="地点" clearable>
            <el-option label="上海市" value="1"></el-option>
            <el-option label="温州市" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务时间">
          <el-col :span="10">
            <el-form-item prop="startTime">
              <el-date-picker
                type="datetime"
                clearable
                placeholder="选择开始日期"
                v-model="formInline.startTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-form-item prop="endTime">
              <el-date-picker
                type="datetime"
                placeholder="选择结束日期"
                clearable
                v-model="formInline.endTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="searchLoading" @click="resetForm('formInline')">重置</el-button>
          <el-button :loading="searchLoading" type="primary" @click="submitForm('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="task_main_add">
      <el-button :disabled="searchLoading" type="primary" @click.stop="editTask('create')">新增</el-button>
    </div>
    <el-table :data="taskList" name="taskList" border>
      <el-table-column label="序号" type="index" align='center' width="50" ></el-table-column>
      <el-table-column label="名称" prop="title" width="100"></el-table-column>
      <el-table-column label="单价" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
          <span>元/</span>
          <span>{{scope.row.billType | checkBilltype(BillType)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime" :formatter="this.formatterTime" width="180"></el-table-column>
      <el-table-column label="结束时间" prop="endTime" :formatter="this.formatterTime" width="180"></el-table-column>
      <el-table-column label="地点" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.limitAddress ? scope.row.address : "不限制"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别要求" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.sex == 1 ? "男" : scope.row.sex == 2 ? "女" : "不限制"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所需人数" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.totalPeople == -1 ? '无限制' : scope.row.totalPeople}}</span>
        </template>
      </el-table-column>
      <el-table-column label="已接人数" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.joinPeople}}</span>
          <el-button
            type="text"
            class="taskDetail"
            :disabled="searchLoading"
            @click.stop="go2TaskDetail(scope.row.id)"
          >(点击查看详情)</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status | taskStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="260">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            :disabled="searchLoading"
            v-if="scope.row.status == 0"
            @click.stop="editTask('update',scope.row.id)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="searchLoading"
            v-if="scope.row.status == 0"
            @click.stop="releaseTask(scope.row.id)"
          >发布</el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.status == 1 || scope.row.status == 2"
            style="color:orange"
            :disabled="searchLoading"
            @click.stop="cancelTask(scope.row.id)"
          >取消</el-button>
          <el-button
            :disabled="searchLoading"
            type="text"
            size="small"
            @click.stop="copyTask(scope.row.id)"
          >复制</el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.status  == 0 || scope.row.status  == 4"
            @click.stop="deteleTask(scope.row.id)"
            style="color:red"
          >删除</el-button>
          <el-button
            type="text"
            v-if="scope.row.status != 0"
            size="small"
            :disabled="searchLoading"
            @click.stop="viewTask(scope.row.id)"
          >查看</el-button>
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
  </div>
</template>
<script>
import {
  apiGetTaskList,
  apiDeleteTask,
  apiCancelTask,
  apiGetTaskDetail
} from "../fetch/AdminApi";
import { mapGetters } from "vuex";
import { inSetTime, checkBilltypeF, taskStatusF,checkTasktypeF } from "../utils/util";
export default {
  data() {
    return {
      formInline: {
        title: undefined,
        status: undefined,
        startTime: undefined,
        endTime: undefined,
        address: undefined
      },
      pageInfo: {
        currentPage: 0, //-- 当前页数
        totalPage: 0, //-- 总页数
        pageSize: 10, //-- 单页记录数量
        totalRecords: 0 //-- 总记录条数
      },
      taskList: [],
      searchLoading: false
    };
  },
  mounted() {
    this.getTaskListData(1);
  },
  methods: {
    submitForm(formName) {
      this.getTaskListData(1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getTaskListData(1);
    },
    editTask(type, id) {
      // 编辑
      let url = id
        ? `/admin/edit/task/${type}/${id}`
        : `/admin/edit/task/${type}`;
      this.$router.push(url);
    },
    releaseTask(id) {
      // 发布
      apiCancelTask({ id, type: 1 }).then(res => {
        if (res.data.code === "100") {
          this.$message.success("发布成功");
          this.getTaskListData(this.pageInfo.currentPage + 1);
        } else {
          this.$message.error(res.data.description);
        }
      });
    },
    cancelTask(id) {
      // 取消
      this.$confirm("确定要取消发布此任务么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiCancelTask({ id, type: 2 }).then(res => {
            if (res.data.code === "100") {
              this.$message.success("取消发布成功");
              this.getTaskListData(this.pageInfo.currentPage + 1);
            } else {
              this.$message.error(res.data.description);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    deteleTask(id) {
      // 删除
      this.$confirm("确定要删除此任务么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDeleteTask(id).then(res => {
            if (res.data.code === "100") {
              this.$message.success("删除成功");
              this.getTaskListData(this.pageInfo.currentPage + 1);
            } else {
              this.$message.error(res.data.description);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    copyTask(id) {
      // 复制
      this.$router.push(`/admin/edit/task/create/${id}`);
    },
    viewTask(id) {
      // 查看
      apiGetTaskDetail(id).then(res => {
        if (res.data.code === "100") {
          let value = res.data.content;
          let oHtml = `
            <div>
              <p><span>任务名称：</span><span>${value.title}</span></p>
              <p><span>任务类型：</span><span>${checkTasktypeF(value.taskType, this.TaskType)}</span></p>
              <p><span>是否自动接受申请人报名：</span><span>${value.autoPass ? "是" : "否"}</span></p>
              <p><span>薪酬：</span><span>${value.price}元/${checkBilltypeF(
            value.billType,
            this.BillType
          )}</span></p>
              <p><span>日期：</span><span>${value.startTime} 至 ${
            value.endTime
          }</span></p>
              <p><span>地址：</span><span>${
                value.limitAddress ? value.address : "不限制"
              }</span></p>
              <p><span>所需人数：</span><span>${
                value.totalPeople > 0 ? value.totalPeople : "不限制"
              }</span></p>
              <p><span>性别要求：</span><span>${
                value.sex == 1 ? "男" : value.sex == 2 ? "女" : "不限制"
              }</span></p>
              <p><span>任务内容：</span><div style="padding:10px;border:1px solid #ccc">${value.detail}</div></p>
              <p><span>任务状态：</span><span>${taskStatusF(
                value.status
              )}</span></p>
            </div>
          `;
          this.$alert(oHtml, value.title, {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    getTaskListData(page) {
      this.searchLoading = true;
      let { formInline, pageInfo } = this;
      let formValue = { ...formInline };
      let data = {
        ...inSetTime(formValue),
        page: page || pageInfo.currentPage + 1,
        size: pageInfo.pageSize
      };
      apiGetTaskList(data)
        .then(res => {
          this.searchLoading = false;
          if (res.data.code == "100") {
            this.pageInfo = res.data.pageInfo;
            this.taskList = res.data.content;
          }
        })
        .catch(req => {
          this.searchLoading = false;
        });
    },
    formatterTime(row, column) {
      var DateNew = new Date(row[column.property]);
      var Y = DateNew.getFullYear();
      var M = DateNew.getMonth() + 1;
      var D = DateNew.getDate();
      var h = DateNew.getHours();
      var m = DateNew.getMinutes();
      var s = DateNew.getSeconds();
      function fullZero(val) {
        return val < 10 ? "0" + val : "" + val;
      }
      return (
        [Y, M, D].map(fullZero).join("-") +
        "  " +
        [h, m, s].map(fullZero).join(":")
      );
    },
    go2TaskDetail(id) {
      this.$router.push("/admin/apply/task/" + id);
    },
    changePage(e) {
      this.getTaskListData(e);
    }
  },
  computed: {
    ...mapGetters(["BillType","TaskType"])
  }
};
</script>
<style lang="scss" scoped>
.task_amin {
  .task_main_add {
    padding: 10px 0;
  }

  .taskDetail {
    margin-left: 10px;
  }
  .apply_task_main_pagination {
    width: 100%;
    margin-top: 20px;
    text-align: right;
  }
  .apply_task_main_footer {
    margin-bottom: 10px;
  }
}
</style>


