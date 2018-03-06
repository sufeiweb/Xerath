<template>
  <div class="homeMain">
    <div class="backlog">
      <div class="title">
        <span>待办事项</span>
        <span class="add" @click="changeAddStatus(1)"><i class="el-icon-edit"></i> 添加</span>
      </div>
      <div class="content">
        <div class="list" v-for="item in backlogData">
          <div class="titles" @click="viewDetail(item._id)">{{item.iptTitle}}</div>
          <div>
            <el-button @click="cancels(item._id)">取消</el-button>
            <el-button @click="perform(item._id)">完成</el-button>
            <el-button @click="remark(item._id)">备注</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="backlog">
      <div class="title">未完成</div>
      <div class="content">
        <div class="list" v-for="item in unfinishedData">
          <div class="titles" @click="viewDetail(item._id)">{{item.iptTitle}}</div>
          <div>
            <el-button @click="cancels(item._id)">取消</el-button>
            <el-button @click="perform(item._id)">完成</el-button>
            <el-button @click="remark(item._id)">备注</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="backlog">
      <div class="title">已完成</div>
      <div class="content">
        <div class="list" v-for="item in completedData">
          <div class="titles" @click="viewDetail(item._id)">{{item.iptTitle}}</div>
          <div>
            <el-button @click="remark(item._id)">备注</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="backlog">
      <div class="title">已取消</div>
      <div class="content">
        <div class="list" v-for="item in cancelData">
          <div class="titles" @click="viewDetail(item._id)">{{item.iptTitle}}</div>
          <div>
            <el-button @click="recover(item._id)">恢复</el-button>
            <el-button @click="remark(item._id)">备注</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="editNotes" v-if="addStatus">
      <div class="content">
        <div class="header">
          <section>
            <span>开始时间:</span>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </section>
          <section>
            <span>预计结束时间:</span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </section>
        </div>
        <div class="contents">
          <div class="title">
            <span>标题：</span>
            <el-input v-model="iptTitle" placeholder="请输入标题"></el-input>
          </div>
          <div class="title">
            <span>内容：</span>
            <el-input
              v-model="iptContent"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="footer">
          <el-button @click="changeAddStatus(0)">取消</el-button>
          <el-button type="primary" @click="addSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <div class="editNotes" v-if="remarkStatus">
      <div class="content">
        <div class="contents">
          <div class="title">添加备注：</div>
          <el-input
            v-model="iptRemark"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="footer">
          <el-button @click="remark(0)">取消</el-button>
          <el-button type="primary" @click="remarkSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <div class="editNotes" v-if="detailStatus">
      <div class="details">
        <header>{{detailData.iptTitle}}</header>
        <section>
          <aside>
            <span>开始时间:</span>
            <span>{{detailData.startTime | dateYMDHIS}}</span>
          </aside>
          <aside>
            <span>开始时间:</span>
            <span>{{detailData.endTime | dateYMDHIS}}</span>
          </aside>
        </section>
        <article>
          <div class="titleD">内容：</div>
          <div class="detailContent">
            {{detailData.iptContent}}
          </div>
        </article>
        <footer>
          <div class="titleD">备注：</div>
          <div class="remarkContent">
            <div v-for="item in detailData.iptRemark" class="itemsRemark">
              <span>{{item.content}}</span>
              <span class="atTime">{{item.times | dateYMDHIS}}</span>
            </div>
          </div>
        </footer>
        <div class="closeD">
          <el-button @click="goBack">退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        startTime: '',//开始时间
        endTime: '',//结束时间
        iptTitle: '',//标题
        iptContent: '',//内容
        iptRemark: '',//备注
        iptRemarkId: '',//备注id暂存
        addStatus: false,//添加模态框状态
        remarkStatus: false,//备注模态框状态
        detailStatus: false,//备注模态框状态
        backlogData: [],//待办事项数据
        unfinishedData: [],//未完成数据
        completedData: [],//已完成数据
        cancelData: [],//已取消数据
        detailData: '',//详细数据
      }
    },
    methods: {
      changeAddStatus(num) {
        this.endTime = null;
        this.startTime = null;
        this.iptTitle = null;
        this.iptContent = null;
        this.iptRemark = null;
        this.addStatus = !this.addStatus;
        if (num) {
          this.startTime = new Date();
        }
      },
      addSubmit() {
        let data = {
          startTime: new Date(this.startTime).getTime(),
          endTime: new Date(this.endTime).getTime(),
          iptTitle: this.iptTitle,
          iptContent: this.iptContent,
          iptRemark: this.iptRemark,
          backlogStatus: 1,//待办事项 1，2未完成。3已完成，4已取消
        };
        this.$http.post('/backlogs/add', data).then(res => {
          this.addStatus = false;
          this.getBacklogList(1)
          this.getBacklogList(2)
        }).catch(req => {
        });
      },//提交添加
      getBacklogList(status) {
        this.$http.post('/backlogs/list', {backlogStatus: status}).then(res => {
          console.log(res)
          if (status === 1) {
            this.backlogData = res.data;
          }
          if (status === 2) {
            this.unfinishedData = res.data;
          }
          if (status === 3) {
            this.completedData = res.data;
          }
          if (status === 4) {
            this.cancelData = res.data;
          }
        }).catch(req => {
        });
      },
      cancels(id) {
        this.$http.post('/backlogs/cancels', {id: id}).then(res => {
          toast.message({
            type: 'success',
            text: '操作成功'
          });
          this.getListAll()
        }).catch(req => {
          console.log(req)
        })
      },//取消
      perform(id) {
        this.$http.post('/backlogs/perform', {id: id}).then(res => {
          toast.message({
            type: 'success',
            text: '操作成功'
          });
          this.getListAll()
        }).catch(req => {
          console.log(req)
        })
      },//完成
      remark(id) {
        if (id) {
          this.remarkStatus = true;
          this.iptRemarkId = id;
        } else {
          this.remarkStatus = false;
        }
      },//备注
      viewDetail(id) {
        this.detailStatus = true;
        this.$http.post('/backlogs/detail', {id: id}).then(res => {
          console.log(res)
          this.detailData = res.data[0];
        }).catch(req => {
          console.log(req)
        })
      },//查看详情
      goBack(){
        this.detailStatus = false;
      },
      recover(id) {
        this.$http.post('/backlogs/recovers', {id: id}).then(res => {
          toast.message({
            type: 'success',
            text: '操作成功'
          });
          this.getListAll()
        }).catch(req => {
          console.log(req)
        })
      },//恢复
      remarkSubmit() {
        let id = this.iptRemarkId;
        console.log(id);
        this.$http.post('/backlogs/remarks', {id: id, iptRemark: this.iptRemark}).then(res => {
          console.log(res)
          toast.message({
            type: 'success',
            text: '操作成功'
          });
          this.remarkStatus = false;
        }).catch(req => {
          console.log(req)
        })
      },//提交备注
      getListAll() {
        this.getBacklogList(1);
        setTimeout(this.getBacklogList(2), 1500);
        setTimeout(this.getBacklogList(3), 1500);
        setTimeout(this.getBacklogList(4), 1500);
      }
    },
    mounted: function () {
      this.getListAll();
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .homeMain {
    background: #fff;
    padding: 20px;
    border-top: 5px solid #999;
    .backlog {
      margin-bottom: 20px;
      .title {
        border-bottom: 1px solid #666;
        margin-bottom: 10px;
        .add {
          cursor: pointer;
          color: #01aaef;
          &:hover {
            color: #00B7FF;
          }
          margin-left: 50px;
          .el-icon-edit {
            color: #01aaef;
          }
        }
      }
      .content {
        height: 200px;
        background: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
        overflow: auto;
        .list {
          width: 49%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          margin-bottom: 10px;
          border-radius: 4px;
          padding-left: 10px;
          box-sizing: border-box;
          .titles {
            cursor: pointer;
            height: 100%;
            line-height: 40px;
            margin-right: 10px;
          }
          div {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            button {
              margin: 0;
              padding: 0;
              height: 30px;
              font-size: 12px;
              line-height: 30px;
              width: 30%;
            }
          }
        }
      }
    }
    .editNotes {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, .5);
      .content {
        background: #fff;
        width: 50%;
        height: 50%;
        overflow: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 20px;
        border-radius: 4px;
        .header {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          border-bottom: 1px solid #ccc;
          section {
            flex: 1;
            margin-bottom: 10px;
            span {
              margin-right: 10px;
            }
          }
        }
        .contents {
          padding: 10px 0;
          /*border-bottom: 1px solid #ccc;*/
          .title {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            span {
              margin-bottom: 8px;
            }
          }
        }
        .footer {
          display: flex;
          justify-content: center;
          button {
            width: 40%;
          }
        }
      }
      .details {
        background: #fff;
        width: 50%;
        height: 60%;
        overflow: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 20px;
        border-radius: 4px;
        header {
          text-align: center;
          font-size: 24px;
          font-weight: bolder;
          margin-bottom: 20px;
        }
        section {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          aside {
            flex: 1;
            text-align: center;
          }
        }
        article {
          margin-bottom: 20px;
          .detailContent {
            height: 60px;
            background: rgba(0, 0, 0, .1);
            padding: 5px;
            border-radius: 4px;
            overflow: auto;
          }
        }
        footer {
          margin-bottom: 20px;
          .remarkContent {
            display: flex;
            flex-direction: column;
            background: rgba(0, 0, 0, .1);
            height: 120px;
            padding: 5px;
            border-radius: 4px;
            overflow: auto;
            .itemsRemark {
              background: #fff;
              margin-bottom: 5px;
              padding: 2px 5px;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .atTime{
                color: #999;
              }
            }
          }
        }
        .closeD{
          display: flex;
          justify-content: center;
            button{
              width: 50%;
            }
        }
      }
    }
  }
</style>
