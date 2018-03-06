<template>
    <div class="pjDetail">
      <section class="editTime">
        <span>项目时间</span>
        <span>{{formatTime(details.editTime)}}</span>
      </section>
      <section class="editTitle">
        <span>项目名称</span>
        <span>{{details.editTitle}}</span>
      </section>
      <section class="editDescription">
        <span>项目描述</span>
        <span>{{details.editDescription}}</span>
      </section>
      <section class="editTech">
        <span>项目技术栈</span>
        <span>{{formatArr(details.editTech)}}</span>
      </section>
      <section class="editTechDT">
        <span>项目技术简介</span>
        <span>{{details.editTechDT}}</span>
      </section>
      <section class="editDuty">
        <span>项目职责</span>
        <span>{{details.editDuty}}</span>
      </section>
      <section class="editExpect">
        <span>项目期望</span>
        <span>{{details.editExpect}}</span>
      </section>
      <div class="btnBox">
        <el-button type="primary" plain @click="goBack">返回</el-button>
        <el-button type="primary" @click="goToEdits(details._id)">编辑</el-button>
      </div>
    </div>
 </template>
 <script>
    export default {
        data() {
            return{
              details:''
            }
        },
        //引用组件名
        components:{},
        //生命周期--组件挂载之前
        created(){},
        //生命周期--组件挂载之后
        mounted(){
          this.$http.post('/projects/detail',{id:this.$route.query.id}).then((res)=>{
            console.log(res.data[0])
            this.details= res.data[0];
          }).catch((req)=>{
            console.log(req)
          })
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
          goToEdits(id){
            this.$router.push({path:'/Xerath/pjEdit?id='+id})
          },
          formatTime(arr) {
            if(arr){
              let time1 = new Date(arr[0]).toLocaleDateString();
              let time2 = new Date(arr[1]).toLocaleDateString();
              return time1 + ' ~ ' + time2
            }

          },
          formatArr(arr){
            if(arr){
              return arr.join(',')
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
   .pjDetail {
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
         &:nth-of-type(2){
           background: #f7f7f7;
           padding: 5px 24px;
         }
       }
     }
     .btnBox{
       display: flex;
       justify-content: center;
       button{
         width: 10%;
       }
     }
   }
 </style>
