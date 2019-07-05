<template>
  <div class="vue_task_history layout_mv">
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <div class="vue_task_list_from" v-if="showSerchModal" @click.stop="hideModal">
        <div class="vue_task_list_from_content" @click.stop="showModal">
          <div class="demo-form-inline">
            <wv-cell
              title="任务类型"
              is-link
              :value="typeValue[0] ? typeValue[0].name :''"
              @click.native="typePickerShow = true"
            />
            <wv-cell
              title="报酬类型"
              is-link
              :value="billValue[0] ? billValue[0].name :''"
              @click.native="billPickerShow = true"
            />
            <wv-input label="最低价格" placeholder="请输入最低价格" v-model="formInline.minPrice"></wv-input>
            <wv-input label="最高价格" placeholder="请输入最高价格" v-model="formInline.maxPrice"></wv-input>
            <wv-cell
              title="性别"
              is-link
              :value="sexValue[0] ? sexValue[0].name :''"
              @click.native="sexPickerShow = true"
            />
            <div>
              <wv-picker
                :visible.sync="sexPickerShow"
                :columns="sexColumns"
                value-key="name"
                @confirm="confirmSex"
              />
              <wv-picker
                :visible.sync="typePickerShow"
                :columns="[{ values : TaskType} ]"
                value-key="name"
                @confirm="confirmType"
              />
              <wv-picker
                :visible.sync="billPickerShow"
                :columns="[{ values : BillType} ]"
                value-key="name"
                @confirm="confirmBill"
              />
            </div>
            <div class="btn-footer">
              <wv-button
                type="primary"
                :disabled="searchLoading"
                @click="resetForm"
                :plain="true"
              >重置</wv-button>
              <wv-button type="primary" :is-loading="searchLoading" @click="submitForm">查询</wv-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <MvHeader />
    <div class="vue_task_list_header">
      筛选
      <el-button
        icon="el-icon-search"
        @click.stop="showModal"
        circle
        class="vue_task_list_header_color"
      ></el-button>
    </div>
    <div class="vue_task_list_content" id="vue_task_list_content">
      <div
        class="content_item"
        v-for="item in list"
        :key="item.id"
        @click.stop="go2TaskDetail(item.id)"
      >
        <div class="content_item_header">
          <span class="task_title">{{item.title}}</span>
          <span class="task_price">{{item.price}}元/{{item.billType | checkBilltype(BillType)}}</span>
        </div>
        <div class="content_item_header">
          <span class="task_type">{{item.taskType | checkBilltype(TaskType)}}</span>
          <div class="task_time">
            <div>开始：{{item.startTime}}</div>
            <div>结束：{{item.endTime}}</div>
          </div>
        </div>
        <div class="content_item_header task_line">
          <span class="task_addres">地点：{{item.limitAddress ? item.address :' 无限制' }}</span>
        </div>
        <div class="content_item_header content_item_header_footer">
          <span class="task_user">发布人：{{item.ownerName || '--'}}</span>
          <div class="task_option">
            <span class="task_people" v-if="item.totalPeople>0">
              人数：缺
              <span class="red">{{item.totalPeople - item.joinPeople}}</span>人
            </span>
            <span class="task_people" v-else>
              人数：
              <span class="red">不限制</span>
            </span>
            <span class="task_status_color">{{item.applyStatus | ApplyStatus}}</span>
          </div>
        </div>
      </div>
      <wv-button
        v-if="list.length"
        class="load_more"
        :is-loading="searchLoading"
        type="primary"
        @click="loadMore"
      >{{load_more_text}}</wv-button>
      <div class="list_empty" v-else>
        <i class="list_empty_content el-icon-receiving"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParam, APPID, inSetTime } from "../utils/util";
import { apiVueTaskHistoryList } from "../fetch/VueApi";
import { mapGetters } from "vuex";
import MvHeader from "../components/Mv_header";
import { Toast } from "we-vue";
export default {
  data() {
    return {
      formInline: {},
      typePickerShow: false, // 任务类型
      sexPickerShow: false, // 性别picker
      billPickerShow: false, // 性别picker
      sexValue: [],
      typeValue: [],
      billValue: [],
      sexColumns: [
        {
          values: [
            {
              name: "全部",
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
      searchLoading: false,
      showSerchModal: false,
      list: [],
      pageInfo: {
        currentPage: 0, //-- 当前页数
        totalPage: 0, //-- 总页数
        pageSize: 5, //-- 单页记录数量
        totalRecords: 0 //-- 总记录条数
      },
      load_more_text: "加载更多历史任务"
    };
  },
  components: {
    MvHeader
  },
  mounted() {
    this.getTaskListData(1);
  },
  methods: {
    loadMore() {
      let {
        pageInfo: { totalRecords, pageSize, currentPage }
      } = this;
      let newTotal = pageSize * (currentPage + 2);
      let chaTotal = totalRecords - newTotal;
      if (chaTotal > 0) {
        this.getTaskListData(currentPage + 2, "push");
      } else {
        this.load_more_text = "没有更多历史任务了";
      }
    },
    go2TaskDetail(id) {
      this.$router.push("/vue/home/taskdetail/" + id);
    },
    confirmSex(picker, value) {
      this.$nextTick(() => {
        this.sexValue = picker.getValues();
        this.formInline.sex = picker.getValues()[0].sex;
      });
    },
    confirmType(picker, value) {
      this.$nextTick(() => {
        this.typeValue = picker.getValues();
        this.formInline.taskType = picker.getValues()[0].id;
      });
    },
    confirmBill(picker, value) {
      this.$nextTick(() => {
        this.billValue = picker.getValues();
        this.formInline.billType = picker.getValues()[0].id;
      });
    },
    hideModal() {
      this.showSerchModal = false;
    },
    showModal() {
      this.showSerchModal = true;
    },
    submitForm(formName) {
      this.getTaskListData(1);
    },
    resetForm() {
      this.formInline = {};
      this.sexValue = [];
      this.typeValue = [];
      this.billValue = [];
      this.getTaskListData(1);
    },
    getTaskListData(page, type) {
      this.searchLoading = true;
      let { formInline, pageInfo } = this;
      let data = {
        ...formInline,
        page: page || pageInfo.currentPage + 1,
        size: pageInfo.pageSize
      };
      apiVueTaskHistoryList(data).then(res => {
        if (res.data.code === "100") {
          this.pageInfo = res.data.pageInfo;
          if (type) {
            this.list = [...this.list, ...res.data.content];
          } else {
            this.list = res.data.content;
          }
          if (!res.data.content || !res.data.content.length) {
            Toast.text("暂无数据！");
          }
        } else {
          Toast.text(res.data.description);
        }
        this.searchLoading = false;
        this.hideModal();
      });
    }
  },
  computed: {
    ...mapGetters(["BillType", "TaskType"])
  }
};
</script>
<style lang="scss" scoped>
.vue_task_list_from {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
  .vue_task_list_from_content {
    background: #fff;
    .demo-form-inline {
      width: 300px;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 20px 0;
    }
    .el-form-item__content {
      .price_ipt {
        width: 44%;
        display: inline-block;
        margin-right: 0;
      }
    }
  }
}
.vue_task_list_header {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: flex-end;
  box-shadow: 0 0 10px #00d69e;
  background: #fff;
  padding: 5px 20px;
  .vue_task_list_header_color {
    color: #00d69e;
    border-color: #00d69e;
    margin-left: 10px;
  }
}
.vue_task_list_content {
  height: calc(100% - 90px);
  padding: 10px 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
.btn-footer {
  margin-top: 20px;
}
.content_item {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 6px;
  color: #333;
  font-size: 16px;
  .content_item_header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 6px;
    .task_title {
      width: 70%;
      color: #00d69e;
    }
    .task_type {
      font-size: 20px;
      font-weight: bold;
    }
    .task_price {
      color: red;
    }
    .task_time {
      font-size: 13px;
    }
    .task_addres {
      color: #666;
    }
    .task_option {
      display: flex;
      align-items: flex-end;
    }
    .task_people {
      margin-right: 10px;
    }
  }
  .red {
    color: red;
  }
   .content_item_header_footer {
    font-size: 14px;
  }
}
</style>

