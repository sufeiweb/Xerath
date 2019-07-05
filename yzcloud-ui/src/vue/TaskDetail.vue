<template>
  <div class="vue_task_detail layout_mv">
    <MvHeader />
    <div class="vue_task_detail_content">
      <div class="vue_task_detail_content_card">
        <section class="card_item">
          <span class="card_item_title">名称</span>
          <span class="card_item_content">{{taskDetal.title}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">单价</span>
          <span
            class="card_item_content"
          >{{taskDetal.price}}元/{{taskDetal.billType | checkBilltype(BillType)}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">时间</span>
          <span class="card_item_content">{{taskDetal.startTime}} 至 {{taskDetal.endTime}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">地点</span>
          <span class="card_item_content">{{taskDetal.limitAddress ? taskDetal.address : "无地点限制"}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">所需人数</span>
          <span
            class="card_item_content"
          >{{taskDetal.totalPeople > -1 ? taskDetal.totalPeople + '人' : "无人数限制"}}</span>
          <span class="card_item_content">已有 {{taskDetal.joinPeople}} 人申请</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">类型</span>
          <span class="card_item_content">{{taskDetal.taskType | checkBilltype(TaskType)}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">性别要求</span>
          <span class="card_item_content">{{taskDetal.sex | Sex}}</span>
        </section>
        <section class="card_item">
          <span class="card_item_title">任务内容</span>
          <div class="card_item_content_detail" v-html="taskDetal.detail"></div>
        </section>
        <section class="card_item">
          <span class="card_item_title">状态</span>
          <div class="card_item_content">{{taskDetal.applyStatus | ApplyStatus}}</div>
        </section>
        <section class="card_item card_item_btn">
          <wv-button @click="goback" type="primary" :plain="true" :mini="true">返回</wv-button>
          <wv-button
            v-if="taskDetal.applyStatus == 0"
            @click="optionTask(taskDetal.id,2)"
            type="primary"
            :mini="true"
          >撤销申请</wv-button>
          <wv-button
            v-if="taskDetal.applyStatus == -1 || taskDetal.applyStatus == 3"
            @click="optionTask(taskDetal.id,1)"
            type="primary"
            :mini="true"
          >申请</wv-button>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from "../utils/util";
import { apiVueTaskDetail, apiVueTaskOption, apiLogin } from "../fetch/VueApi";
import { mapGetters } from "vuex";
import MvHeader from "../components/Mv_header";
import { Toast } from "we-vue";
export default {
  data() {
    return {
      taskDetal: {},
      taskId: undefined
    };
  },
  mounted() {
    this.taskId = this.$route.params.id;
    this.getTaskDetal(this.$route.params.id);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    optionTask(id, type) {
      let data = { id, type };
      apiVueTaskOption(data).then(res => {
        if (res.data.code === "100") {
          this.getTaskDetal(id);
        } else {
          Toast.text(res.data.description);
        }
      });
    },
    getTaskDetal(id) {
      apiVueTaskDetail(id).then(res => {
        if (res.data.code === "100") {
          this.taskDetal = res.data.content;
        } else {
          Toast.text(res.data.description);
        }
      });
    }
  },
  components: {
    MvHeader
  },
  computed: {
    ...mapGetters(["BillType", "TaskType"])
  }
};
</script>
<style lang="scss" scoped>
.vue_task_detail {
  .vue_task_detail_content {
    height: calc(100% - 40px);
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    .vue_task_detail_content_card {
      background: #fff;
      border-radius: 6px;
      padding: 16px;
      box-shadow: 0 0 8px #eee;
      .card_item_btn {
        justify-content: flex-end;
        button {
          margin: 0;
          margin-left: 14px;
        }
      }
      .card_item {
        display: flex;
        margin-bottom: 14px;
        font-size: 16px;
        .card_item_title {
          min-width: 80px;
          margin-right: 14px;
          text-align: right;
        }
        .card_item_content {
          margin-right: 10px;
          color: #666;
        }
        .card_item_content_detail {
          border: 1px solid #ccc;
          flex: 1;
          padding: 4px;
          border-radius: 4px;
          font-size: 13px;
          max-height: 100px;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
