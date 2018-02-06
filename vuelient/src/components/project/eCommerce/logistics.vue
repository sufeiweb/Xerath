<template>
    <div class="logistics">
        <div class="createDate">
          <el-date-picker
              v-model="createDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          <el-input v-model="iptName" placeholder="请输入姓名"></el-input>
          <el-input v-model="iptNumber" placeholder="请输入手机号码"></el-input>
          <el-input v-model="iptText" placeholder="请输入省市"></el-input>
          <el-select v-model="iptStatus" placeholder="请选择包裹状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input type="textarea" v-model="iptDescription" placeholder="描述"></el-input>
        </div>
        <div class="btnbox">
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="submitMessage">提交</el-button>
        </div>
    </div>
 </template>
 <script>
    export default {
        data() {
          return{
            logisticsNo:'1234567890',//运单编号
            createDate:'',//操作时间
            iptName:'',//操作员
            iptNumber:'',//操作员号码
            iptText:'',//省市
            iptDescription:'',//备注
            options:[
              {
                value: '1',
                label: '运输中'
              },
              {
                value: '2',
                label: '派送中'
              },
              {
                value: '3',
                label: '已签收'
              },
            ],
            iptStatus:'',//包裹状态
          }
        },
        //引用组件名
        components:{},
        //生命周期--组件挂载之前
        created(){},
        //生命周期--组件挂载之后
        mounted(){
          console.log(this.$route.query.logisticsNo)
          this.logisticsNo = this.$route.query.logisticsNo;
        },
        //生命周期--组件被销毁之前
        beforeDestroy(){},
        //生命周期==组件销毁时
        destroyed(){},
        //组件方法集合
        methods:{
          goBack(){
            this.$router.go(-1)
          },
          submitMessage(){
            //提交信息
            let {createDate,iptName,iptNumber,iptText,iptDescription,iptStatus,logisticsNo} = this;
            console.log(logisticsNo,'logisticsNo')
            console.log(createDate,'createDate')
            console.log(iptName,'iptName')
            console.log(iptNumber,'iptNumber')
            console.log(iptText,'iptText')
            console.log(iptStatus,'iptStatus')
            console.log(iptDescription,'iptDescription');
            if(!createDate || !iptName || !iptNumber || !iptText || !iptStatus){
              toast.message({
                text:'请检查输入参数是否完整'
              })
            }else {
              let data = {
                logisticsNo:logisticsNo,
                logisticsList:{
                  comments:iptText+iptDescription,
                  processStatus:iptStatus,
                  processTime:createDate,
                  processorId:iptNumber,
                  processorName:iptName
                }
              }
              this.$http.post('/wexx/add',data).then((res)=>{
                console.log(res)
              }).catch((req)=>{
                console.log(req)
              })
            }
          }
        },
        //监听事件
        watch:{},
        //计算属性
        computed:{}
    }
 </script>
 <style lang="scss" scoped>
    .logistics{
      padding-top: 20px;
      .createDate >div{
          width: 50%;
        margin-bottom: 20px;
      }
    }
 </style>
