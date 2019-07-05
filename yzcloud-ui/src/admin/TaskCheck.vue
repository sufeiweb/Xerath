<template>
  <div class="apply_task_main layout">
    <div class="apply_task_main_from">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="姓名" prop="searchkey">
          <el-input v-model="formInline.searchkey" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formInline.sex" placeholder="请选择性别">
            <el-option label="全部" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已接受" value="1"></el-option>
            <el-option label="已拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('formInline')">重置</el-button>
          <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="apply_task_main_header" v-if="applyId">
      <section>
        <span>任务名称：</span>
        <span>{{taskHeader.taskName}}</span>
      </section>
      <section>
        <span>任务时间：</span>
        <span>{{taskHeader.startTime | formatTimeAll}} 至 {{taskHeader.endTime | formatTimeAll}}</span>
      </section>
      <section>
        <span>地点：</span>
        <span>{{taskHeader.taskAdress}}</span>
      </section>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div
        v-if="multipleSelection.length"
        class="apply_task_main_pagination apply_task_main_footer"
      >
        <el-button size="small" type="primary" plain @click.stop="acceptApply">接受</el-button>
        <el-button size="small" type="danger" plain @click.stop="rejectApply">拒绝</el-button>
      </div>
    </transition>
    <div class="apply_task_main_table">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="applyId ? taskHeader.applyList : applyList"
        border
        style="width:100%"
        max-height="596"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column v-if="!applyId" label="任务名称" prop="taskName" width="200"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="职业" prop="professional"></el-table-column>
        <el-table-column label="联系电话" prop="phoneNumber" width="120"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | ApplyStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status ==1"
              @click.stop="acceptApply(scope.row.status,scope.row.id)"
            >接受</el-button>
            <el-button
              style="color:red"
              type="text"
              size="small"
              v-if="scope.row.status != 3"
              @click.stop="rejectApply(scope.row.status,scope.row.id)"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  apiAllTaskApplyList,
  apiAlongTaskApplyList,
  apiGetTaskDetail,
  apiTaskApplyOpreation
} from "../fetch/AdminApi";
export default {
  data() {
    return {
      applyId: undefined,
      formInline: {},
      applyList: [],
      taskHeader: {},
      pageInfo: {
        currentPage: 0, //-- 当前页数
        totalPage: 0, //-- 总页数
        pageSize: 10, //-- 单页记录数量
        totalRecords: 0 //-- 总记录条数
      },
      multipleSelection: []
    };
  },
  mounted() {
    // 根据是否有id 来判断 业务类型 加载全部还是加载部分
    this.applyId = this.$route.params.id;
    this.getTaskApplyList(1, this.$route.params.id);
  },
  methods: {
    submitForm(formName) {
      this.getTaskApplyList(1, this.applyId);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getTaskApplyList(1, this.applyId);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    acceptApply(id) {
      // 接受apply
      let params = {
        type: 1
      };
      params.ids = id ? [id] : this.multipleSelection;
      apiTaskApplyOpreation(params).then(res => {
        if (res.data.code === "100") {
          if (id) {
            this.$message.success("接受申请成功");
          } else {
            this.$message.success("批量接受申请成功");
          }
          this.getTaskApplyList(this.pageInfo.currentPage + 1, this.applyId);
        } else {
          this.$message.error(res.data.description);
        }
      });
    },
    rejectApply(id) {
      // 拒绝apply
      this.$confirm("确认拒绝？")
        .then(_ => {
          let params = {
            type: 1
          };
          params.ids = id ? [id] : this.multipleSelection;
          apiTaskApplyOpreation(params).then(res => {
            if (res.data.code === "100") {
              if (id) {
                this.$message.success("拒绝申请成功");
              } else {
                this.$message.success("批量拒绝申请成功");
              }
              this.getTaskApplyList(
                this.pageInfo.currentPage + 1,
                this.applyId
              );
            } else {
              this.$message.error(res.data.description);
            }
          });
        })
        .catch(_ => {
          this.$message.info("取消拒绝操作");
        });
    },
    changePage(e) {
      this.getTaskApplyList(e, this.applyId);
    },
    getTaskApplyList(page, id) {
      let { formInline, pageInfo } = this;
      let data = {
        ...formInline,
        page: page || pageInfo.currentPage + 1,
        size: pageInfo.pageSize,
        taskId: id
      };
      if (!id) {
        apiAllTaskApplyList(data).then(res => {
          if (res.data.code === "100") {
            this.applyList = res.data.content;
          } else {
            this.$message.error(res.data.description);
          }
        });
      } else {
        apiGetTaskDetail(id).then(res => {
          if (res.data.code === "100") {
            let params = {
              taskName: res.data.content.title,
              startTime: res.data.content.startTime,
              endTime: res.data.content.endTime,
              taskAdress: res.data.content.address
            };
            this.taskHeader = params;
          }
        });
        apiAlongTaskApplyList(data).then(res => {
          if (res.data.code === "100") {
            this.taskHeader = {
              ...this.taskHeader,
              applyList: res.data.content
            };
          } else {
            this.$message.error(res.data.description);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.apply_task_main {
  .apply_task_main_from {
    margin-bottom: 10px;
  }
  .apply_task_main_header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    > section {
      font-size: 16px;
      margin-right: 40px;
      margin-bottom: 10px;
      > span {
        &:nth-of-type(1) {
          color: #333;
        }
        &:nth-of-type(2) {
          color: #999;
        }
      }
    }
  }
  .apply_task_main_table {
    margin-bottom: 20px;
  }
  .apply_task_main_pagination {
    width: 100%;
    text-align: right;
  }
  .apply_task_main_footer {
    margin-bottom: 10px;
  }
}
</style>


