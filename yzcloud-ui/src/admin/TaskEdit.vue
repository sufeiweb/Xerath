<template>
  <div class="task_edit_main layout">
    <el-form
      :model="editTask"
      :rules="rules"
      ref="editTask"
      label-width="240px"
      class="task_edit_main_editTask"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="editTask.title" placeholder="请输入任务名称" type="text"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="taskType">
        <el-select v-model="editTask.taskType">
          <el-option v-for="item in TaskType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价" required>
        <el-col :span="10">
          <el-form-item prop="price">
            <el-input v-model="editTask.price" placeholder="请输入任务价格" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="marginLeft10">元</el-col>
        <el-col :span="10">
          <el-form-item prop="billType">
            <el-select v-model="editTask.billType">
              <el-option
                v-for="item in BillType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="时间" required>
        <el-col :span="10">
          <el-form-item prop="startTime">
            <el-date-picker
              type="datetime"
              placeholder="选择开始时间"
              v-model="editTask.startTime"
              style="width: 100%;"
              format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="10">
          <el-form-item prop="endTime">
            <el-date-picker
              type="datetime"
              placeholder="选择结束时间"
              v-model="editTask.endTime"
              style="width: 100%;"
              format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="地点" required>
        <div>
          <el-radio-group v-model="editTask.limitAddress">
            <el-radio :label="true">限制</el-radio>
            <el-radio :label="false">不限制</el-radio>
          </el-radio-group>
        </div>
        <div v-show="editTask.limitAddress">
          <div id="all">
            <el-input
              type="text"
              id="suggestId"
              name="address"
              placeholder="地址"
              v-model="address"
              class="input_style"
            ></el-input>
            <div id="allmap"></div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="所需人数" required>
        <div>
          <el-radio-group v-model="editTask.taskPersonType">
            <el-radio label="FIXED">固定</el-radio>
            <el-radio label="-1">不限制</el-radio>
          </el-radio-group>
        </div>
        <div v-show="editTask.taskPersonType === 'FIXED'">
          <el-col :span="10">
            <el-form-item prop="totalPeople">
              <el-input v-model="editTask.totalPeople" placeholder="请输入所需的人数" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="marginLeft10">人</el-col>
        </div>
      </el-form-item>
      <el-form-item label="性别要求" required>
        <el-radio-group v-model="editTask.sex">
          <el-radio :label="0">无限制</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务内容" prop="detail">
        <quill-editor
          v-model="editTask.detail"
          ref="detailEditor"
          :options="editorOption"
          class="detailEditor"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="是否自动接受申请人报名" required>
        <el-radio-group v-model="editTask.autoPass">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click.stop="cancelBtnFun">取消</el-button>
        <el-button type="primary" @click="submitForm('editTask')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { outTaskData } from "../utils/util";
import {
  apiCreateTask,
  apiGetTaskDetail,
  apiUpdateTaskDetail
} from "../fetch/AdminApi";
export default {
  data() {
    return {
      editTask: {
        billType: 5,
        limitAddress: true,
        taskPersonType: "FIXED",
        taskType: 1,
        sex: 0,
        autoPass: false,
        taskStatus: 0,
        detail: ""
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block", "image"]
            // [{ color: [] }, { background: {} }]
          ]
        }
      },
      address: "上海市上海虹桥火车站",
      userLocation: { lng: "", lat: "" },
      rules: {
        detail: [
          { required: true, message: "请输入任务详情", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入任务名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        price: [
          { required: true, message: "请输入任务单价", trigger: "change" }
        ],
        billType: [
          { required: true, message: "请选择单价类型", trigger: "change" }
        ],
        taskType: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    let _this = this;
    let { type, id } = this.$route.params;
    this.getTaskDetail(id);
    this.$nextTick(function() {
      var th = this;
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point;
      if (_this.address) {
        setPlace(_this.address);
      } else {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            point = new BMap.Point(r.point.lng, r.point.lat);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom();
          }
        });
      }
      //建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        input: "suggestId",
        location: map
      });
      var myValue;
      //鼠标点击下拉列表后的事件
      setTimeout(function() {
        document.getElementById("suggestId").value = _this.address;
      }, 0);
      ac.addEventListener("onconfirm", function(e) {
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        setPlace(myValue);
      });
      function setPlace(localAdress) {
        _this.address = localAdress;
        //清除地图上所有覆盖物
        map.clearOverlays();
        function myFun() {
          //获取第一个智能搜索的结果
          th.userlocation = local.getResults().getPoi(1).point;
          _this.editTask.latitude = th.userlocation.lat;
          _this.editTask.longitude = th.userlocation.lng;
          map.centerAndZoom(th.userlocation, 18);
          //添加标注
          map.addOverlay(new BMap.Marker(th.userlocation));
        }

        //智能搜索
        var local = new BMap.LocalSearch(map, {
          onSearchComplete: myFun
        });
        local.search(localAdress);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click", function(e) {
          //经度
          _this.editTask.latitude = th.userlocation.lat;
          _this.editTask.longitude = th.userlocation.lng;
        });
      }
    });
  },
  methods: {
    getTaskDetail(id) {
      // 获取 task detail
      if (!id) return;
      apiGetTaskDetail(id)
        .then(res => {
          if (res.data.code === "100") {
            this.editTask = outTaskData(res.data.content);
            this.address = this.editTask.address;
          } else {
            this.$message.error(res.data.description);
          }
        })
    },
    geolocationAdress(lng, lat) {
      // var
    },
    cancelBtnFun() {
      this.$confirm("此操作将会使表单数据重置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    taskSubmit(editTask) {
      let { type } = this.$route.params;
      return type === "update"
        ? apiUpdateTaskDetail(editTask)
        : apiCreateTask(editTask);
    },
    submitForm(formName) {
      let { editTask, address } = this;
      editTask.address = address;
      // 这个地方需要校验 地点，任务需要人数字段，不能通过表单规则去校验
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.taskSubmit(editTask)
            .then(res => {
              if (res.data.code === "100") {
                this.$message.success("创建成功");
                this.$router.go(-1);
              }
            })
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.detailEditor.quillEditor;
    },
    ...mapGetters(["BillType", "TaskType"])
  }
};
</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}
#suggestId {
  margin-bottom: 20px;
}
#allmap {
  width: 100%;
  height: 300px;
  border: 1px solid #01aaef;
}
.marginLeft10 {
  margin-left: 10px;
}
.task_edit_main_editTask {
  width: 80%;
  min-width: 640px;
}
</style>


