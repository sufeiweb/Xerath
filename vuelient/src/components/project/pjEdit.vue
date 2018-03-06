<template>
  <div class="pjEdit">
    <section class="editTime">
      <span>项目时间</span>
      <el-date-picker
        v-model="editTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </section>
    <section class="editTitle">
      <span>项目名称</span>
      <el-input
        placeholder="请输入项目名称"
        v-model="editTitle"
        clearable>
      </el-input>
    </section>
    <section class="editDescription">
      <span>项目描述</span>
      <el-input
        type="textarea"
        placeholder="请输入项目描述"
        :rows="5"
        v-model="editDescription"
        clearable>
      </el-input>
    </section>
    <section class="editTech">
      <span>项目技术栈</span>
      <el-select v-model="editTech" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </section>
    <section class="editTechDT">
      <span>项目技术简介</span>
      <el-input
        type="textarea"
        placeholder="请输入项目技术简介"
        :rows="5"
        v-model="editTechDT"
        clearable>
      </el-input>
    </section>
    <section class="editDuty">
      <span>项目职责</span>
      <el-input
        type="textarea"
        placeholder="请输入项目职责"
        :rows="5"
        v-model="editDuty"
        clearable>
      </el-input>
    </section>
    <section class="editExpect">
      <span>项目期望</span>
      <el-input
        type="textarea"
        placeholder="请输入项目期望"
        :rows="5"
        v-model="editExpect"
        clearable>
      </el-input>
    </section>
    <div class="btnBox">
      <el-button v-if='buttonState' type="primary" @click="pjSubmit">提交</el-button>
      <el-button v-else type="primary"  @click="updatePj">提交</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editTime: '',//项目时间
        editTitle:'',//项目名称
        editDescription:'',//项目描述
        editTech:'',//项目技术栈
        editTechDT:'',//项目技术简介
        editDuty:'',//项目职责
        editExpect:'',//项目期望
        buttonState:true,//编辑或者提交，在编辑中是update(false)，在新建中是add(true)
        options: [{
          value: 'vue',
          label: 'vue'
        },{
          value: 'vuex',
          label: 'vuex'
        },{
          value: 'wexx',
          label: 'wexx'
        },{
          value: 'promise',
          label: 'promise'
        }, {
          value: 'react',
          label: 'react'
        }, {
          value: 'jquery',
          label: 'jquery'
        }, {
          value: 'echarts',
          label: 'echarts'
        }, {
          value: 'kline',
          label: 'kline'
        }, {
          value: 'node',
          label: 'node'
        }, {
          value: 'animate.css',
          label: 'animate.css'
        }, {
          value: 'element-ui',
          label: 'element-ui'
        }, {
          value: 'canvas',
          label: 'canvas'
        }],
      }
    },
    //引用组件名
    components: {},
    //生命周期--组件挂载之前
    created() {
    },
    //生命周期--组件挂载之后
    mounted() {
      if(this.$route.query.id){
        this.$http.post('/projects/detail',{id:this.$route.query.id}).then((res)=>{
          this.editTime= res.data[0].editTime,//项目时间
            this.editTitle=res.data[0].editTitle,//项目名称
            this.editDescription=res.data[0].editDescription,//项目描述
            this.editTech=res.data[0].editTech,//项目技术栈
            this.editTechDT=res.data[0].editTechDT,//项目技术简介
            this.editDuty=res.data[0].editDuty,//项目职责
            this.editExpect=res.data[0].editExpect,//项目期望
          this.buttonState = false;
        }).catch((req)=>{
          console.log(req)
        })
      }else{
        this.buttonState = true;
      }
    },
    //生命周期--组件被销毁之前
    beforeDestroy() {
    },
    //生命周期==组件销毁时
    destroyed() {
    },
    //组件方法集合
    methods: {
      pjSubmit(){
        if(!this.editTime || !this.editTitle || !this.editDescription || !this.editTech || !this.editTechDT || !this.editExpect || !this.editDuty){
          toast.message({
            text:'请完善项目信息'
          })
        }else {
          let data = {
            editTime:this.editTime,
            editTitle:this.editTitle,
            editDescription:this.editDescription,
            editTech:this.editTech,
            editTechDT:this.editTechDT,
            editDuty:this.editDuty,
            editExpect:this.editExpect
          }
          this.$http.post('/projects/add',data)
            .then((result)=>{
              //成功
              this.$router.go(-1)
            }).catch(function (error) {
            //失败
            console.log(error)
          });
        }
      },
      updatePj(){
        let item = {
          editTime:this.editTime,
          editTitle:this.editTitle,
          editDescription:this.editDescription,
          editTech:this.editTech,
          editTechDT:this.editTechDT,
          editDuty:this.editDuty,
          editExpect:this.editExpect,
          _id:this.$route.query.id
        };
        if(!this.editTime || !this.editTitle || !this.editDescription || !this.editTech || !this.editTechDT || !this.editExpect || !this.editDuty){
          toast.message({
            text:'请完善项目信息'
          })
        }
        this.$http.post('/projects/update',item)
          .then((result)=>{
            //成功
            toast.message({
              text:'修改成功！'
            })
            this.$router.go(-1)
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      }
    },
    //监听事件
    watch: {},
    //计算属性
    computed: {}
  }
</script>
<style lang="scss" scoped>
  .pjEdit {
    padding: 20px;
    background: #fff;
    border-top: 5px solid #999;
    section{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      span{
        &:nth-of-type(1){
          margin-bottom: 10px;
        }
      }
    }
    .btnBox{
      display: flex;
      justify-content: center;
      button{
        width: 30%;
      }
    }
  }
</style>
